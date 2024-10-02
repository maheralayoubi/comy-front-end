import PreviewHeader from "../components/PreviewHeader";
import BusinessSheetTemplate from "../components/BusinessSheetTemplate";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { getBusinessSheet } from "../api/businessSheet"

const Preview = () => {
  const { id } = useParams();
  const businessSheetData = null;

  // const [businessSheetData, setBusinessSheetData] = useState(null)

  useEffect(() => {
    console.log(id);
    // const getData = async () => {
    //     const response = await getBusinessSheetById(id)
    //     setBusinessSheetData(response.data)
    // }
    // getData()
  }, [id]);

  return (
    <>
      <PreviewHeader />
      <BusinessSheetTemplate data={businessSheetData} />
    </>
  );
};

export default Preview;
