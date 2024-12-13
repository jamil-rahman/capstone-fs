import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../utils/axiosConfig';

// This function will handle all authentication operations
const authService = {
  signup: async ({ email, password, name }) => {
    try {
      // console.log('Sending signup request to backend:', { email, name });

      // Send data directly to backend (which will handle Firebase creation)
      const response = await api.post('/users/signup', {
        email,
        password,
        name
      });

      // After successful signup, the backend will return the user object
      // console.log('Signup successful:', response.data);

      return response.data;
    } catch (error) {
      // console.error('Signup error:', error.response?.data || error);

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      // Handle network or other errors
      throw new Error(error.message || 'Failed to create account');
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      // console.error('Logout error:', error);
      throw error;
    }
  },

  // Update token when it expires
  refreshToken: async () => {
    const user = auth.currentUser;
    if (user) {
      const newToken = await user.getIdToken(true);
      localStorage.setItem('token', newToken);
      return newToken;
    }
    return null;
  },
  
  login: async ({ email, password }) => {
    try {
      // 1. Firebase Authentication
      // console.log('Starting Firebase authentication...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Get Firebase token
      // console.log('Getting Firebase token...');
      const firebaseToken = await userCredential.user.getIdToken();
      
      // 3. Backend Authentication
      // console.log('Authenticating with backend...');
      const response = await api.post('/users/login', 
        {}, // Empty body
        {
          headers: {
            'Authorization': `Bearer ${firebaseToken}`
          }
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      return response.data;
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      // Firebase Auth errors
      if (error.code?.startsWith('auth/')) {
        switch (error.code) {
          case 'auth/user-not-found':
            throw new Error('Email not registered');
          case 'auth/wrong-password':
            throw new Error('Invalid password');
          case 'auth/invalid-email':
            throw new Error('Invalid email format');
          case 'auth/user-disabled':
            throw new Error('Account has been disabled');
          default:
            throw new Error(error.message);
        }
      }

      // Backend errors
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }

      throw new Error('An unexpected error occurred');
    }
  },

  getCurrentUser: async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return null;
      }

      const token = await currentUser.getIdToken();
      const response = await api.get('/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
};

export default authService;