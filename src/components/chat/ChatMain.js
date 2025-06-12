import React, { useState, useEffect, useContext, useCallback } from "react";
import { SocketContext } from "../../pages/Chat";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import "./styles/ChatMain.scss";
import secureApi from "../../api/secureApi";
import botImage from '../../assets/images/hedgehog.png';

const ChatMain = ({
  selectedChatId,
  onBackClick,
  isMobileView,
  currentSystemUser,
  chatInfo,
  onRefreshSidebar,
  showProfile,
  setSelectedSenderId,
  showSheet,
  openSheet
}) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  const fetchMessages = useCallback(async () => {
    if (!selectedChatId) return;

    try {
      const response = await secureApi.get(`/api/chats/${selectedChatId}/messages`);
      const allMessages = response.data;

      const sortedMessages = [...allMessages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const matchCards = [];
      const otherMessages = [];

      sortedMessages.forEach(m => {
        if (m.isMatchCard) {
          matchCards.push({
            id: m.id,
            text: [m.content],
            profileImageUrl: m.suggestedUserProfileImageUrl || "/images/profileImage.png",
            currentUserId: currentSystemUser?.userId,
            currentUserName: currentSystemUser?.name,
            currentUserImage: currentSystemUser?.profileImageUrl || "/images/profileImage.png",
            chatId: selectedChatId,
            isResponded: m.status !== 'pending',
            apiType: m.isSuggested ? "suggestion" : "match",
            suggestedUserName: m.suggestedUserName,
            suggestedUserCategory: m.suggestedUserCategory,
            status: m.status || 'pending',
            isSuggested: m.isSuggested || false,
            relatedUserId: m.relatedUserId,
            createdAt: m.createdAt,
            images: m.images || []
          });
        } else {
          const isBot = m.senderId === process.env.REACT_APP_BOT_ID;
          const isCurrentUser = currentSystemUser?.userId === m.senderId;

          otherMessages.push({
            id: m.id,
            sender: m.senderName,
            senderId: m.senderId || m.senderName,
            text: m.content,
            timestamp: new Date(m.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }),
            rawTimestamp: m.createdAt,
            isUser: isCurrentUser,
            profileImageUrl: isBot ? botImage : (m.senderProfileImageUrl || "/images/profileImage.png"),
            isMatchCard: false,
            images: m.images || []
          });
        }
      });

      // const lastMatchCard = [...matchCards].reverse().find(m => m.relatedUserId);
      // if (lastMatchCard) {
      //   setSelectedSenderId(lastMatchCard.relatedUserId);
      // }

      setCurrentUser(matchCards);
      setMessages(otherMessages);
    } catch (error) {
      setCurrentUser([]);
      setMessages([]);
      console.error("Error fetching messages:", error);
    }
  }, [selectedChatId, currentSystemUser?.userId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

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

  const handleNewMessage = useCallback((msg) => {
    if (msg.chatId !== selectedChatId) return;

    if (msg.id && currentSystemUser?.userId) {
      socket.emit('messageRead', { messageId: msg.id, userId: currentSystemUser?.userId });
    }

    if (msg.isMatchCard) {
      const card = {
        id: msg.id,
        text: [msg.content],
        profileImageUrl: msg.suggestedUserProfileImageUrl || "/images/profileImage.png",
        currentUserId: currentSystemUser?.userId,
        currentUserName: currentSystemUser?.name,
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
      };

      if (card.relatedUserId) {
        setSelectedSenderId(card.relatedUserId);
      }

      setCurrentUser(prev => {
        const exists = prev.some(m => m.id === card.id);
        if (exists) return prev;
        return [...prev, card];
      });

      return;
    }

    setMessages(prev => {
      const exists = prev.some(m => m.id === msg.id);
      if (exists) return prev;

      const isBot = msg.senderName === process.env.REACT_APP_BOT_ID;
      const formatted = {
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
        isUser: msg.senderId === currentSystemUser?.userId,
        profileImageUrl: isBot ? botImage : (msg.senderProfileImageUrl || "/images/profileImage.png"),
        isMatchCard: false,
        images: msg.images || []
      };

      const updatedMessages = [...prev, formatted].sort(
        (a, b) => new Date(a.rawTimestamp).getTime() - new Date(b.rawTimestamp).getTime()
      );
      return updatedMessages;
    });
  }, [selectedChatId, currentSystemUser?.userId, setSelectedSenderId, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('userTyping', handleUserTyping);
    socket.on('userStoppedTyping', handleUserStoppedTyping);
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('userTyping', handleUserTyping);
      socket.off('userStoppedTyping', handleUserStoppedTyping);
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, handleUserTyping, handleUserStoppedTyping, handleNewMessage]);

  const handleSendMessage = useCallback(async (text) => {
    if (!socket || !text.trim()) return;

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

  const isBotChat = !chatInfo?.isGroup;

  return (
    <section className={showProfile ? "mainChantWithProfile" : "mainChat"} style={!showSheet ? { width: "100%" } : {}}>
      {currentUser.length > 0 || messages.length > 0 ? (
        <>
          <ChatHeader
            isBot={isBotChat}
            currentUser={{
              name: chatInfo?.name ?? "",
              profileImageUrl: isBotChat ? botImage : (chatInfo?.profileImageUrl || "/images/profileImage.png")
            }}
            onBackClick={onBackClick}
            isMobileView={isMobileView}
          />
          <div className="messageContainer">
            <MessageList
              isBotChat={isBotChat}
              openSheet={openSheet}
              setSelectedSenderId={setSelectedSenderId}
              messages={messages}
              isTyping={isTyping}
              currentUser={currentUser}
              onAddMessage={(msg) => {
                if (msg?.type === "match_open_chat" && msg.chatId) {
                  onRefreshSidebar?.();
                  return;
                }
                setMessages((prev) => {
                  const exists = prev.some(m => m.id === msg.id);
                  if (exists) return prev;
                  const updatedMessages = [...prev, msg].sort(
                    (a, b) => new Date(a.rawTimestamp).getTime() - new Date(b.rawTimestamp).getTime()
                  );
                  return updatedMessages;
                });
              }}
            />
            <MessageInput
              onSendMessage={handleSendMessage}
              socket={socket}
              selectedChatId={selectedChatId}
              isDisabled={isBotChat}
            />
          </div>
        </>
      ) : (
        <EmptyState message="データがありません" />
      )}
    </section>
  );
};

export default ChatMain;
