import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PreviewHeader from "../components/business-sheet/PreviewHeader";
import BusinessSheetTemplate from "../components/business-sheet/BusinessSheetTemplate";
import { SpinnerPage } from "../components/global/Spinner";
import { getUserSheetById } from "../api/businessSheet";

const Preview = () => {
  const { id } = useParams();
  const [businessSheetData, setBusinessSheetData] = useState(null);

  useEffect(() => {
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
        <BusinessSheetTemplate data={businessSheetData} isEdit={false} />
      ) : (
        <SpinnerPage />
      )}
    </>
  );
};

export default Preview;
