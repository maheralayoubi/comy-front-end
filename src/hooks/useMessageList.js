// hooks/useMessageList.js
import { useMemo } from 'react';
import botImage from '../assets/images/hedgehog.png';
import { formatTimestamp } from '../utils/formatTimeUtils';

export const useMessageList = ({ messages = [], cardsData = [], onAddMessage }) => {
  // Transform match cards into message format
  const matchCardMessages = useMemo(() => {
    if (!Array.isArray(cardsData) || cardsData.length === 0) return [];

    return cardsData.map((card) => ({
      id: `match-${card.id}`,
      originalId: card.id,
      sender: "COMY オフィシャル AI",
      senderId: "system",
      timestamp: formatTimestamp(card.createdAt),
      rawTimestamp: card.createdAt,
      isUser: false,
      profileImageUrl: botImage,
      isMatchCard: true,
      cardData: card
    }));
  }, [cardsData]);

  // Transform regular messages with unique keys
  const regularMessages = useMemo(() => {
    if (!Array.isArray(messages) || messages.length === 0) return [];

    return messages.map(message => ({
      ...message,
      id: `message-${message.id}`,
      isMatchCard: false
    }));
  }, [messages]);

  // Combine and sort all messages by timestamp
  const allMessages = useMemo(() => {
    const combined = [...matchCardMessages, ...regularMessages];
    
    return combined.sort((a, b) => {
      const dateA = new Date(a.rawTimestamp);
      const dateB = new Date(b.rawTimestamp);
      return dateA - dateB;
    });
  }, [matchCardMessages, regularMessages]);

  // Create match chat handler
  const handleMatchChatCreated = useMemo(() => (chatId) => {
    if (chatId && onAddMessage) {
      onAddMessage({ type: "match_open_chat", chatId });
    }
  }, [onAddMessage]);

  return {
    allMessages,
    handleMatchChatCreated
  };
};