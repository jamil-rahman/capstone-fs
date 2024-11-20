// src/utils/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request logging
api.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response logging
api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: `${error.config.baseURL}${error.config.url}`,
      method: error.config.method?.toUpperCase(),
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config.headers
    });
    return Promise.reject(error);
  }
);

export default api;