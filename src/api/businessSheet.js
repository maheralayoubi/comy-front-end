import { HEADERS_FORM_DATA, HEADERS } from "../constants/headers";
import { handleApiResponse, API_URL } from "../utils/apiUtils";

import secureApi from "./secureApi";

export const createBusinessSheet = (businessSheetData) =>
  handleApiResponse(() =>
    secureApi.post(`${API_URL}/business-sheets`, businessSheetData, {
      headers: HEADERS_FORM_DATA,
    }),
  );

export const getBusinessSheet = () =>
  handleApiResponse(() =>
    secureApi.get(`${API_URL}/business-sheets`, {
      headers: HEADERS_FORM_DATA,
    }),
  );

export const editBusinessSheet = (businessSheetData) =>
  handleApiResponse(() =>
    secureApi.put(`${API_URL}/business-sheets`, businessSheetData, {
      headers: HEADERS_FORM_DATA,
    }),
  );

export const editUserData = (userData) =>
  handleApiResponse(() =>
    secureApi.patch(`${API_URL}/user`, userData, {
      headers: HEADERS,
    }),
  );

export const getUserSheetById = (userId) =>
  handleApiResponse(() =>
    secureApi.get(`${API_URL}/business-sheets/${userId}`, {
      headers: HEADERS_FORM_DATA,
    }),
  );

export const checkActivate = async () => {
  try {
    const response = await secureApi.get("/user/subscription-status");
    console.log(response.data);
    return response.data.isActive;
  } catch {
    return false;
  }
};
