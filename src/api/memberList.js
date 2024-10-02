import { handleApiResponse, API_URL } from "../utils/apiUtils";
import secureApi from "./secureApi";

export const getMemberList = () =>
  handleApiResponse(() => secureApi.get(`${API_URL}/user/all`));

export const getSearchResults = (query) => {
  if (!query) {
    return Promise.reject(new Error("Search term is required"));
  }

  return handleApiResponse(() =>
    secureApi.get(`${API_URL}/user/search?q=${encodeURIComponent(query)}`),
  );
};
