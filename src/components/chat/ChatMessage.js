import React from "react";
import "./styles/ChatMessage.scss";
import RejectionSection from "./RejectionSection";

const ChatMessage = ({ message, isUser }) => {
  const isMatchAction = message.text === "マッチを希望する";
  const profileImageUrl = message.profileImageUrl;
  const initial = isUser ? 'U' : (message.sender ? message.sender.charAt(0) : '?');

  return (
    <div className={`message ${isUser ? 'userMessage' : ''} ${isMatchAction ? 'matchAction' : ''}`}>
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

        {message.isMatchCard ? (
          message.content
        ) : Array.isArray(message.text) ? (
          <RejectionSection messages={message.text} />
        ) : (
          <>
            {!(isUser && message.text === "マッチを希望する") && (
              <div className="messageHeader">
                {isUser && <span className="timestamp">{message.timestamp}</span>}
                {isUser && <h3 className="userName">{message.sender}</h3>}
              </div>
            )}
            <p className="messageText">{message.text}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
