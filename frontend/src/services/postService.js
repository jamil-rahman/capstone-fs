import api from '../utils/axiosConfig';

export const fetchPosts = async (page = 1, limit = 10) => {
    try {
        console.log('Fetching posts:', { page, limit });

        const response = await api.get('/posts', {
            params: { page, limit }
        });

        console.log('Posts response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch posts error:', error);
        throw error;
    }
};