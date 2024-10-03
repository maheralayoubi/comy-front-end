import React, { useEffect, useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BusinessSheetTemplate from "../components/BusinessSheetTemplate";
import { editBusinessSheet } from "../api/businessSheet";
import { SpinnerPage } from "../components/global/Spinner";
import useLocalStorage from "../hooks/useLocalStorage";

const Profile = () => {
  const [businessSheetData, setBusinessSheetData] = useState(null);
  const { getValue, setValue, clearAll } = useLocalStorage();

  useEffect(() => {
    console.log("get sheet");
    setBusinessSheetData(getValue("businessSheetData"));
  }, [getValue, setValue, clearAll]);

  const handleEdit = async (updatedData) => {
    console.log("update");
    await editBusinessSheet(updatedData);

    const updatedBusinessSheetData = {
      ...businessSheetData,
      ...updatedData,
    };

    setValue("businessSheetData", updatedBusinessSheetData);
    setBusinessSheetData(getValue("businessSheetData"));
  };

  return (
    <div>
      <Header />
      {businessSheetData ? (
        <BusinessSheetTemplate
          data={businessSheetData}
          setBusinessSheetData={setBusinessSheetData}
          isEdit={true}
          handleEdit={handleEdit}
        />
      ) : (
        <SpinnerPage />
      )}
      <Footer />
    </div>
  );
};

export default Profile;
