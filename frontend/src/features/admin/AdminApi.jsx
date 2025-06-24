import {axiosi} from '../../config/axios';

export const fetchStatistics = async () => {
    try {
        const response = await axiosi.get('/statistics');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const fetchOrderStatsByDate = async (period = 'year') => {
    try {
        const response = await axiosi.get(`/statistics/by-date?period=${period}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};