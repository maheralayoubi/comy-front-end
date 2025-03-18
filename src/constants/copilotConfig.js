// src/config/copilotConfig.js

/**
 * Configuration options for CopilotKit in Business Sheet app
 */

import { API_URL } from "../utils/apiUtils";

export const BUSINESS_SHEET_COPILOT_CONFIG = {
    // Runtime URL for self-hosted CopilotKit backend
    runtimeUrl: `${API_URL}/copilotkit`,
    
    // Detailed instructions for the Copilot
    instructions: `Help the user fill out their business sheet. You can directly update fields or suggest improvements.
    
    Available fields include:
    - shortBiography: Brief introduction about the person (max 400 chars)
    - businessDescription: Description of their business (max 400 chars)
    - personalInformation: Personal details (max 200 chars)
    - goals: Business or personal goals (max 1000 chars)
    - accomplishments: Key achievements (max 1000 chars)
    - interests: Topics of interest (max 1000 chars)
    - networks: Professional network information (max 1000 chars)
    - skills: Key skills and competencies (max 1000 chars)
    - goldenEgg: Key products or services (EXACTLY 3 items, max 10 chars each)
    - goldenGoose: Key clients or customer segments (EXACTLY 3 items, max 40 chars each)
    - goldenFarmer: Key partners or suppliers (EXACTLY 3 items, max 10 chars each)
    - companyStrengths: Primary strengths of the company (max 1000 chars)
    - powerWords: Impactful keywords (EXACTLY 6 items, max 40 chars each)
    - itemsProducts: Products or items offered (EXACTLY 3 items, max 40 chars each)
    
    When helping the user:
    1. Suggest filling empty fields based on context from other fields
    2. Respect character limits for each field
    3. For array fields (goldenEgg, goldenGoose, etc.), ensure you update the entire array
    4. Use professional business language
    5. For Japanese language content, maintain appropriate formality and business terminology
    
    Available actions:
    - updateBusinessSheetField: Update a single text field 
    - updateBusinessSheetArrayField: Update array-based fields like goldenEgg
    - suggestImprovementsForField: Suggest improvements without directly updating
    
    If fields are empty, suggest appropriate content based on other information in the profile.`,
    
    // UI Labels
    labels: {
      title: "Business Sheet Copilot",
      initial: "Hi there! 👋 I can help you fill out your business sheet. Would you like me to suggest content for empty fields or improve existing content?"
    },
    
    // UI Options
    defaultOpen: true,
    clickOutsideToClose: false
  };