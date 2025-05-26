import { useState, useEffect } from "react";
import { getMemberList } from "../api/memberList";
import { getUserSheetById } from "../api/businessSheet";

const useChatData = (selectedUserId) => {
  console.log(selectedUserId)
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [selectedUserSheetData, setSelectedUserSheetData] = useState(null);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [errorSheet, setErrorSheet] = useState(null);

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
      .catch((error) => {
        setErrorUsers("ユーザーリストの取得中にエラーが発生しました。");
        setLoadingUsers(false);
      });
  }, []);

    console.log(selectedUserId)

  useEffect(() => {
    if (selectedUserId) {
      setLoadingSheet(true);
      setErrorSheet(null);
      setSelectedUserSheetData(null);

      getUserSheetById(selectedUserId)
        .then(response => {
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
          setLoadingSheet(false);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            console.warn("No business sheet found for user:", selectedUserId);
            setSelectedUserSheetData(null);
          } else {
            setErrorSheet("ビジネスシートの取得中にエラーが発生しました。");
          }
          setLoadingSheet(false);
        });
    } else {
      setSelectedUserSheetData(null);
      setLoadingSheet(false);
      setErrorSheet(null);
    }
  }, [selectedUserId]);

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