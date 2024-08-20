import axios from 'axios';

const API_URL = 'https://comy-api.vercel.app/auth';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        });
        return { data: response.data, status: response.status };
    } catch (error) {
        if (error.response) {
            return { data: error.response.data, status: error.response.status };
        } else {
            throw error;
        }
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
