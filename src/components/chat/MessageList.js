import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import MatchCard from './MatchCard';
import './styles/MessageList.scss';
import botImage from '../../assets/images/hedgehog.png';

const MessageList = ({ messages, isTyping, currentUser, onAddMessage, setSelectedSenderId, openSheet }) => {
  const lastMessageRef = useRef(null);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className="messagesList">
      {Array.isArray(currentUser) && currentUser.map((user) => (
        <ChatMessage
          key={user.id}
          message={{
            sender: "COMY オフィシャル AI",
            senderId: "system",
            timestamp: new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
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
          }}
          isUser={false}
        />
      ))}

      {messages
        .sort((a, b) => new Date(a.rawTimestamp) - new Date(b.rawTimestamp))
        .map((message) => (
          <ChatMessage key={message.id} message={message} isUser={message.isUser} lastMessageRef={lastMessageRef} />
        ))}

      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageList;