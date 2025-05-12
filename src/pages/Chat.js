import React, { useState, useEffect, createContext } from "react";
import Header from "../components/global/Header";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMain from "../components/chat/ChatMain";
import ProfileDisplay from "../components/chat/ProfileDisplay";
import useSocket from "../hooks/useSocket";
import useChatData from "../hooks/useChatData";
import useResponsiveLayout from "../hooks/useResponsiveLayout";
import "../components/chat/styles/Chat.scss";

export const SocketContext = createContext(null);

const Chat = ({ currentSystemUser }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedChatInfo, setSelectedChatInfo] = useState(null);

  const {
    users,
    loadingUsers,
    errorUsers,
    selectedUserSheetData,
    loadingSheet,
    errorSheet
  } = useChatData(selectedUserId);

  const {
    isMobileView,
    handleSelectUserMobile,
    handleBackToListMobile
  } = useResponsiveLayout(selectedUserId, setSelectedUserId);

  const socket = useSocket(users, selectedUserId, currentSystemUser);

  useEffect(() => {}, []);

  const handleSelectUser = (userId, chatInfo) => {
    setSelectedUserId(userId);
    setSelectedChatInfo(chatInfo); 
    handleSelectUserMobile();
  };

  const handleBackToList = () => {
    handleBackToListMobile();
  };

  const selectedUser = users.find(u => u.id === selectedUserId);

  if (loadingUsers) {
    return (
      <>
        <Header />
        <div className="chat-container">
          <div className="loading">ユーザーリストを読み込み中...</div>
        </div>
      </>
    );
  }

  if (errorUsers) {
    return (
      <>
        <Header />
        <div className="chat-container">
          <div className="error">{errorUsers}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="chat-container">
        <SocketContext.Provider value={socket}>
          <div className="chat-wrapper">
            <ChatSidebar
              users={users}
              onSelectUser={handleSelectUser}
              selectedUserId={selectedUserId}
            />

            {selectedUserId && selectedChatInfo && (
              <ChatMain
                selectedUserId={selectedUserId}
                onBackClick={handleBackToList}
                isMobileView={isMobileView}
                users={users}
                currentSystemUser={currentSystemUser}
                chatInfo={selectedChatInfo}
              />
            )}

            {selectedUser && selectedUser.name !== "COMY オフィシャル AI" && (
              <ProfileDisplay
                loadingSheet={loadingSheet}
                errorSheet={errorSheet}
                selectedUserSheetData={selectedUserSheetData}
                selectedUserId={selectedUserId}
                isMobileView={isMobileView}
              />
            )}
          </div>
        </SocketContext.Provider>
      </div>
    </>
  );
};

export default Chat;