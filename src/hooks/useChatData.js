import { useState, useEffect, useCallback } from "react";
import { getUserSheetById } from "../api/businessSheet";

const useChatData = (selectedUserId) => {
  // State management
  const [selectedUserSheetData, setSelectedUserSheetData] = useState(null);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [errorSheet, setErrorSheet] = useState(null);

  // Helper function to add cache-busting timestamp to image URLs
  const addTimestampToUrl = useCallback((url) => {
    if (!url || (!url.startsWith("http") && !url.startsWith("/"))) {
      return url;
    }
    return `${url}?timestamp=${new Date().getTime()}`;
  }, []);

  // Process user data and add timestamps to image URLs
  const processUserData = useCallback((data) => {
    if (!data) return null;

    return {
      ...data,
      headerBackgroundImageUrl: addTimestampToUrl(data.headerBackgroundImageUrl),
      profileImageUrl: addTimestampToUrl(data.profileImageUrl),
    };
  }, [addTimestampToUrl]);

  // Reset function to clear user sheet data
  const resetUserSheetData = useCallback(() => {
    setLoadingSheet(false);
    setErrorSheet(null);
  }, []);

  // Fetch user sheet data
  const fetchUserSheet = useCallback(async () => {
    if (!selectedUserId) {
      setSelectedUserSheetData(null);
      setLoadingSheet(false);
      setErrorSheet(null);
      return;
    }

    setLoadingSheet(true);
    setErrorSheet(null);
    setSelectedUserSheetData(null);

    try {
      const response = await getUserSheetById(selectedUserId);
      
      if (response.data) {
        const processedData = processUserData(response.data);
        setSelectedUserSheetData(processedData);
      } else {
        setErrorSheet("ビジネスシートのデータが見つかりませんでした。");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSelectedUserSheetData(null);
      } else {
        console.error("Error fetching user sheet:", error);
        setErrorSheet("ビジネスシートの取得中にエラーが発生しました。");
      }
    } finally {
      setLoadingSheet(false);
    }
  }, [selectedUserId, processUserData]);

  // Effect to fetch data when selectedUserId changes
  useEffect(() => {
    fetchUserSheet();
  }, [fetchUserSheet]);

  return {
    selectedUserSheetData,
    loadingSheet,
    errorSheet,
    resetUserSheetData,
  };
};

export default useChatData;