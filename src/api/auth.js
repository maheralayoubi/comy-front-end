import { HEADERS } from "../constants/headers";
import { handleApiResponse, API_URL } from "../utils/apiUtils";
import axios from "axios";
import secureApi from "./secureApi";

const AUTH_URL = `${API_URL}/auth`;

export const checkAuth = async () => {
  try {
    const response = await secureApi.get("/check-auth");
    console.log(response.data);
    return response.data.isAuthenticated;
  } catch {
    return false;
  }
};

export const registerUser = (userData) =>
  handleApiResponse(() => secureApi.post(`${AUTH_URL}/register`, userData));

export const loginUser = (userData) =>
  handleApiResponse(() => secureApi.post(`${AUTH_URL}/login`, userData));

// Should not be called with secureApi as users can't be authenticated when they forget their password.
export const forgotPassword = (email) =>
  handleApiResponse(() =>
    axios.post(`${AUTH_URL}/forgot-password`, { email }, { headers: HEADERS }),
  );
