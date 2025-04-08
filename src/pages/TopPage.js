// Updated TopPage.js
import React, { useEffect, useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import TopPage from "../components/top-pages/TopPage";
import CopilotLayout from "../components/layout/CopilotLayout";
import useLocalStorage from "../hooks/useLocalStorage";
import { useBusinessSheetCopilotActions } from "../hooks/useBusinessSheetCopilotActions";
import { createUpdateBusinessSheetData } from "../utils/businessSheetUtils";

const TopPageWithCopilot = ({
  businessSheetData,
  updateBusinessSheetData,
}) => {
  // Use the copilot actions hook
  useBusinessSheetCopilotActions({
    businessSheetData,
    updateBusinessSheetData,
  });

  return <TopPage businessSheetData={businessSheetData} />;
};

const TopPageContainer = () => {
  const [businessSheetData, setBusinessSheetData] = useState(null);
  const { getValue, setValue } = useLocalStorage();

  useEffect(() => {
    console.log("get sheet for top page");
    setBusinessSheetData(getValue("businessSheetData"));
  }, [getValue]);

  const updateBusinessSheetData = createUpdateBusinessSheetData(
    setBusinessSheetData,
    setValue
  );

  return (
    <>
      <Header />
      <CopilotLayout
        businessSheetData={businessSheetData || {}}
        updateBusinessSheetData={updateBusinessSheetData}
        >
        {/* Use conditional rendering with a fallback */}
        <TopPageWithCopilot
          businessSheetData={businessSheetData || {}}
          updateBusinessSheetData={updateBusinessSheetData}
        />
      </CopilotLayout>
      <Footer />
    </>
  );
};

export default TopPageContainer;