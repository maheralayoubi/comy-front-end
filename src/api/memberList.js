import { handleApiResponse, API_URL } from "../utils/apiUtils";
import secureApi from "./secureApi";

export const getMemberList = () =>
    handleApiResponse(() =>
        secureApi.get(`${API_URL}/user/all`)
    );