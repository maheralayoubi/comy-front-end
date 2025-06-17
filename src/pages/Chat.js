import { createContext } from "react";
import Header from "../components/global/Header";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMain from "../components/chat/ChatMain";
import ProfileDisplay from "../components/chat/ProfileDisplay";
import useChatData from "../hooks/useChatData";
import { useChat } from "../hooks/useChat";
import "../components/chat/styles/Chat.scss";
import { SpinnerPage } from "../components/global/Spinner";

export const SocketContext = createContext(null);

const Chat = () => {
  const {
    selectedChatId,
    selectedChatInfo,
    selectedSenderId,
    connectionStatus,
    showProfile,
    showSheet,
    isLoadingMessages,
    isMobileView,
    currentSystemUser,
    refreshSidebarToggle,
    socket,
    setSelectedSenderId,
    setIsLoadingMessages,
    handleSelectUser,
    handleBackToList,
    openSheet,
    closeSheet,
    refreshSidebar,
  } = useChat();

  const {
    selectedUserSheetData,
    loadingSheet,
    errorSheet,
  } = useChatData(selectedSenderId);

  if(connectionStatus === 'disconnected') {
    return <SpinnerPage/>
  }

  return (
    <>
      <Header />
      <div className="chat-container">
        <SocketContext.Provider value={socket}>
          <div className="chat-wrapper">
            {/* Sidebar - hide when mobile and loading messages */}
            {!(isMobileView && isLoadingMessages) && (
              <ChatSidebar
                onSelectUser={handleSelectUser}
                selectedChatId={selectedChatId}
                setSelectedSenderId={setSelectedSenderId}
                currentSystemUserId={currentSystemUser?.userId}
                refreshTrigger={refreshSidebarToggle}
                setIsLoadingMessages={setIsLoadingMessages}
              />
            )}

            {/* Main chat area */}
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
                isLoadingMessages={isLoadingMessages}
                setIsLoadingMessages={setIsLoadingMessages}
              />
            )}

            {/* Profile panel */}
            {showProfile && !isLoadingMessages && (
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