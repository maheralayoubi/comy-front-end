import React from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { BUSINESS_SHEET_COPILOT_CONFIG } from "../../constants/copilotConfig";

const CopilotLayout = ({ children, businessSheetData, updateBusinessSheetData }) => {
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
        {React.Children.map(children, child => 
          React.cloneElement(child, { businessSheetData, updateBusinessSheetData })
        )}
        <CopilotPopup
          instructions={BUSINESS_SHEET_COPILOT_CONFIG.instructions}
          defaultOpen={BUSINESS_SHEET_COPILOT_CONFIG.defaultOpen}
          labels={BUSINESS_SHEET_COPILOT_CONFIG.labels}
          hideButton={BUSINESS_SHEET_COPILOT_CONFIG.hideButton}
          clickOutsideToClose={BUSINESS_SHEET_COPILOT_CONFIG.clickOutsideToClose}
          hitEscapeToClose={BUSINESS_SHEET_COPILOT_CONFIG.hitEscapeToClose}
        />
      </CopilotKit>
    </div>
  );
};

export default CopilotLayout;