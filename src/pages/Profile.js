import React, { useEffect, useState } from "react";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BusinessSheetTemplate from "../components/business-sheet/BusinessSheetTemplate";
import { SpinnerPage } from "../components/global/Spinner";

import useLocalStorage from "../hooks/useLocalStorage";
import { editBusinessSheet } from "../api/businessSheet";
import { useBusinessSheetCopilotActions } from "../hooks/useBusinessSheetCopilotActions";
import CopilotLayout from "../components/layout/CopilotLayout";

// BusinessSheetWithCopilot component defined outside the main component
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
  const { getValue, setValue, clearAll } = useLocalStorage();

  useEffect(() => {
    console.log("get sheet");
    setBusinessSheetData(getValue("businessSheetData"));
  }, [getValue, setValue, clearAll]);

  const updateBusinessSheetData = async (updatedData) => {
    console.log("Updating fields:", Object.keys(updatedData));

    // First update the React state directly for immediate UI feedback
    setBusinessSheetData((currentData) => ({
      ...currentData,
      ...updatedData,
    }));

    // Then perform the API update
    await editBusinessSheet(updatedData);

    // Finally, update localStorage with the latest state
    setValue("businessSheetData", (businessSheetData) => ({
      ...businessSheetData,
      ...updatedData,
    }));
  };

  return (
    <CopilotLayout>
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
