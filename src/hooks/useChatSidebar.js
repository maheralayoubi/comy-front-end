import { useState, useEffect, useContext, useCallback } from 'react';
import { SocketContext } from '../pages/Chat';
import { getChats } from '../api/chat';
import useResponsiveLayout from './useResponsiveLayout';

export const useChatSidebar = (
  currentSystemUserId,
  selectedChatId,
  setSelectedSenderId,
  botImage,
  onSelectUser,
  setIsLoadingMessages,
  setIsAdmin
) => {
  const socket = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const [hasAutoSelected, setHasAutoSelected] = useState(false);

  const {isMobileView} = useResponsiveLayout()

  // Format chat data helper
  const formatChatData = useCallback((allChats) => {
    return allChats.map(chat => {
      const userA = chat.users.find(user => user.role === "user-a");
      const userB = chat.users.find(user => user.role === 'user-b')
      const secondUrlImage = chat.isAdmin ? userB.image : botImage
      setIsAdmin(chat.isAdmin)

      return {
        id: chat.id,
        name: chat.name || 'Private Chat',
        users: chat.users,
        isGroup: chat.isGroup,
        latestMessage: chat?.latestMessage?.content || 'メッセージはありません',
        latestTime: chat.latestMessage?.createdAt || chat.updatedAt,
        profileImageUrl: userA?.image || '',
        secondeImageUrl: secondUrlImage || '',
        unReadMessage: chat.id === selectedChatId
          ? false
          : (chat.latestMessage && !chat.latestMessage?.readBy.includes(currentSystemUserId))
      };
    });
  }, [currentSystemUserId, selectedChatId]);

  // Auto-select bot chat on first load
  const autoSelectBotChat = useCallback((formattedChats) => {
    if (!hasAutoSelected && !selectedChatId && !isMobileView) {
      const botChat = formattedChats.find(chat => !chat.isGroup);
      if (botChat) {
        handleUserSelect(botChat.id, botChat);
        setHasAutoSelected(true);
      }
    }
  }, [hasAutoSelected]);

  // Fetch chats from API
  const fetchChats = useCallback(async () => {
    try {
      const response = await getChats()
      const chatsAfterOredr = response.data.chats.sort((a, b) => {
        const dateA = new Date(a.latestMessage.createdAt);
        const dateB = new Date(b.latestMessage.createdAt);
        return dateB - dateA; // For descending order
      });

      const formattedChats = formatChatData(chatsAfterOredr);

      setChats(formattedChats);
      autoSelectBotChat(formattedChats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  }, [formatChatData]);

  // Get other user ID for chat (excluding bot and current user)
  const getOtherUserId = useCallback((chat) => {
    const otherUsers = chat.users.filter(user =>
      user.id !== currentSystemUserId && user.role !== "bot"
    );
    return otherUsers.length > 0 ? otherUsers[0].id : null;
  }, [currentSystemUserId]);

  // Handle user selecting a chat
  const handleUserSelect = useCallback((chatId, chat) => {
    // Prevent selecting if chat is already open
    if (chatId === selectedChatId) return;

    const isBot = !chat.isGroup;

    // Clear unread message for selected chat
    setChats(prev =>
      prev.map(c =>
        c.id === chatId ? { ...c, unReadMessage: false } : c
      )
    );

    // Prepare chat info with appropriate profile image
    const chatInfo = {
      ...chat,
      profileImageUrl: isBot
        ? botImage
        : (chat.profileImageUrl || '/images/profileImage.png')
    };

    // Set sender ID for non-bot chats
    const otherUserId = getOtherUserId(chat);
    if (otherUserId) {
      setSelectedSenderId(otherUserId);
    }

    // Trigger callbacks
    onSelectUser(chatId, chatInfo);
    setIsLoadingMessages(true);
  }, [selectedChatId, botImage, getOtherUserId, setSelectedSenderId, onSelectUser, setIsLoadingMessages]);

  // Format time utility
  const formatTime = useCallback((timeString) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }, []);

  // Handle socket message updates
  const handleMessageUpdate = useCallback((message) => {
    const { chatId, content, createdAt, readBy } = message;

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
            ...chat,
            latestMessage: content,
            latestTime: createdAt,
            unReadMessage: chat.id === selectedChatId
              ? false
              : !readBy.includes(currentSystemUserId)
          }
          : chat
      )
    );
  }, [selectedChatId, currentSystemUserId]);

  // Initial fetch
  useEffect(() => {
    fetchChats();
  }, []);

  // Socket message listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', handleMessageUpdate);
    socket.on('newMessage', handleMessageUpdate);

    return () => {
      socket.off('receive_message', handleMessageUpdate);
      socket.off('newMessage', handleMessageUpdate);
    };
  }, [socket, handleMessageUpdate]);

  // Join chat rooms
  useEffect(() => {
    if (socket && chats.length > 0) {
      chats.forEach(chat => {
        socket.emit('joinChat', chat.id);
      });
    }
  }, [socket, chats]);

  return {
    chats,
    handleUserSelect,
    formatTime,
  };
};