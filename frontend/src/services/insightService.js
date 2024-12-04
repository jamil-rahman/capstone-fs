// src/services/insightsService.js
import api from '../utils/axiosConfig';

export const analyzeCity = async (cityData) => {
    try {
        console.log('Analyzing city:', cityData);
        const response = await api.post('/insights/analyze', cityData);
        console.log('Analysis response:', response.data);
        return response.data;
    } catch (error) {
        console.error('City analysis error:', error);
        throw error;
    }
};