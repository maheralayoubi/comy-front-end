import { useState, useEffect, useContext, useCallback } from "react";
import { SocketContext } from "../pages/Chat";
import botImage from '../assets/images/hedgehog.png';
import { getMessages } from "../api/chat";

export const useChatMain = ({
  selectedChatId,
  currentSystemUser,
  setSelectedSenderId,
  setIsLoadingMessages
}) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cardsData, setCardsData] = useState([]);

  // Helper function to create match card object
  const createMatchCard = useCallback((msg) => ({
    id: msg.id,
    text: [msg.content],
    profileImageUrl: msg.suggestedUserProfileImageUrl || "/images/profileImage.png",
    currentUserId: currentSystemUser?.userId,
    currentUserName: currentSystemUser?.userName,
    currentUserImage: currentSystemUser?.profileImageUrl || "/images/profileImage.png",
    chatId: msg.chatId,
    isResponded: msg.status !== 'pending',
    apiType: msg.isSuggested ? "suggestion" : "match",
    suggestedUserName: msg.suggestedUserName || "Unknown",
    suggestedUserCategory: msg.suggestedUserCategory || "N/A",
    status: msg.status || 'pending',
    isSuggested: msg.isSuggested || false,
    relatedUserId: msg.relatedUserId,
    createdAt: msg.createdAt,
    images: msg.images || []
  }), [currentSystemUser]);

  // Helper function to create formatted message object
  const createFormattedMessage = useCallback((msg) => {
    const isBot = msg.senderId === process.env.REACT_APP_BOT_ID || 
                  msg.senderName === process.env.REACT_APP_BOT_ID;
    const isCurrentUser = currentSystemUser?.userId === msg.senderId;
    
    return {
      id: msg.id,
      sender: msg.senderName,
      senderId: msg.senderId,
      text: msg.content,
      timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }),
      rawTimestamp: msg.createdAt,
      isUser: isCurrentUser,
      profileImageUrl: isBot ? botImage : (msg.senderProfileImageUrl || "/images/profileImage.png"),
      isMatchCard: false,
      images: msg.images || []
    };
  }, [currentSystemUser?.userId]);

  // Process and sort messages into match cards and regular messages
  const processMessages = useCallback((allMessages) => {
    const sortedMessages = [...allMessages].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const matchCards = [];
    const otherMessages = [];

    sortedMessages.forEach(msg => {
      if (msg.isMatchCard) {
        matchCards.push(createMatchCard(msg));
      } else {
        otherMessages.push(createFormattedMessage(msg));
      }
    });

    return { matchCards, otherMessages };
  }, [createMatchCard, createFormattedMessage]);

  // Fetch messages from API
  const fetchMessages = useCallback(async () => {
    if (!selectedChatId) return;

    try {
      setIsLoadingMessages(true);
      const response = await getMessages(selectedChatId)
      const { matchCards, otherMessages } = processMessages(response.data);
      
      setCardsData(matchCards);
      setMessages(otherMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setCardsData([]);
      setMessages([]);
    } finally {
      setIsLoadingMessages(false);
    }
  }, [selectedChatId, processMessages, setIsLoadingMessages]);

  // Handle typing indicators
  const handleUserTyping = useCallback(({ chatId, userId }) => {
    if (chatId === selectedChatId && userId !== currentSystemUser?.userId) {
      setIsTyping(true);
    }
  }, [selectedChatId, currentSystemUser?.userId]);

  const handleUserStoppedTyping = useCallback(({ chatId, userId }) => {
    if (chatId === selectedChatId && userId !== currentSystemUser?.userId) {
      setIsTyping(false);
    }
  }, [selectedChatId, currentSystemUser?.userId]);

  // Handle new incoming messages
  const handleNewMessage = useCallback((msg) => {
    if (msg.chatId !== selectedChatId) return;

    // Mark message as read
    if (msg.id && currentSystemUser?.userId && socket) {
      socket.emit('messageRead', { 
        messageId: msg.id, 
        userId: currentSystemUser.userId 
      });
    }

    if (msg.isMatchCard) {
      const card = createMatchCard(msg);
      
      if (card.relatedUserId) {
        setSelectedSenderId(card.relatedUserId);
      }

      setCardsData(prev => {
        const exists = prev.some(existingCard => existingCard.id === card.id);
        return exists ? prev : [...prev, card];
      });
    } else {
      const formattedMessage = createFormattedMessage(msg);
      
      setMessages(prev => {
        const exists = prev.some(existingMsg => existingMsg.id === msg.id);
        if (exists) return prev;
        
        return [...prev, formattedMessage].sort(
          (a, b) => new Date(a.rawTimestamp) - new Date(b.rawTimestamp)
        );
      });
    }
  }, [
    selectedChatId, 
    currentSystemUser?.userId, 
    socket, 
    setSelectedSenderId, 
    createMatchCard, 
    createFormattedMessage
  ]);

  // Send message via socket
  const handleSendMessage = useCallback(async (text) => {
    if (!socket || !text?.trim() || !selectedChatId || !currentSystemUser?.userId) {
      return;
    }

    const messageData = {
      chatId: selectedChatId,
      content: text.trim(),
      senderId: currentSystemUser?.userId,
      timestamp: new Date().toISOString()
    };

    try {
      socket.emit('sendMessage', messageData);
      socket.emit('typing', {
        chatId: selectedChatId,
        userId: currentSystemUser?.userId
      });

      // Stop typing after 1 second
      setTimeout(() => {
        socket.emit('stopTyping', {
          chatId: selectedChatId,
          userId: currentSystemUser?.userId
        });
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [socket, selectedChatId, currentSystemUser?.userId]);

  const handleAddMessage = useCallback((msg, onRefreshSidebar) => {
    if (msg?.type === "match_open_chat" && msg.chatId) {
      onRefreshSidebar?.();
      return;
    }
    
    if (!msg?.id) return;

    setMessages(prev => {
      const exists = prev.some(existingMsg => existingMsg.id === msg.id);
      if (exists) return prev;
      
      return [...prev, msg].sort(
        (a, b) => new Date(a.rawTimestamp) - new Date(b.rawTimestamp)
      );
    });
  }, []);

  // Effect to fetch messages when chat changes
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Effect to handle socket events
  useEffect(() => {
    if (!socket) return;

    const events = [
      ['userTyping', handleUserTyping],
      ['userStoppedTyping', handleUserStoppedTyping],
      ['newMessage', handleNewMessage]
    ];

    // Add event listeners
    events.forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Cleanup event listeners
    return () => {
      events.forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handleUserTyping, handleUserStoppedTyping, handleNewMessage]);

  return {
    messages,
    isTyping,
    cardsData,
    socket,
    handleSendMessage,
    handleAddMessage
  };
};