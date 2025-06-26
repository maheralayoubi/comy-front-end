import './styles/ChatSidebar.scss';
import botImage from '../../assets/images/hedgehog.png';
import { useChatSidebar } from '../../hooks/useChatSidebar';

const ChatSidebar = ({ 
  onSelectUser, 
  selectedChatId, 
  currentSystemUserId, 
  setSelectedSenderId, 
  setIsLoadingMessages,
  setIsAdmin,
}) => {
  const { chats, handleUserSelect, formatTime } = useChatSidebar(
    currentSystemUserId,
    selectedChatId,
    setSelectedSenderId,
    botImage,
    onSelectUser,
    setIsLoadingMessages,
    setIsAdmin
  );

  const renderChatAvatar = (chat) => {
    const isBot = !chat.isGroup;

    if (isBot) {
      return <img src={botImage} alt="Bot" className="userAvatar" />;
    }

    return (
      <>
        <img src={chat.secondeImageUrl} alt="secondImage" className="botOverlay" />
        <img 
          src={chat.profileImageUrl || "/images/profileImage.png"} 
          alt="User" 
          className="userAvatar" 
        />
      </>
    );
  };

  return (
    <aside className="sidebarV2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`chatPreviewV2 ${selectedChatId === chat.id ? 'active' : ''}`}
          onClick={() => handleUserSelect(chat.id, chat)}
        >
          <div className="avatarContainerV2">
            {renderChatAvatar(chat)}
          </div>

          <div className="messagePreviewV2">
            <div className="previewHeaderV2">
              <h3 className="userNameV2">{chat.name}</h3>
              <div className="timestampWrapper">
                <span className="timestampV2">{formatTime(chat.latestTime)}</span>
              </div>
            </div>
            <p className="previewTextV2">{chat.latestMessage}</p>
          </div>

          {chat.unReadMessage && <div className="notificationDotV2" />}
        </div>
      ))}
    </aside>
  );
};

export default ChatSidebar;