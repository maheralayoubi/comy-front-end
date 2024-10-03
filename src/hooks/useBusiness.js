import { useState, useEffect } from "react";
import { getBusinessSheet } from "../api/businessSheet";
import useLocalStorage from "../hooks/useLocalStorage";


export const useBusiness = () => {
  const [haveBusiness, setHaveBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setValue, clearAll } = useLocalStorage();

  useEffect(() => {
    clearAll()
    const getBusinessSheetData = async () => {
      try {
        const response = await getBusinessSheet();

        if (response.status === 200) {
          setHaveBusiness(true);
          setValue("businessSheetData", response.data);
        }
        else {
          setHaveBusiness(false);
        }



      } catch (error) {
        console.error("user not have Business Sheet Data", error);
      } finally {
        setIsLoading(false);
      }
    };
    getBusinessSheetData();
  }, [clearAll, setValue]);

  return { haveBusiness, isLoading };
};
