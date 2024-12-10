// src/utils/axiosConfig.js
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase'; // Make sure this path is correct

// Get auth instance
const auth = getAuth(app);

//USE THIS CODE FOR DEVELOPMENT
// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

 // USE THIS CODE FOR PRODUCTION
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


// Request interceptor
api.interceptors.request.use(
    async (config) => {
        try {
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken(true);
                config.headers.Authorization = `Bearer ${token}`;
                console.log('Token added to request');
            } else {
                console.log('No user found - request will be sent without token');
            }
        } catch (error) {
            console.error('Error adding token to request:', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const user = auth.currentUser;
                if (user) {
                    const token = await user.getIdToken(true);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                }
            } catch (retryError) {
                console.error('Token refresh failed:', retryError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;