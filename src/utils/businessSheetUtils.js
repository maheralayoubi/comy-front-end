// Create a new file: utils/businessSheetUtils.js
import { editBusinessSheet } from "../api/businessSheet";

export const createUpdateBusinessSheetData = (setBusinessSheetData, setValue) => {
  return async (updatedData) => {
    console.log("Updating fields:", Object.keys(updatedData));

    // Update the React state directly for immediate UI feedback
    setBusinessSheetData((currentData) => ({
      ...currentData,
      ...updatedData,
    }));

    // Perform the API update
    await editBusinessSheet(updatedData);

    // Update localStorage with the latest state
    setValue("businessSheetData", (businessSheetData) => ({
      ...businessSheetData,
      ...updatedData,
    }));
  };
};