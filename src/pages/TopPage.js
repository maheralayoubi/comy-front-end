import React from "react";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import TopPage from "../components/top-pages/TopPage";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { BUSINESS_SHEET_COPILOT_CONFIG } from "../constants/copilotConfig";

const Register = () => {
  return (
    <div
      style={{
        "--copilot-kit-primary-color": " #000000",
        "--copilot-kit-contrast-color": " #FFFFFF",
        "--copilot-kit-secondary-contrast-color": " #000000",
        "--copilot-kit-background-color": " #FFFFFF",
        "--copilot-kit-separator-color": " #F6F7F7",
      }}
    >
      <Header />

      <CopilotKit runtimeUrl={BUSINESS_SHEET_COPILOT_CONFIG.runtimeUrl}>
        <TopPage />

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

export default Register;
