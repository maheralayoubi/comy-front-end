import React from 'react';
import './scss/ChatHeader.scss';

const ChatHeader = ({ currentUser, onBackClick, isMobileView }) => {
  if (!currentUser) {
    // Render nothing if no user is selected, ChatMain handles the empty state
    return null; 
  }

  // Determine initial if no image
  const initial = currentUser.name ? currentUser.name.charAt(0) : '?';
  const profileImageUrl = currentUser.profileImageUrl;

  return (
    <header className="chatHeader">
      {isMobileView && (
        <button className="backButton" onClick={onBackClick}>
          {/* SVG for back arrow */}
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

