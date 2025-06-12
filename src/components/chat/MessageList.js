import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import MatchCard from './MatchCard';
import './styles/MessageList.scss';
import botImage from '../../assets/images/hedgehog.png';

const MessageList = ({ messages, isTyping, currentUser, onAddMessage, setSelectedSenderId, openSheet }) => {
  const lastMessageRef = useRef(null);
  
  useEffect(() => {
    // scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const matchCardMessages = Array.isArray(currentUser) ? currentUser.map((user) => ({
    id: `match-${user.id}`,
    originalId: user.id,
    sender: "COMY オフィシャル AI",
    senderId: "system",
    timestamp: new Date(user.createdAt).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    }),
    rawTimestamp: user.createdAt,
    isUser: false,
    profileImageUrl: botImage,
    isMatchCard: true,
    content: (
      <MatchCard
        openSheet={openSheet}
        setSelectedSenderId={setSelectedSenderId}
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
  })) : [];

  // Ensure regular messages have unique keys too
  const regularMessages = messages.map(message => ({
    ...message,
    id: `message-${message.id}`
  }));

  // Combine and sort all messages (both match cards and regular messages) by timestamp
  const allMessages = [...matchCardMessages, ...regularMessages]
    .sort((a, b) => new Date(a.rawTimestamp) - new Date(b.rawTimestamp));

  return (
    <div className="messagesList">
      {allMessages.map((message, index) => (
        <ChatMessage 
          key={message.id || `item-${index}`}
          message={message} 
          isUser={message.isUser}
          lastMessageRef={index === allMessages.length - 1 ? lastMessageRef : null}
        />
      ))}

      {/* {isTyping && <TypingIndicator />} */}
    </div>
  );
};

export default MessageList;