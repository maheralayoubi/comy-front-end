import React, { useState, useEffect, createContext, useCallback } from "react";
import Header from "../components/global/Header";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMain from "../components/chat/ChatMain";
import ProfileDisplay from "../components/chat/ProfileDisplay";
import useSocket from "../hooks/useSocket";
import useChatData from "../hooks/useChatData"; // This hook fetches user sheet data
import useResponsiveLayout from "../hooks/useResponsiveLayout";
import "../components/chat/styles/Chat.scss";
import axios from "axios"; // For fetching bot chat ID

export const SocketContext = createContext(null);

// Constant for bot user ID from backend, used to identify the bot chat
const ACTUAL_BOT_USER_ID = "681547798892749fbe910c02"; 
const BOT_CHAT_SIDEBAR_ID = "BOT_CHAT_IDENTIFIER"; // Identifier used in ChatSidebar

const Chat = ({ currentSystemUser }) => {
  const [selectedChatId, setSelectedChatId] = useState(null); // This will be the actual ID of the chat
  const [activeSuggestedUserId, setActiveSuggestedUserId] = useState(null); // For ProfileDisplay
  const [botChatDetails, setBotChatDetails] = useState(null); // To store the resolved bot chat object

  // Fetch all chats to find the bot chat ID initially
  // The `users` from useChatData is actually the list of chats for the sidebar in the original design.
  // We need a way to get the bot's chat ID to pass to ChatMain.
  useEffect(() => {
    const findBotChat = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/chats", { withCredentials: true });
        const allChats = response.data;
        if (allChats && Array.isArray(allChats)) {
          const foundBotChat = allChats.find(chat => 
            chat.users && chat.users.includes(ACTUAL_BOT_USER_ID) && !chat.isGroupChat // Assuming bot chat is a direct chat
          );
          if (foundBotChat) {
            setBotChatDetails(foundBotChat);
            // If no chat is selected, or if the bot chat was intended, select it.
            if (!selectedChatId) {
              setSelectedChatId(foundBotChat.id);
            }
          } else {
            console.warn("Actual bot chat could not be found via API.");
          }
        }
      } catch (error) {
        console.error("Failed to fetch chats to find bot chat:", error);
      }
    };
    findBotChat();
  }, [selectedChatId]); // Re-run if selectedChatId changes to ensure bot chat is prioritized if needed

  // useChatData fetches sheet data for a given *user ID*, not chat ID.
  // ProfileDisplay needs a USER ID. If a suggestion is active, it's activeSuggestedUserId.
  // If a normal chat is selected, it might be the other user in that chat.
  // This part needs careful handling based on what ProfileDisplay expects.
  // For now, selectedUserSheetData is based on selectedChatId (if it's a user) or activeSuggestedUserId.
  const profileDisplayUserId = activeSuggestedUserId || (selectedChatId && selectedChatId !== botChatDetails?.id ? selectedChatId : null);
  const { selectedUserSheetData, loadingSheet, errorSheet } = useChatData(profileDisplayUserId);

  const { isMobileView, handleSelectUserMobile, handleBackToListMobile } = useResponsiveLayout(selectedChatId, setSelectedChatId);
  
  // The `users` prop for useSocket and ChatMain should be the list of chats/users for the sidebar.
  // Since sidebar is now static (only bot), this `users` prop might be less relevant or needs to be the botChatDetails in an array.
  const socketUsers = botChatDetails ? [botChatDetails] : [];
  const socket = useSocket(socketUsers, selectedChatId, currentSystemUser);

  const handleSelectUserFromSidebar = useCallback((sidebarId) => {
    if (sidebarId === BOT_CHAT_SIDEBAR_ID && botChatDetails) {
      setSelectedChatId(botChatDetails.id);
      setActiveSuggestedUserId(null); // Clear any previous suggestion when bot chat is reselected
    } else {
      // Handle other chat selections if sidebar becomes dynamic again
      setSelectedChatId(sidebarId);
      setActiveSuggestedUserId(null);
    }
    handleSelectUserMobile();
  }, [botChatDetails, handleSelectUserMobile]);

  // Callback for ChatMain to inform Chat.js about an active suggestion
  const handleSuggestionChange = useCallback((suggestedUserId) => {
    setActiveSuggestedUserId(suggestedUserId);
  }, []);

  useEffect(() => {
    // If bot chat is found and no chat is selected, select the bot chat by default.
    if (!selectedChatId && botChatDetails) {
      handleSelectUserFromSidebar(BOT_CHAT_SIDEBAR_ID);
    }
  }, [botChatDetails, selectedChatId, handleSelectUserFromSidebar]);


  const handleBackToList = () => {
    handleBackToListMobile();
  };

  // Loading/error for initial chat list (to find bot chat) can be handled here if needed

  return (
    <>
      <Header />
      <div className="chat-container">
        <SocketContext.Provider value={socket}>
          <div className="chat-wrapper">
            <ChatSidebar
              // users prop is not used by the new static ChatSidebar
              onSelectUser={handleSelectUserFromSidebar}
              selectedUserId={selectedChatId === botChatDetails?.id ? BOT_CHAT_SIDEBAR_ID : selectedChatId}
            />
            
            {selectedChatId && (
              <ChatMain
                selectedChatId={selectedChatId} // This is the actual chat ID
                onBackClick={handleBackToList}
                isMobileView={isMobileView}
                // users prop for ChatMain: if it needs the current chat details for the header
                users={socketUsers} // Pass the bot chat details if that's what ChatHeader needs
                currentSystemUser={currentSystemUser}
                onSuggestionChange={handleSuggestionChange} // Pass callback to get suggestedUserId
                key={selectedChatId} // Ensure ChatMain re-mounts or re-runs effects on chat change
              />
            )}

            <ProfileDisplay
              // If a suggestion is active, ProfileDisplay should show the suggested user.
              // Otherwise, it shows the user from the selectedChatId (if it's a 1-on-1 chat).
              // The `selectedUserId` prop for ProfileDisplay should be the ID of the user to display.
              selectedUserId={activeSuggestedUserId || (selectedChatId !== botChatDetails?.id ? selectedChatId : null)}
              selectedUserSheetData={selectedUserSheetData} // Data fetched by useChatData
              loadingSheet={loadingSheet}
              errorSheet={errorSheet}
              isMobileView={isMobileView}
              // Add a key to force re-render if the user to display changes significantly
              key={activeSuggestedUserId || selectedChatId}
            />
          </div>
        </SocketContext.Provider>
      </div>
    </>
  );
};

export default Chat;

