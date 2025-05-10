import React from 'react';
import './styles/ChatSidebar.scss';
import hedgehog from '../../assets/images/hedgehog.png'
// As per user's request, the bot's appearance in the sidebar is static.
// The actual chat fetching will happen in ChatMain based on a special ID for the bot.
const ChatSidebar = ({ onSelectUser, selectedUserId }) => {
  const botUser = {
    // Using a special identifier for the bot, as in user's example.
    // Chat.js/ChatMain.js will need to resolve this to an actual API chat ID.
    id: 'BOT_CHAT_IDENTIFIER', 
    name: 'COMY オフィシャル AI', // Static name as requested
    profileImageUrl: hedgehog, // Static image (or path to it) as requested. Empty if using initial.
    lastMessage: 'Click to chat with COMY AI!', // Static initial message
    timestamp: '',
    hasNotification: false,
  };

  const handleBotSelect = () => {
    if (onSelectUser) {
      onSelectUser(botUser.id); // Pass the special identifier
    }
  };

  const isBotActive = selectedUserId === botUser.id;
  const initial = botUser.name ? botUser.name.charAt(0).toUpperCase() : "?";

  return (
    <aside className="sidebar">
      <div
        key={botUser.id}
        className={`chatPreview ${isBotActive ? 'active' : ''}`}
        onClick={handleBotSelect}
      >
        <div className="userInfo">
          <div className="avatarContainer">
            {botUser.profileImageUrl ? (
              <img src={botUser.profileImageUrl} alt={botUser.name} />
            ) : (
              // Displaying the first character of the name as the avatar if no image URL is provided
              <span className="userInitial">{initial}</span>
            )}
          </div>
          <div className="messagePreview">
            <div className="previewHeader">
              <h3 className="userName">{botUser.name}</h3>
              {/* Timestamp can be omitted or static if desired for this static entry */}
              {/* <span className="timestamp">{botUser.timestamp}</span> */}
            </div>
            <p className="previewText">
              {botUser.lastMessage}
            </p>
          </div>
          {/* Notification dot can be dynamic later if needed */}
          {/* {botUser.hasNotification && <div className="notificationDot" />} */}
        </div>
      </div>
      {/* Removed the loading and error states related to fetching a list of chats, as only the static bot is shown */}
    </aside>
  );
};

export default ChatSidebar;

