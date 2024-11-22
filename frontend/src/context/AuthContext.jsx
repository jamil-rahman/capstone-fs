import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase'; // Use the exported auth instance
import { onAuthStateChanged } from 'firebase/auth';
import api from '../utils/axiosConfig';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(null);

    // Function to get fresh token
    const getToken = async (firebaseUser) => {
        if (!firebaseUser) return null;
        try {
            const token = await firebaseUser.getIdToken(true); // Force refresh
            setAuthToken(token);
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    useEffect(() => {
        // Try to get user data from localStorage on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('user');
            }
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    console.log('Firebase user detected:', firebaseUser.email);
                    
                    // Get fresh token
                    const token = await getToken(firebaseUser);
                    if (!token) {
                        throw new Error('Failed to get auth token');
                    }

                    // Fetch user data from your backend
                    try {
                        const response = await api.get('/users/me', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        console.log('User data fetched successfully');
                        setUser(response.data.user);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        if (error.response?.status === 404) {
                            await auth.signOut();
                            setUser(null);
                            localStorage.removeItem('user');
                        }
                    }
                } else {
                    console.log('No Firebase user');
                    setUser(null);
                    setAuthToken(null);
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Auth state error:', error);
                setUser(null);
                setAuthToken(null);
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Set up token refresh interval
    useEffect(() => {
        if (!auth.currentUser) return;

        const refreshToken = async () => {
            await getToken(auth.currentUser);
        };

        // Refresh token every 30 minutes
        const interval = setInterval(refreshToken, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const logout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setAuthToken(null);
            localStorage.clear(); // Clear all stored data
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    // Provide token getter to components
    const getAuthToken = async () => {
        if (!auth.currentUser) return null;
        return await getToken(auth.currentUser);
    };

    const value = {
        user,
        setUser,
        loading,
        logout,
        getAuthToken, // Expose token getter
        authToken    // Current token
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};