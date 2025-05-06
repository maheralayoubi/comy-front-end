import React from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import MatchCard from './MatchCard';
import './styles/MessageList.scss';
const MessageList = ({ messages, isTyping, currentUser }) => {
  if (!messages || messages.length === 0) {
    return <div className="messagesList empty"></div>;
  }
  return (
    <div className="messagesList">
      {}
      {currentUser && <MatchCard userData={currentUser} />}
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          isUser={message.isUser}
        />
      ))}
      {currentUser && (
        <TypingIndicator isTyping={isTyping} name={currentUser.name} />
      )}
    </div>
  );
};
export default MessageList;
