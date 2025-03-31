import React, { useEffect, useState } from "react";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BusinessSheetTemplate from "../components/business-sheet/BusinessSheetTemplate";
import { SpinnerPage } from "../components/global/Spinner";

import useLocalStorage from "../hooks/useLocalStorage";
import { editBusinessSheet } from "../api/businessSheet";
import { BUSINESS_SHEET_COPILOT_CONFIG } from "../constants/copilotConfig";
import { useBusinessSheetCopilotActions } from '../hooks/useBusinessSheetCopilotActions';

// BusinessSheetWithCopilot component defined outside the main component
const BusinessSheetWithCopilot = ({ businessSheetData, setBusinessSheetData, updateBusinessSheetData }) => {
  // Use the copilot actions hook
  useBusinessSheetCopilotActions({
    businessSheetData,
    updateBusinessSheetData,
  });

  return (
    <BusinessSheetTemplate
      data={businessSheetData}
      setBusinessSheetData={setBusinessSheetData}
      isEdit={true}
      handleEdit={updateBusinessSheetData}
    />
  );
};

const Profile = () => {
  const [businessSheetData, setBusinessSheetData] = useState(null);
  const { getValue, setValue, clearAll } = useLocalStorage();

  useEffect(() => {
    console.log("get sheet");
    setBusinessSheetData(getValue("businessSheetData"));
  }, [getValue, setValue, clearAll]);

  const updateBusinessSheetData = async (updatedData) => {
    console.log("Updating fields:", Object.keys(updatedData));
    
    // First update the React state directly for immediate UI feedback
    setBusinessSheetData(currentData => ({
      ...currentData,
      ...updatedData
    }));
    
    // Then perform the API update
    await editBusinessSheet(updatedData);
    
    // Finally, update localStorage with the latest state
    setValue("businessSheetData", businessSheetData => ({
      ...businessSheetData,
      ...updatedData
    }));
  };
  return (
    <div style={
      {
        "--copilot-kit-primary-color": " #000000",                 // Header Title, close button
        "--copilot-kit-contrast-color": " #FFFFFF",                // User text, close button icon, Header background 
        "--copilot-kit-secondary-contrast-color": " #000000",      // AI text
        "--copilot-kit-background-color": " #FFFFFF",              // The whole chat background
        "--copilot-kit-separator-color": " #F6F7F7",               // Separator
      }
      
      }>
      <Header />

      <CopilotKit runtimeUrl={BUSINESS_SHEET_COPILOT_CONFIG.runtimeUrl}>
        {businessSheetData ? (
          <BusinessSheetWithCopilot 
            businessSheetData={businessSheetData} 
            setBusinessSheetData={setBusinessSheetData}
            updateBusinessSheetData={updateBusinessSheetData}
          />
        ) : (
          <SpinnerPage />
        )}
        <CopilotPopup
          instructions={BUSINESS_SHEET_COPILOT_CONFIG.instructions}
          defaultOpen={BUSINESS_SHEET_COPILOT_CONFIG.defaultOpen}
          labels={BUSINESS_SHEET_COPILOT_CONFIG.labels}
          clickOutsideToClose={BUSINESS_SHEET_COPILOT_CONFIG.clickOutsideToClose}
        />
      </CopilotKit>
      <Footer />
    </div>
  );
};

export default Profile;