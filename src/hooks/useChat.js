import { useCallback, useEffect, useMemo, useState } from "react";
import useResponsiveLayout from "./useResponsiveLayout";
import useSocket from "./useSocket";
import useChatData from "./useChatData";

export const useChat = () => {
  // Chat States
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatInfo, setSelectedChatInfo] = useState(null);
  const [selectedSenderId, setSelectedSenderId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)

  //Socket State
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  // UI States
  const [refreshSidebarToggle, setRefreshSidebarToggle] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Memoized current user data
  const currentSystemUser = useMemo(() => {
    const userData = localStorage.getItem("businessSheetData");
    return userData ? JSON.parse(userData) : null;
  }, []);

  // Custom hook for Responsive Layout
  const {
    isMobileView,
    handleSelectUserMobile,
    handleBackToListMobile,
  } = useResponsiveLayout(selectedChatId, setSelectedChatId,setShowSheet);

  // custom hook for socket io
  const socket = useSocket(currentSystemUser);

  // Get chat data and reset function
  const {
    selectedUserSheetData,
    loadingSheet,
    errorSheet,
    resetUserSheetData,
  } = useChatData(selectedSenderId);

  // Socket connection status tracking
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
  }, [selectedChatInfo, selectedChatId]);

  // Action handlers
  const openSheet = useCallback(() => setShowSheet(prev => !prev), []);

  const closeSheet = useCallback(() => {
    setShowSheet(false);
    resetUserSheetData();
  }, [resetUserSheetData]);

  const refreshSidebar = useCallback(() => {
    setRefreshSidebarToggle((prev) => !prev);
  }, []);

  const handleSelectUser = useCallback((chatId, chatInfo) => {
    if (!chatId) return;

    setSelectedChatId(chatId);
    setSelectedChatInfo(chatInfo);
    handleSelectUserMobile();
  }, [handleSelectUserMobile]);

  const handleBackToList = useCallback(() => {
    handleBackToListMobile();
  }, [handleBackToListMobile]);

  return {
    // States
    selectedChatId,
    selectedChatInfo,
    connectionStatus,
    showProfile,
    showSheet,
    isLoadingMessages,
    isMobileView,
    currentSystemUser,
    refreshSidebarToggle,
    socket,
    selectedUserSheetData,
    loadingSheet,
    errorSheet,
    isAdmin,

    // Actions
    setSelectedSenderId,
    setIsLoadingMessages,
    handleSelectUser,
    handleBackToList,
    openSheet,
    closeSheet,
    refreshSidebar,
    setIsAdmin,
  };
};