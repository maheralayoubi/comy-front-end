import { useState, useEffect, useRef, useCallback } from "react";
import { getMemberList } from "../api/memberList";
import { getUserSheetById } from "../api/businessSheet";

const useChatData = (selectedUserId) => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [selectedUserSheetData, setSelectedUserSheetData] = useState(null);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [errorSheet, setErrorSheet] = useState(null);

  const lastLoggedUserId = useRef(undefined);

  useEffect(() => {
    setLoadingUsers(true);
    setErrorUsers(null);

    getMemberList()
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const chatUsers = response.data.map(user => ({
            id: user.id,
            name: user.name,
            lastMessage: "",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            hasNotification: false,
            initial: user.name ? user.name.charAt(0) : "?",
            profileImageUrl: user.profileImageUrl || "/images/profileImage.png",
          }));
          setUsers(chatUsers);
        } else {
          setErrorUsers("ユーザーが見つかりませんでした。");
        }
        setLoadingUsers(false);
      })
      .catch(() => {
        setErrorUsers("ユーザーリストの取得中にエラーが発生しました。");
        setLoadingUsers(false);
      });
  }, []);

  const fetchUserSheet = useCallback(async () => {
    if (!selectedUserId) return;

    setLoadingSheet(true);
    setErrorSheet(null);
    setSelectedUserSheetData(null);

    try {
      const response = await getUserSheetById(selectedUserId);

      if (response.data) {
        let finalData = { ...response.data };
        let headerUrl = finalData.headerBackgroundImageUrl;
        let profileUrl = finalData.profileImageUrl;

        if (headerUrl && (headerUrl.startsWith("http") || headerUrl.startsWith("/"))) {
          headerUrl = `${headerUrl}?timestamp=${new Date().getTime()}`;
        }
        if (profileUrl && (profileUrl.startsWith("http") || profileUrl.startsWith("/"))) {
          profileUrl = `${profileUrl}?timestamp=${new Date().getTime()}`;
        }

        finalData.headerBackgroundImageUrl = headerUrl;
        finalData.profileImageUrl = profileUrl;

        setSelectedUserSheetData(finalData);
      } else {
        setErrorSheet("ビジネスシートのデータが見つかりませんでした。");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSelectedUserSheetData(null);
      } else {
        setErrorSheet("ビジネスシートの取得中にエラーが発生しました。");
      }
    } finally {
      setLoadingSheet(false);
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedUserId !== lastLoggedUserId.current) {
      console.log("selectedUserId:", selectedUserId);
      lastLoggedUserId.current = selectedUserId;
    }

    if (selectedUserId) {
      fetchUserSheet();
    } else {
      setSelectedUserSheetData(null);
      setLoadingSheet(false);
      setErrorSheet(null);
    }
  }, [selectedUserId, fetchUserSheet]);

  return {
    users,
    loadingUsers,
    errorUsers,
    selectedUserSheetData,
    loadingSheet,
    errorSheet,
  };
};

export default useChatData;
