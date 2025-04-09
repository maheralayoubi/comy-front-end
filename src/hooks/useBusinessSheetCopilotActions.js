import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { useEffect, useRef, useMemo } from 'react';

import {
  BUSINESS_SHEET_SCHEMA,
  getTextFields,
  getArrayFields,
  EXCLUDED_FIELDS,
} from '../constants/businessSheetSchema';

import {
  filterBusinessSheetData,
  normalizeArrayField,
} from '../utils/businessSheetUtils';

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

    // Create a filtered version of businessSheetData (excluding sensitive fields)
  const filteredBusinessSheetData = useMemo(() => 
    filterBusinessSheetData(businessSheetData, EXCLUDED_FIELDS),
    [businessSheetData]
  );
  
  // Make the filtered business sheet data available to CopilotKit
  useCopilotReadable({
    description: "The user's business sheet data.",
    value: filteredBusinessSheetData,
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