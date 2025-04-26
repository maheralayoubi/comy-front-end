import React from "react";
import "./scss/ChatMessage.scss";

const ChatMessage = ({ message, isUser }) => {
  const initial = isUser ? 'U' : (message.sender ? message.sender.charAt(0) : '?');
  const profileImageUrl = message.profileImageUrl;

  return (
    <div className={`message ${isUser ? 'userMessage' : ''}`}>
      <div className="avatarContainer">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt={message.sender || 'Avatar'} />
        ) : (
          <span className="userInitial">
            {initial}
          </span>
        )}
      </div>
      <div className="messageContent">
        <div className="messageHeader">
          <h3 className="userName">{message.sender}</h3>
          <span className="timestamp">{message.timestamp}</span>
        </div>
        <p className="messageText">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;