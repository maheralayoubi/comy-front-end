import React, { useState, useEffect, useContext } from "react";
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
  users,
  currentSystemUser,
  chatInfo,
  onRefreshSidebar,
  showProfile,
  setSelectedSenderId,
}) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  // useEffect(() => {
  //   if (socket && selectedChatId) {
  //     socket.emit('joinChat', selectedChatId);
  //   }
  // }, [socket, selectedChatId]);

  useEffect(() => {
    if (!selectedChatId) return;

    const fetchMessages = async () => {
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
              relatedUserId: m.relatedUserId
            });
          } else {
            const isBot = m.senderName === "COMY オフィシャル AI";
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
              isMatchCard: false
            });
          }
        });

        const lastMatchCard = [...matchCards].reverse().find(m => m.relatedUserId);
        if (lastMatchCard) {
          setSelectedSenderId(lastMatchCard.relatedUserId);
        }

        setCurrentUser(matchCards);
        setMessages(otherMessages);
      } catch (error) {
        setCurrentUser([]);
        setMessages([]);
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedChatId, currentSystemUser?.userId, currentSystemUser?.name, currentSystemUser?.profileImageUrl, setSelectedSenderId]);

  useEffect(() => {
    if (!socket) return;

    const handleUserTyping = ({ chatId, userId }) => {
      if (chatId === selectedChatId && userId !== currentSystemUser?.userId) {
        setIsTyping(true);
      }
    };

    const handleUserStoppedTyping = ({ chatId, userId }) => {
      if (chatId === selectedChatId && userId !== currentSystemUser?.userId) {
        setIsTyping(false);
      }
    };

    socket.on('userTyping', handleUserTyping);
    socket.on('userStoppedTyping', handleUserStoppedTyping);

    return () => {
      socket.off('userTyping', handleUserTyping);
      socket.off('userStoppedTyping', handleUserStoppedTyping);
    };
  }, [socket, selectedChatId, currentSystemUser?.userId]);

  useEffect(() => {
    if (!socket || !selectedChatId) return;

    const handleNewMessage = (msg) => {
      if (msg.chatId !== selectedChatId) return;

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
          relatedUserId: msg.relatedUserId
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

        const isBot = msg.senderName === "COMY オフィシャル AI";
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
          isMatchCard: false
        };

        const updatedMessages = [...prev, formatted].sort(
          (a, b) => new Date(a.rawTimestamp).getTime() - new Date(b.rawTimestamp).getTime()
        );
        return updatedMessages;
      });
    };

    socket.on('newMessage', handleNewMessage);
    return () => socket.off('newMessage', handleNewMessage);
  }, [socket, selectedChatId, currentSystemUser?.userId, currentSystemUser?.name, currentSystemUser?.profileImageUrl, setSelectedSenderId]);


  const handleSendMessage = async (text) => {
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
  };

  const isBotChat = chatInfo?.name === "COMY オフィシャル AI";

  return (
    <section className={showProfile ? "mainChantWithProfile" : "mainChat"}>
      {currentUser.length > 0 || messages.length > 0 ? (
        <>
          <ChatHeader
            currentUser={{
              name: chatInfo?.name ?? "",
              profileImageUrl: isBotChat ? botImage : (chatInfo?.profileImageUrl || "/images/profileImage.png")
            }}
            onBackClick={onBackClick}
            isMobileView={isMobileView}
          />
          <div className="messageContainer">
            <MessageList
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
        <EmptyState message="Please select a user" />
      )}
    </section>
  );
};

export default ChatMain;