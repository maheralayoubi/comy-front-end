import { HEADERS_FORM_DATA } from "../constants/headers"
import { handleApiResponse, API_URL } from "../utils/apiUtils"

import secureApi from "./secureApi"

export const createBusinessSheet = (businessSheetData) =>
    handleApiResponse(() =>
        secureApi.post(`${API_URL}/business-sheets`, businessSheetData, {
            headers: HEADERS_FORM_DATA,
        })
    )
