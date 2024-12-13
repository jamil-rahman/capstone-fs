import api from '../utils/axiosConfig';

export const getUserProfile = async (userId) => {
    const response = await api.get(`/users/profile/${userId}`);
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
};

export const getMiniProfile = async (userId) => {
    try {
        const response = await api.get(`/users/mini-profile/${userId}`);
        return response.data;
    } catch (error) {
        // console.error('GetMiniProfile error:', error);
        throw error;
    }
};