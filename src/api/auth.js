import axios from 'axios';

// const API_URL = 'http://localhost:5000';
const API_URL = 'https://comy-api.vercel.app';
const AUTH_URL = `${API_URL}/auth`;

const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

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

const refreshAuthToken = async (originalRequest) => {
  try {
    await api.post(`${AUTH_URL}/refresh`);
    return api(originalRequest);
  } catch (refreshError) {
    window.location.href = '/login';
    return Promise.reject(refreshError);
  }
};

const handleUnauthorizedError = async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return refreshAuthToken(originalRequest);
  }
  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => response,
  (error) => handleUnauthorizedError(error)
);

export const registerUser = (userData) => 
  handleApiResponse(() => api.post(`${AUTH_URL}/register`, userData, { headers: HEADERS }));

export const loginUser = (userData) => 
  handleApiResponse(() => api.post(`${AUTH_URL}/login`, userData, { headers: HEADERS }));

export const forgotPassword = (email) =>
  handleApiResponse(() => axios.post(`${AUTH_URL}/forgot-password`, { email }, { headers: HEADERS }));

export const checkAuth = async () => {
  try {
    const response = await api.get('/check-auth');
    console.log(response.data);
    return response.data.isAuthenticated;
  } catch {
    return false;
  }
};
