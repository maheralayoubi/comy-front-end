import React from 'react';
import './styles/ChatHeader.scss';

// Define the bot's specific details for the header
const BOT_DISPLAY_NAME = "COMY オフィシャル AI";
// It's assumed that when the bot is the currentUser, its name will match BOT_DISPLAY_NAME
// or its ID will be a known bot ID. For simplicity, we'll check the name if it's reliably set.
// Alternatively, a more robust way is to pass an `isBotChat` prop or check against a known bot ID.

const ChatHeader = ({ currentUser, onBackClick, isMobileView }) => {
  if (!currentUser) {
    return null;
  }

  // Check if the current user is the bot
  // We assume that if currentUser.name is BOT_DISPLAY_NAME, it's the bot chat.
  // Or, if Chat.js/ChatMain.js ensures currentUser.isBot or a specific ID is passed, that's better.
  // For now, relying on the name passed for the bot chat.
  const isBot = currentUser.name === BOT_DISPLAY_NAME;

  const displayName = isBot ? BOT_DISPLAY_NAME : currentUser.name;
  
  // For non-bot users, calculate initial. For bot, avatar is blank as requested.
  const initial = !isBot && currentUser.name ? currentUser.name.charAt(0).toUpperCase() : ''; 
  const profileImageUrl = !isBot ? currentUser.profileImageUrl : null; // Bot has no image, as per user request

  return (
    <header className="chatHeader">
      {isMobileView && (
        <button className="backButton" onClick={onBackClick}>
          {/* SVG for back button */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      )}
      <div className="headerContent">
        <div className="headerAvatarContainer">
          {/* Render avatar only if it's not the bot and image/initial exists */}
          {!isBot && profileImageUrl ? (
            <img src={profileImageUrl} alt={displayName || 'Avatar'} />
          ) : !isBot && initial ? (
            <span className="userInitial">{initial}</span>
          ) : (
            // For the bot, or if no image/initial for user, render an empty span to maintain layout if needed, or nothing.
            // User requested to leave it blank for the bot.
            <span className="userInitial"></span> // Empty span for bot, or if user has no image/initial
          )}
        </div>
        <h2 className="headerTitle">{displayName}</h2>
      </div>
    </header>
  );
};

export default ChatHeader;

