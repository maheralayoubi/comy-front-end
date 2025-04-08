import React, { useEffect, useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BusinessSheetTemplate from "../components/business-sheet/BusinessSheetTemplate";
import { SpinnerPage } from "../components/global/Spinner";
import useLocalStorage from "../hooks/useLocalStorage";
import { useBusinessSheetCopilotActions } from "../hooks/useBusinessSheetCopilotActions";
import CopilotLayout from "../components/layout/CopilotLayout";
import { createUpdateBusinessSheetData } from "../utils/businessSheetUtils";

const BusinessSheetWithCopilot = ({
  businessSheetData,
  setBusinessSheetData,
  updateBusinessSheetData,
}) => {
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
  const { getValue, setValue } = useLocalStorage();

  useEffect(() => {
    console.log("get sheet");
    setBusinessSheetData(getValue("businessSheetData"));
  }, [getValue]);

  const updateBusinessSheetData = createUpdateBusinessSheetData(
    setBusinessSheetData,
    setValue
  );

  return (
    <CopilotLayout 
      businessSheetData={businessSheetData}
      updateBusinessSheetData={updateBusinessSheetData}
    >
      <Header />
      {businessSheetData ? (
        <BusinessSheetWithCopilot
          businessSheetData={businessSheetData}
          setBusinessSheetData={setBusinessSheetData}
          updateBusinessSheetData={updateBusinessSheetData}
        />
      ) : (
        <SpinnerPage />
      )}
      <Footer />
    </CopilotLayout>
  );
};

export default Profile;