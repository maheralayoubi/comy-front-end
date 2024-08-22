import axios from 'axios';

const API_URL = 'https://comy-api.vercel.app/auth';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const handleApiResponse = async (apiCall) => {
  try {
    const response = await apiCall();
    return { data: response.data, status: response.status };
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    throw error;
  }
};

export const registerUser = (userData) =>
  handleApiResponse(() => axios.post(`${API_URL}/register`, userData, { headers }));

export const loginUser = (userData) =>
  handleApiResponse(() => axios.post(`${API_URL}/login`, userData, { headers }));