import React, { useState, useEffect, createContext, useMemo, useCallback } from "react";
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
  const [selectedSenderId, setSelectedSenderId] = useState(null);
  const [refreshSidebarToggle, setRefreshSidebarToggle] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [showProfile, setShowProfile] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  const currentSystemUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("businessSheetData"));
  }, []);

  const {
    selectedUserSheetData,
    loadingSheet,
    errorSheet,
  } = useChatData(selectedSenderId);

  const {
    isMobileView,
    handleSelectUserMobile,
    handleBackToListMobile,
  } = useResponsiveLayout(selectedChatId, setSelectedChatId);

  const socket = useSocket(selectedChatId, currentSystemUser);

  // Handle socket connection status
  useEffect(() => {
    if (!socket) return;

    const handleConnected = () => {
      console.log("Socket connection established");
      setConnectionStatus("connected");
    };

    const handleDisconnect = (reason) => {
      console.error("Socket disconnected:", reason);
      setConnectionStatus("disconnected");
    };

    socket.on("connect", handleConnected);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnected);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  // Show profile panel when chat info is selected
  useEffect(() => {
    setShowProfile(!!selectedChatInfo);

    if (selectedChatInfo) {
      console.log("Selected Chat ID:", selectedChatId);
      console.log("Selected Chat Info:", selectedChatInfo);
    }
  }, [selectedChatInfo, selectedChatId]);

  // Actions
  const openSheet = useCallback(() => setShowSheet(true), []);
  const closeSheet = useCallback(() => setShowSheet(false), []);
  const refreshSidebar = useCallback(() => {
    setRefreshSidebarToggle((prev) => !prev);
  }, []);

  const handleSelectUser = useCallback((chatId, chatInfo) => {
    if (!chatId) return;

    console.log("Setting selected chat ID:", chatId);
    setSelectedChatId(chatId);
    setSelectedChatInfo(chatInfo);
    handleSelectUserMobile();
  }, [handleSelectUserMobile]);

  const handleBackToList = useCallback(() => {
    handleBackToListMobile();
  }, [handleBackToListMobile]);


  // Main UI
  return (
    <>
      <Header />
      <div className="chat-container">
        {connectionStatus === "disconnected" && (
          <div className="error-banner">
            Socket connection lost. Please refresh the page.
          </div>
        )}
        <SocketContext.Provider value={socket}>
          <div className="chat-wrapper">
            <ChatSidebar
              onSelectUser={handleSelectUser}
              selectedChatId={selectedChatId}
              setSelectedSenderId={setSelectedSenderId}
              currentSystemUserId={currentSystemUser?.userId}
              refreshTrigger={refreshSidebarToggle}
            />

            {selectedChatId && selectedChatInfo && (
              <ChatMain
                showSheet={showSheet}
                openSheet={openSheet}
                selectedChatId={selectedChatId}
                showProfile={showProfile}
                onBackClick={handleBackToList}
                isMobileView={isMobileView}
                currentSystemUser={currentSystemUser}
                chatInfo={selectedChatInfo}
                onRefreshSidebar={refreshSidebar}
                setSelectedSenderId={setSelectedSenderId}
              />
            )}

            {showProfile && (
              <ProfileDisplay
                isBotChat={!selectedChatInfo?.isGroup}
                closeSheet={closeSheet}
                showSheet={showSheet}
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
