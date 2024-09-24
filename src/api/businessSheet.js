import { HEADERS_FORM_DATA } from "../constants/headers"

import secureApi from "./secureApi"

const API_URL = `${process.env.REACT_APP_BACKEND_URL}`

const handleApiResponse = async (apiCall) => {
    try {
        const response = await apiCall()
        return { data: response.data, status: response.status }
    } catch (error) {
        if (error.response) {
            return { data: error.response.data, status: error.response.status }
        }
        throw error
    }
}

export const createBusinessSheet = (businessSheetData) =>
    handleApiResponse(() =>
        secureApi.post(`${API_URL}/business-sheets`, businessSheetData, {
            headers: HEADERS_FORM_DATA,
        })
    )
