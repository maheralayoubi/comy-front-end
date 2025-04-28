import React, { useState, useEffect } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { BUSINESS_SHEET_COPILOT_CONFIG } from "../../constants/copilotConfig";
import MessagePersistenceManager from "./MessagePersistenceManager";
import IMEInputHandler from "./IMEInputHandler";

const CopilotLayout = ({ children, businessSheetData, updateBusinessSheetData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(BUSINESS_SHEET_COPILOT_CONFIG.defaultOpen);
  
  useEffect(() => {
    if (isPopupOpen) {
      document.documentElement.style.setProperty('--button-display', 'none');
    } else {
      document.documentElement.style.setProperty('--button-display', 'block');
    }
  }, [isPopupOpen]);

  return (
    <div
      style={{
        "--copilot-kit-primary-color": "#000000",
        "--copilot-kit-contrast-color": "#FFFFFF",
        "--copilot-kit-secondary-contrast-color": "#000000",
        "--copilot-kit-background-color": "#FFFFFF",
        "--copilot-kit-separator-color": "#F6F7F7",
      }}
    >
      <CopilotKit runtimeUrl={BUSINESS_SHEET_COPILOT_CONFIG.runtimeUrl}>
        <MessagePersistenceManager />
        <IMEInputHandler />
        
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { businessSheetData, updateBusinessSheetData })
        )}
        
        <CopilotPopup
          instructions={BUSINESS_SHEET_COPILOT_CONFIG.instructions}
          defaultOpen={BUSINESS_SHEET_COPILOT_CONFIG.defaultOpen}
          labels={BUSINESS_SHEET_COPILOT_CONFIG.labels}
          hideButton={BUSINESS_SHEET_COPILOT_CONFIG.hideButton}
          clickOutsideToClose={BUSINESS_SHEET_COPILOT_CONFIG.clickOutsideToClose}
          hitEscapeToClose={BUSINESS_SHEET_COPILOT_CONFIG.hitEscapeToClose}
          onSetOpen={setIsPopupOpen}
        />
      </CopilotKit>
    </div>
  );
};

export default CopilotLayout;