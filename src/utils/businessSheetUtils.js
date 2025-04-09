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


/**
 * Filters out specified fields from a business sheet data object
 * 
 * @param {Object} data - The business sheet data to filter
 * @param {string[]} excludedFields - Array of field names to exclude
 * @returns {Object} - Filtered business sheet data
 */
export const filterBusinessSheetData = (data, excludedFields) => {
  if (!data) return {};
  
  const filtered = {...data};
  excludedFields.forEach(field => {
    delete filtered[field];
  });
  
  return filtered;
};


/**
 * Normalizes array field values to match required length
 * 
 * @param {string[]} items - The array of items to normalize
 * @param {number} maxItems - The required length of the array
 * @param {string} fieldName - The name of the field (for logging)
 * @returns {string[]} - Normalized array of exactly maxItems length
 */
export const normalizeArrayField = (items, maxItems, fieldName) => {
  if (!Array.isArray(items)) {
    console.error(`Field ${fieldName} expects an array, received ${typeof items}`);
    return Array(maxItems).fill("");
  }
  
  // Create a new array of exactly the required length
  const normalized = Array(maxItems).fill("");
  
  // Fill in values from the provided items array (up to maxItems)
  items.slice(0, maxItems).forEach((item, index) => {
    normalized[index] = item || ""; // Handle null/undefined items
  });
  
  // Log appropriate warnings
  if (items.length > maxItems) {
    console.warn(`Field ${fieldName} limited to ${maxItems} items. ${items.length - maxItems} items were truncated.`);
  } else if (items.length < maxItems) {
    console.warn(`Field ${fieldName} requires ${maxItems} items. ${maxItems - items.length} empty items were added.`);
  }
  
  return normalized;
};
