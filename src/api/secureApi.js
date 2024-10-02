// src/api/secureApi.js

import { HEADERS } from "../constants/headers";
import axios from "axios";
import { API_URL } from "../utils/apiUtils";

const AUTH_URL = `${API_URL}/auth`;

const secureApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: HEADERS,
});

export const refreshAuthToken = async (originalRequest) => {
  try {
    await secureApi.post(`${AUTH_URL}/refresh`);
    originalRequest._retry = true;
    return secureApi(originalRequest);
  } catch (refreshError) {
    window.location.href = "/login";
    return Promise.reject(refreshError);
  }
};

export const handleUnauthorizedError = async (error) => {
  const originalRequest = error.config;
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    return refreshAuthToken(originalRequest);
  }
  return Promise.reject(error);
};

secureApi.interceptors.response.use(
  (response) => response,
  (error) => handleUnauthorizedError(error),
);

export default secureApi;
