import { useState, useEffect } from "react";
import { getMemberList } from "../api/memberList";

const useChatData = (selectedUserId) => {
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

  useEffect(() => {
    if (selectedUserId) {
      setSelectedUserSheetData(null);
      setLoadingSheet(false);
      setErrorSheet(null);
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
