import React from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import MatchCard from './MatchCard';
import './styles/MessageList.scss';
import botImage from '../../assets/images/hedgehog.png';

const MessageList = ({ messages, isTyping, currentUser, onAddMessage }) => {
  return (
    <div className="messagesList">
      {Array.isArray(currentUser) && currentUser.map((user) => (
        <ChatMessage
          key={user.id}
          message={{
            sender: "COMY オフィシャル AI",
            senderId: "system",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: false,
            profileImageUrl: botImage,
            isMatchCard: true,
            content: (
              <MatchCard
                userData={{
                  ...user,
                  onMatchChatCreated: (chatId) => {
                    if (chatId) {
                      onAddMessage({ type: "match_open_chat", chatId });
                    }
                  },
                  onApiResponse: onAddMessage
                }}
                onApiResponse={onAddMessage}
              />
            )
          }}
          isUser={false}
        />
      ))}

      {messages
        .sort((a, b) => new Date(a.rawTimestamp) - new Date(b.rawTimestamp))
        .map((message) => (
          <ChatMessage key={message.id} message={message} isUser={message.isUser} />
        ))}

      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageList;