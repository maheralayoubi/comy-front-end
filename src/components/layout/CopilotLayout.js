import React, { useEffect } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { BUSINESS_SHEET_COPILOT_CONFIG } from "../../constants/copilotConfig";

const CopilotLayout = ({ children, businessSheetData, updateBusinessSheetData }) => {
  useEffect(() => {
    // Add event listener after component is mounted
    const setupIMEHandling = () => {
      // Wait for CopilotKit's input to be rendered in the DOM
      setTimeout(() => {
        const textareas = document.querySelectorAll('.copilotKitInput textarea');
        if (textareas.length > 0) {
          textareas.forEach(textarea => {
            // Store whether the input is currently in IME composition mode
            let isComposing = false;
            
            // Add IME composition event listeners
            textarea.addEventListener('compositionstart', () => {
              isComposing = true;
            });
            
            textarea.addEventListener('compositionend', () => {
              isComposing = false;
            });
            
            // Override the keydown event handler to check if IME composition is active
            textarea.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                // If we're in IME composition mode, don't submit
                if (isComposing) {
                  e.stopPropagation();
                  // Let the event propagate normally for IME confirmation
                }
              }
            }, true); // Use capturing phase to intercept before CopilotKit's handlers
          });
        }
      }, 500); // Small delay to ensure CopilotKit components are mounted
    };
    
    setupIMEHandling();
    
    // Setup again when popup is toggled open
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setupIMEHandling();
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

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