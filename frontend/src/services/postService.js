// ../src/services/postService.js
import api from '../utils/axiosConfig';

export const fetchPosts = async (page = 1, limit = 10) => {
    try {
        // console.log('Fetching posts:', { page, limit });
        const response = await api.get('/posts', {
            params: { page, limit }
        });
        // console.log('Posts response:', response.data);
        return response.data;
    } catch (error) {
        // console.error('Fetch posts error:', error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        const response = await api.post('/posts', postData);
        return response.data;
    } catch (error) {
        // console.error('Create post error:', error);
        throw error;
    }
};

export const getMyPosts = async () => {
    const response = await api.get('/posts/my-posts');
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};