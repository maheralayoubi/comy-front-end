export const handleApiResponse = async (apiCall) => {
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

export const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;
