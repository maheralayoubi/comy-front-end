import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { useEffect, useRef } from 'react';

// Define maximum array length constants
const ARRAY_FIELD_LIMITS = {
  goldenEgg: 3,      // 3 items as shown in the component
  goldenGoose: 3,    // 3 items as shown in the component
  goldenFarmer: 3,   // 3 items as shown in the component
  powerWords: 6,     // 6 items as shown in the component
  itemsProducts: 3   // 3 items as shown in the component
};

/**
 * Custom hook to set up CopilotKit integrations for the business sheet
 * 
 * @param {Object} params - Parameters for the hook
 * @param {Object} params.businessSheetData - The current business sheet data
 * @param {Function} params.handleEdit - Function to update the business sheet
 * @returns {void}
 */
export const useBusinessSheetCopilotActions = ({ businessSheetData, handleEdit }) => {
  // Use a ref to track whether actions have been registered
  const isInitialized = useRef(false);
  
  // Make the business sheet data available to CopilotKit (this is fine as it's not conditional)
  useCopilotReadable({
    description: "The user's business sheet data.",
    value: businessSheetData,
  });

  // Action to update a single business sheet field - always declare the hook
  useCopilotAction({
    name: "updateBusinessSheetField",
    description: "Update a specific field in the user's business sheet",
    parameters: [
      {
        name: "fieldName",
        type: "string",
        description: "The name of the field to update",
        enum: [
          "shortBiography", 
          "businessDescription", 
          "personalInformation",
          "goals",
          "accomplishments",
          "interests",
          "networks",
          "skills",
          "companyStrengths"
        ]
      },
      {
        name: "content",
        type: "string",
        description: "The new content for the field"
      }
    ],
    handler: ({ fieldName, content }) => {
      // Only perform the action if initialized
      if (!isInitialized.current) {
        console.log("Action not initialized yet");
        return "Action initializing, please try again...";
      }
      
      console.log(`Updating ${fieldName}`);
      
      // Create update object with the field to update
      const updateData = {
        [fieldName]: content
      };
      
      // Call the handleEdit function to update the business sheet
      handleEdit(updateData);
      
      return `Updated ${fieldName} successfully`;
    },
    render: "Updating your business sheet..."
  });
  
  // Action to update array-based fields - always declare the hook
  useCopilotAction({
    name: "updateBusinessSheetArrayField",
    description: "Update an array-based field in the user's business sheet",
    parameters: [
      {
        name: "fieldName",
        type: "string",
        description: "The name of the array field to update",
        enum: [
          "goldenEgg",
          "goldenGoose",
          "goldenFarmer",
          "powerWords",
          "itemsProducts"
        ]
      },
      {
        name: "items",
        type: "string[]",
        description: "Array of items to set for this field"
      }
    ],
    handler: ({ fieldName, items }) => {
      // Only perform the action if initialized
      if (!isInitialized.current) {
        console.log("Action not initialized yet");
        return "Action initializing, please try again...";
      }
      
      console.log(`Updating ${fieldName} array`);
      
      // Get the maximum allowed items for this field
      const maxItems = ARRAY_FIELD_LIMITS[fieldName];
      
      // Create a new array that is exactly the required length
      let processedItems = [];
      
      // Add items from the input array up to the limit
      for (let i = 0; i < maxItems; i++) {
        // If we have an item at this index, use it; otherwise use empty string
        processedItems[i] = (i < items.length) ? items[i] : "";
      }
      
      if (items.length > maxItems) {
        console.warn(`Field ${fieldName} limited to ${maxItems} items. ${items.length - maxItems} items were truncated.`);
      } else if (items.length < maxItems) {
        console.warn(`Field ${fieldName} requires ${maxItems} items. ${maxItems - items.length} empty items were added.`);
      }
      
      // Create update object with the array field to update
      const updateData = {
        [fieldName]: processedItems
      };
      
      // Call the handleEdit function to update the business sheet
      handleEdit(updateData);
      
      return `Updated ${fieldName} successfully with exactly ${maxItems} item(s)`;
    },
    render: "Updating your business sheet..."
  });
  
  // Action to suggest improvements - always declare the hook
  useCopilotAction({
    name: "suggestImprovementsForField",
    description: "Suggest improvements for a specific field without updating it directly",
    parameters: [
      {
        name: "fieldName",
        type: "string",
        description: "The name of the field to suggest improvements for",
        enum: [
          "shortBiography", 
          "businessDescription", 
          "personalInformation",
          "goals",
          "accomplishments",
          "interests",
          "networks",
          "skills",
          "companyStrengths",
          "goldenEgg",
          "goldenGoose",
          "goldenFarmer",
          "powerWords",
          "itemsProducts"
        ]
      },
      {
        name: "suggestions",
        type: "string",
        description: "Detailed suggestions for improving the field"
      }
    ],
    handler: ({ fieldName, suggestions }) => {
      // Only perform the action if initialized
      if (!isInitialized.current) {
        console.log("Action not initialized yet");
        return "Action initializing, please try again...";
      }
      
      // This action doesn't modify data directly, it just returns suggestions
      // The copilot will present these suggestions to the user
      return suggestions;
    },
    render: "Generating suggestions..."
  });
  
  // Use useEffect to mark initialization as complete after the first render
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      console.log("Business sheet copilot actions initialized");
    }
  }, []);
};