// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import api from '../utils/axiosConfig';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to get user data from localStorage on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
            }
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    const token = await firebaseUser.getIdToken();
                    try {
                        const response = await api.get('/users/me', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        setUser(response.data.user);
                        // Update localStorage
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                    } catch (error) {
                        if (error.response?.status === 404) {
                            await auth.signOut();
                            setUser(null);
                            localStorage.removeItem('user');
                        }
                        if (error.response?.status !== 404) {
                            console.error('Error fetching user data:', error);
                        }
                    }
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Auth state error:', error);
                setUser(null);
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await auth.signOut(); // Firebase signOut
            setUser(null);
            localStorage.removeItem('user'); // Clear stored user data

            // Optional: Clear any other stored data
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const value = {
        user,
        setUser,
        loading,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
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