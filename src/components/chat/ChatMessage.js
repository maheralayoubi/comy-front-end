import React from "react";
import "./styles/ChatMessage.scss";
import RejectionSection from "./RejectionSection";

const ChatMessage = ({ message, isUser, lastMessageRef }) => {
  const isMatchAction = message.text === "マッチを希望する";
  const profileImageUrl = message.profileImageUrl;
  const initial = isUser ? 'U' : (message.sender ? message.sender.charAt(0) : '?');

  // If it's a match card, render it with its own wrapper
  if (message.isMatchCard) {
    return (
      <div className="match-card-wrapper" ref={lastMessageRef}>
        <div className="avatarContainer-m">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="avatar" />
          ) : (
            <span className="userInitial">{initial}</span>
          )}
        </div>
        <div className="match-card-content">
          <div className="messageHeader">
            <h3 className="userName">{message.sender}</h3>
            <span className="timestamp">{message.timestamp}</span>
          </div>
          {message.content}
        </div>
      </div>
    );
  }

  // Regular message rendering
  return (
    <div className={`message ${isUser ? 'userMessage' : ''} ${isMatchAction ? 'matchAction' : ''}`} ref={lastMessageRef}>
      {!isUser && (
        <div className="avatarContainer-m">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="avatar" />
          ) : (
            <span className="userInitial">{initial}</span>
          )}
        </div>
      )}

      <div className="messageContent">
        {!isUser && !isMatchAction && (
          <div className="messageHeader">
            <h3 className="userName">{message.sender}</h3>
            <span className="timestamp">{message.timestamp}</span>
          </div>
        )}

        {Array.isArray(message) ? (
          <RejectionSection messages={message.text} />
        ) : (
          <p className="messageText">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;