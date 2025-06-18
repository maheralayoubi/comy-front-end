import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import MatchCard from './MatchCard';
import './styles/MessageList.scss';
import botImage from '../../assets/images/hedgehog.png';

const MessageList = ({ messages, isTyping, cardsData, onAddMessage, setSelectedSenderId, openSheet }) => {
  const lastMessageRef = useRef(null);
  
  useEffect(() => {
    // scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const matchCardMessages = Array.isArray(cardsData) ? cardsData.map((card) => ({
    id: `match-${card.id}`,
    originalId: card.id,
    sender: "COMY オフィシャル AI",
    senderId: "system",
    timestamp: new Date(card.createdAt).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    }),
    rawTimestamp: card.createdAt,
    isUser: false,
    profileImageUrl: botImage,
    isMatchCard: true,
    content: (
      <MatchCard
        openSheet={openSheet}
        setSelectedSenderId={setSelectedSenderId}
        userData={{
          ...card,
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