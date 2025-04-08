import React, { useState, useEffect } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import MemberList from "../components/others/MemberList";
import CopilotLayout from "../components/layout/CopilotLayout";
import useLocalStorage from "../hooks/useLocalStorage";
import { useBusinessSheetCopilotActions } from "../hooks/useBusinessSheetCopilotActions";
import { createUpdateBusinessSheetData } from "../utils/businessSheetUtils";

const MemberListWithCopilot = ({
  businessSheetData,
  updateBusinessSheetData,
}) => {
  // Use the copilot actions hook
  useBusinessSheetCopilotActions({
    businessSheetData,
    updateBusinessSheetData,
  });

  return <MemberList businessSheetData={businessSheetData} />;
};

const MemberListContainer = () => {
  const [businessSheetData, setBusinessSheetData] = useState(null);
  const { getValue, setValue } = useLocalStorage();

  useEffect(() => {
    console.log("get sheet for member list page");
    const data = getValue("businessSheetData");
    setBusinessSheetData(data);
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
        <MemberListWithCopilot
          businessSheetData={businessSheetData || {}}
          updateBusinessSheetData={updateBusinessSheetData}
        />
      </CopilotLayout>
      <Footer />
    </>
  );
};

export default MemberListContainer;