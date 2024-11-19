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
        console.log('Sending signup request to backend:', { email, name });
        
        // Send data directly to backend (which will handle Firebase creation)
        const response = await api.post('/users/signup', {
          email,
          password,
          name
        });
  
        // After successful signup, the backend will return the user object
        console.log('Signup successful:', response.data);
  
        return response.data;
      } catch (error) {
        console.error('Signup error:', error.response?.data || error);
        
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        
        // Handle network or other errors
        throw new Error(error.message || 'Failed to create account');
      }
    },
  
    login: async ({ email, password }) => {
      try {
        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseToken = await userCredential.user.getIdToken();
  
        // Get user data from your backend
        const response = await api.post('/auth/login', 
          {},  // Empty body since we're using token
          {
            headers: {
              Authorization: `Bearer ${firebaseToken}`
            }
          }
        );
  
        // Store the token
        localStorage.setItem('token', firebaseToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
  
        return response.data;
      } catch (error) {
        throw error.response?.data || { message: error.message };
      }
    },
  
    logout: async () => {
      try {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Logout error:', error);
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
  
    getCurrentUser: () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
  };
  
  export default authService;