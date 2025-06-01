import React from "react";
import "./styles/ChatMessage.scss";
import RejectionSection from "./RejectionSection";

const ChatMessage = ({ message, isUser, lastMessageRef }) => {
  const isMatchAction = message.text === "マッチを希望する";
  const hasImagesOnly = message?.images?.length > 0 && (!message.text || message.text.trim() === "");
  const profileImageUrl = message.profileImageUrl;
  const initial = isUser ? 'U' : (message.sender ? message.sender.charAt(0) : '?');

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
        {!isUser && !isMatchAction && !hasImagesOnly && (
          <div className="messageHeader">
            <h3 className="userName">{message.sender}</h3>
            <span className="timestamp">{message.timestamp}</span>
          </div>
        )}

        {message.images?.length > 0 ? (
          <RejectionSection messages={message.text ? [message.text] : []} images={message.images} />
        ) : (
          <p className="messageText">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
