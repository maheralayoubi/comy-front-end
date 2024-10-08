import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PreviewHeader from "../components/PreviewHeader";
import BusinessSheetTemplate from "../components/BusinessSheetTemplate";
import { SpinnerPage } from "../components/global/Spinner";

import { getUserSheetById } from "../api/businessSheet";

const Preview = () => {
  const { id } = useParams();
  const [businessSheetData, setBusinessSheetData] = useState(null);

  useEffect(() => {
    console.log(id);
    const getData = async () => {
      const response = await getUserSheetById(id);
      setBusinessSheetData(response.data);
    };
    getData();
  }, [id]);

  return (
    <>
      <PreviewHeader />
      {businessSheetData ? (
        <BusinessSheetTemplate data={businessSheetData} isPreview={true} />
      ) : (
        <SpinnerPage />
      )}
    </>
  );
};

export default Preview;
