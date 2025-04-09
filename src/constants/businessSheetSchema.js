// File: src/constants/businessSheetSchema.js
/**
 * Centralized schema definition for all business sheet fields
 */
export const FIELD_TYPES = {
    TEXT: 'text',
    ARRAY: 'array'
};
  
  export const BUSINESS_SHEET_SCHEMA = {
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
  
  // Fields that should not be exposed to CopilotKit
  export const EXCLUDED_FIELDS = ['id', 'userId', 'fontPreference', 'colorPreference'];
  
  // Helper functions for working with the schema
  export const getFieldNames = (type) => 
    Object.entries(BUSINESS_SHEET_SCHEMA)
      .filter(([_, schema]) => schema.type === type)
      .map(([fieldName]) => fieldName);
  
  export const getTextFields = () => getFieldNames(FIELD_TYPES.TEXT);
  export const getArrayFields = () => getFieldNames(FIELD_TYPES.ARRAY);