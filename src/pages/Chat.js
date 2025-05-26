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

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatInfo, setSelectedChatInfo] = useState(null);
  const [selectedSenderId, setSelectedSenderId] = useState(null) 
  const [refreshSidebarToggle, setRefreshSidebarToggle] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [showProfile, setShowProfile] = useState(false);

  const currentSystemUser = JSON.parse(localStorage.getItem('businessSheetData'))

  const {
    users,
    loadingUsers,
    errorUsers,
    selectedUserSheetData,
    loadingSheet,
    errorSheet
  } = useChatData(selectedSenderId);

  const {
    isMobileView,
    handleSelectUserMobile,
    handleBackToListMobile
  } = useResponsiveLayout(selectedChatId, setSelectedChatId);

  const socket = useSocket(users, selectedChatId, currentSystemUser);
  
  useEffect(() => {
    if (socket) {
      const handleConnected = () => {
        console.log('Socket connection established');
        setConnectionStatus('connected');
      };
      
      const handleDisconnect = (reason) => {
        console.error('Socket disconnected:', reason);
        setConnectionStatus('disconnected');
      };
      
      socket.on('connect', handleConnected);
      socket.on('disconnect', handleDisconnect);
      
      return () => {
        socket.off('connect', handleConnected);
        socket.off('disconnect', handleDisconnect);
      };
    }
  }, [socket]);

  useEffect(() => {
    // When selectedChatInfo changes, determine if we should show the profile
    if (selectedChatInfo) {
      const isBot = selectedChatInfo.name === "COMY オフィシャル AI";
      setShowProfile(!isBot);
      
      // Log for debugging
      console.log('Selected user ID for profile:', selectedChatId);
      console.log('Selected chat info:', selectedChatInfo);
    } else {
      setShowProfile(false);
    }
  }, [selectedChatInfo, selectedChatId]);

  const refreshSidebar = () => {
    setRefreshSidebarToggle(prev => !prev);
  };

  const handleSelectUser = (userId, chatInfo) => {
    if (!userId) return;
    console.log(userId)
    console.log('Setting selected user ID:', userId);
    setSelectedChatId(userId);
    setSelectedChatInfo(chatInfo);
    handleSelectUserMobile();
  };

  const handleBackToList = () => {
    handleBackToListMobile();
  };

  console.log(selectedChatId)
  console.log(selectedChatInfo)

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
        {connectionStatus === 'disconnected' && (
          <div className="error-banner">
            Socket connection lost. Please refresh the page.
          </div>
        )}
        <SocketContext.Provider value={socket}>
          <div className="chat-wrapper">
            <ChatSidebar
              users={users}
              onSelectUser={handleSelectUser}
              selectedChatId={selectedChatId}
              setSelectedSenderId={setSelectedSenderId}
              currentSystemUserId={currentSystemUser?.userId}
              refreshTrigger={refreshSidebarToggle}
            />

            {selectedChatId && selectedChatInfo && (
              <ChatMain
                selectedChatId={selectedChatId}
                showProfile={showProfile}
                onBackClick={handleBackToList}
                isMobileView={isMobileView}
                users={users}
                currentSystemUser={currentSystemUser}
                chatInfo={selectedChatInfo}
                onRefreshSidebar={refreshSidebar}
              />
            )}

            {showProfile && (
              <ProfileDisplay
                loadingSheet={loadingSheet}
                errorSheet={errorSheet}
                selectedUserSheetData={selectedUserSheetData}
                selectedChatId={selectedChatId}
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
