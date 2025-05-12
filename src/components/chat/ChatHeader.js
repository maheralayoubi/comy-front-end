import React from 'react';
import './styles/ChatHeader.scss';
const ChatHeader = ({ currentUser, onBackClick, isMobileView }) => {
  if (!currentUser) {
    return null;
  }
  const initial = currentUser.name ? currentUser.name.charAt(0) : '?';
  const profileImageUrl = currentUser.profileImageUrl;
  return (
    <header className="chatHeader">
      {isMobileView && (
        <button className="backButton" onClick={onBackClick}>
          {}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      )}
      <div className="headerContent">
        <div className="headerAvatarContainer">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt={currentUser.name || 'Avatar'} />
          ) : (
            <span className="userInitial">{initial}</span>
          )}
        </div>
        <h2 className="headerTitle">{currentUser.name}</h2>
      </div>
    </header>
  );
};
export default ChatHeader;
