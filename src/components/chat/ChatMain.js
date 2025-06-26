import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import "./styles/ChatMain.scss";
import botImage from '../../assets/images/hedgehog.png';
import { SpinnerPage } from "../global/Spinner";
import { useChatMain } from "../../hooks/useChatMain";

const ChatMain = ({
  selectedChatId,
  onBackClick,
  isMobileView,
  currentSystemUser,
  chatInfo,
  onRefreshSidebar,
  showProfile,
  setSelectedSenderId,
  showSheet,
  openSheet,
  isLoadingMessages,
  setIsLoadingMessages,
  isAdmin
}) => {
  const { messages, cardsData, isTyping, socket, handleSendMessage, handleAddMessage } = useChatMain({
    selectedChatId,
    currentSystemUser,
    setSelectedSenderId,
    setIsLoadingMessages
  });

  const isBotChat = !chatInfo?.isGroup;
  const hasMessages = cardsData.length > 0 || messages.length > 0;
  const headerUser = {
    name: chatInfo?.name ?? "",
    profileImageUrl: isBotChat ? botImage : (chatInfo?.profileImageUrl || "/images/profileImage.png"),
    secondeImageUrl: chatInfo.secondeImageUrl
  };
  const mainChatClassName = showProfile ? "mainChantWithProfile" : "mainChat";
  const mainChatStyle = !showSheet ? { width: "100%" } : {};

  if (isLoadingMessages) return <SpinnerPage />;

  return (
    <section className={mainChatClassName} style={mainChatStyle}>
      <ChatHeader
        isBot={isBotChat}
        currentUser={headerUser}
        onBackClick={onBackClick}
        isMobileView={isMobileView}
        openSheet={openSheet}
        isAdmin={isAdmin}
      />
      {hasMessages ? (
        <div className="messageContainer">
          <MessageList
            isBotChat={isBotChat}
            openSheet={openSheet}
            setSelectedSenderId={setSelectedSenderId}
            messages={messages}
            isTyping={isTyping}
            cardsData={cardsData}
            onAddMessage={(msg) => handleAddMessage(msg, onRefreshSidebar)}
          />
          <MessageInput
            onSendMessage={handleSendMessage}
            socket={socket}
            selectedChatId={selectedChatId}
            isDisabled={isBotChat}
          />
        </div>
      ) : (
        <EmptyState message="データがありません" />
      )}
    </section>
  );
};

export default ChatMain;