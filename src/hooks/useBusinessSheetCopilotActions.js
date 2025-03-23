import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { useEffect, useRef } from 'react';

// Define field types and their constraints for better type safety and documentation
const FIELD_TYPES = {
  TEXT: 'text',
  ARRAY: 'array'
};

// Centralized schema definition for all business sheet fields
const BUSINESS_SHEET_SCHEMA = {
  // Text fields
  shortBiography: { type: FIELD_TYPES.TEXT, description: 'Short biography of the user' },
  businessDescription: { type: FIELD_TYPES.TEXT, description: 'Description of the user\'s business' },
  personalInformation: { type: FIELD_TYPES.TEXT, description: 'User\'s personal information' },
  goals: { type: FIELD_TYPES.TEXT, description: 'User\'s business goals' },
  accomplishments: { type: FIELD_TYPES.TEXT, description: 'User\'s accomplishments' },
  interests: { type: FIELD_TYPES.TEXT, description: 'User\'s interests' },
  networks: { type: FIELD_TYPES.TEXT, description: 'User\'s professional networks' },
  skills: { type: FIELD_TYPES.TEXT, description: 'User\'s professional skills' },
  companyStrengths: { type: FIELD_TYPES.TEXT, description: 'Strengths of the user\'s company' },
  
  // Array fields with max length constraints
  goldenEgg: { type: FIELD_TYPES.ARRAY, maxItems: 3, description: 'Golden egg items' },
  goldenGoose: { type: FIELD_TYPES.ARRAY, maxItems: 3, description: 'Golden goose items' },
  goldenFarmer: { type: FIELD_TYPES.ARRAY, maxItems: 3, description: 'Golden farmer items' },
  powerWords: { type: FIELD_TYPES.ARRAY, maxItems: 6, description: 'Power words' },
  itemsProducts: { type: FIELD_TYPES.ARRAY, maxItems: 3, description: 'User\'s items or products' }
};

// Helper functions
const getFieldNames = (type) => 
  Object.entries(BUSINESS_SHEET_SCHEMA)
    .filter(([_, schema]) => schema.type === type)
    .map(([fieldName]) => fieldName);

const getTextFields = () => getFieldNames(FIELD_TYPES.TEXT);
const getArrayFields = () => getFieldNames(FIELD_TYPES.ARRAY);

/**
 * Normalizes array field values to match required length
 * 
 * @param {string[]} items - The array of items to normalize
 * @param {number} maxItems - The required length of the array
 * @param {string} fieldName - The name of the field (for logging)
 * @returns {string[]} - Normalized array of exactly maxItems length
 */
const normalizeArrayField = (items, maxItems, fieldName) => {
  // Create a new array of exactly the required length
  const normalized = Array(maxItems).fill("");
  
  // Fill in values from the provided items array (up to maxItems)
  items.slice(0, maxItems).forEach((item, index) => {
    normalized[index] = item;
  });
  
  // Log appropriate warnings
  if (items.length > maxItems) {
    console.warn(`Field ${fieldName} limited to ${maxItems} items. ${items.length - maxItems} items were truncated.`);
  } else if (items.length < maxItems) {
    console.warn(`Field ${fieldName} requires ${maxItems} items. ${maxItems - items.length} empty items were added.`);
  }
  
  return normalized;
};

/**
 * Custom hook to set up CopilotKit integrations for the business sheet
 * 
 * @param {Object} params - Parameters for the hook
 * @param {Object} params.businessSheetData - The current business sheet data
 * @param {Function} params.updateBusinessSheetData - Function to update the business sheet
 * @returns {Object} - Object containing initialization status
 */
export const useBusinessSheetCopilotActions = ({ businessSheetData, updateBusinessSheetData }) => {
  // Use a ref to track whether actions have been registered
  const isInitialized = useRef(false);
  
  // Make the business sheet data available to CopilotKit
  useCopilotReadable({
    description: "The user's business sheet data.",
    value: businessSheetData,
  });

  // Create a reusable action guard for handlers
  const guardAction = (callback) => {
    if (!isInitialized.current) {
      console.log("Action not initialized yet");
      return "Action initializing, please try again...";
    }
    return callback();
  };
  
  // Action to update a single business sheet field
  useCopilotAction({
    name: "updateBusinessSheetField",
    description: "Update a specific text field in the user's business sheet",
    parameters: [
      {
        name: "fieldName",
        type: "string",
        description: "The name of the field to update",
        enum: getTextFields()
      },
      {
        name: "content",
        type: "string",
        description: "The new content for the field"
      }
    ],
    handler: ({ fieldName, content }) => 
      guardAction(() => {
        console.log(`Updating ${fieldName}`);
        
        updateBusinessSheetData({ [fieldName]: content });
        
        return `Updated ${fieldName} successfully`;
      }),
    render: "Updating your business sheet..."
  });
  
  // Action to update array-based fields
  useCopilotAction({
    name: "updateBusinessSheetArrayField",
    description: "Update an array-based field in the user's business sheet",
    parameters: [
      {
        name: "fieldName",
        type: "string",
        description: "The name of the array field to update",
        enum: getArrayFields()
      },
      {
        name: "items",
        type: "string[]",
        description: "Array of items to set for this field"
      }
    ],
    handler: ({ fieldName, items }) => 
      guardAction(() => {
        console.log(`Updating ${fieldName} array`);
        
        const { maxItems } = BUSINESS_SHEET_SCHEMA[fieldName];
        const processedItems = normalizeArrayField(items, maxItems, fieldName);
        
        updateBusinessSheetData({ [fieldName]: processedItems });
        
        return `Updated ${fieldName} successfully with exactly ${maxItems} item(s)`;
      }),
    render: "Updating your business sheet..."
  });
  
  // Mark initialization as complete after first render
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      console.log("Business sheet copilot actions initialized");
    }
  }, []);
  
  // Return initialization status for external reference
  return { isInitialized: isInitialized.current };
};