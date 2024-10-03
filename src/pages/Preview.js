import PreviewHeader from "../components/PreviewHeader";
import BusinessSheetTemplate from "../components/BusinessSheetTemplate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserSheetById } from "../api/businessSheet"
import { SpinnerPage } from "../components/global/Spinner";
const Preview = () => {
  const { id } = useParams();

  const [businessSheetData, setBusinessSheetData] = useState(null)

  useEffect(() => {
    console.log(id);
    const getData = async () => {
      const response = await getUserSheetById(id)
      console.log(response)
      setBusinessSheetData(response.data)
    }
    getData()
  }, [id]);

  return (
    <>
      <PreviewHeader />
      {
        businessSheetData ?
          <BusinessSheetTemplate data={businessSheetData} isPreview={true} /> :
          <SpinnerPage />
      }
    </>
  );
};

export default Preview;
