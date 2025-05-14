
import React from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import MatchCard from './MatchCard';
import './styles/MessageList.scss';
import botImage from '../../assets/images/hedgehog.png';

const MessageList = ({ messages, isTyping, currentUser, onAddMessage }) => {
  const handleApiResponse = (text) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    onAddMessage({
      id: Date.now(),
      sender: "COMY オフィシャル AI",
      senderId: "system",
      text,
      timestamp,
      isUser: false,
      profileImageUrl: botImage
    });
  };

  return (
    <div className="messagesList">
      {currentUser?.text && Array.isArray(currentUser.text) && (
        <ChatMessage
          message={{
            sender: "COMY オフィシャル AI",
            senderId: "system",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: false,
            profileImageUrl: botImage,
            isMatchCard: true,
            content: <MatchCard userData={currentUser} onApiResponse={handleApiResponse} />
          }}
          isUser={false}
        />
      )}

      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          isUser={message.isUser}
        />
      ))}

      {currentUser && messages.length > 0 && (
        <TypingIndicator isTyping={isTyping} name={currentUser.name} />
      )}
    </div>
  );
};

export default MessageList;
