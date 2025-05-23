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
  selectedUserId,
  onBackClick,
  isMobileView,
  users,
  currentSystemUser,
  chatInfo,
  onRefreshSidebar,
  showProfile
}) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (socket && selectedUserId) {
      socket.emit('joinChat', selectedUserId);
    }
  }, [socket, selectedUserId]);

  useEffect(() => {
    if (!selectedUserId) return;

    const fetchMessages = async () => {
      try {
        const response = await secureApi.get(`/api/chats/${selectedUserId}/messages`);
        const allMessages = response.data;

        const matchCards = allMessages
          .filter(m => m.isMatchCard)
          .map(m => {
            const wasResponded = allMessages.some(other =>
              other.chatId === m.chatId &&
              !other.isMatchCard &&
              new Date(other.createdAt) > new Date(m.createdAt)
            );

            return {
              id: m.id,
              text: [m.content],
              profileImageUrl: m.suggestedUserProfileImageUrl || "/images/profileImage.png",
              currentUserId: currentSystemUser?.id,
              currentUserName: currentSystemUser?.name,
              currentUserImage: currentSystemUser?.profileImageUrl || "/images/profileImage.png",
              chatId: selectedUserId,
              isResponded: wasResponded,
              apiType: m.content.includes("マッチの希望が届いています") ? "match" : "suggestion",
              suggestedUserName: m.suggestedUserName,             
              suggestedUserCategory: m.suggestedUserCategory,
              status: m.status || 'pending',
              isSuggested: m.isSuggested || false
            };
          });

        const otherMessages = allMessages
          .filter(m => !m.isMatchCard)
          .map(m => {
            const senderName = m.sender;
            const senderId = m.senderId;
            const isBot = senderName === "COMY オフィシャル AI";

            const isUserMatchResponse =
              m.content === "マッチを希望する" &&
              senderId === currentSystemUser?.id;

            const isCurrentUser =
              isUserMatchResponse ||
              (currentSystemUser?.name === senderName && !isBot);

            return {
              id: m.id,
              sender: senderName,
              senderId: senderId || senderName,
              text: m.content,
              timestamp: new Date(m.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              }),
              rawTimestamp: m.createdAt,
              isUser: isCurrentUser,
              profileImageUrl: isCurrentUser
                ? currentSystemUser?.profileImageUrl
                : isBot
                  ? botImage
                  : "/images/profileImage.png",
              isMatchCard: false
            };
          });

        setCurrentUser(matchCards);
        setMessages(otherMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setCurrentUser([]);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [selectedUserId, users, currentSystemUser, chatInfo]);

  useEffect(() => {
    if (!socket) return;

    const handleUserTyping = ({ chatId, userId }) => {
      if (chatId === selectedUserId && userId !== currentSystemUser?.id) {
        setIsTyping(true);
      }
    };

    const handleUserStoppedTyping = ({ chatId, userId }) => {
      if (chatId === selectedUserId && userId !== currentSystemUser?.id) {
        setIsTyping(false);
      }
    };

    socket.on('userTyping', handleUserTyping);
    socket.on('userStoppedTyping', handleUserStoppedTyping);

    return () => {
      socket.off('userTyping', handleUserTyping);
      socket.off('userStoppedTyping', handleUserStoppedTyping);
    };
  }, [socket, selectedUserId, currentSystemUser]);

  useEffect(() => {
    if (!socket || !selectedUserId) return;

    const handleNewMessage = (msg) => {
      if (msg.chatId !== selectedUserId) return;

      if (msg.isMatchCard || msg.content?.includes("マッチの希望が届いています")) {
        const card = {
          id: msg.id,
          text: [msg.content],
          profileImageUrl: msg.suggestedUserProfileImageUrl || "/images/profileImage.png",
          currentUserId: currentSystemUser?.id,
          currentUserName: currentSystemUser?.name,
          currentUserImage: currentSystemUser?.profileImageUrl || "/images/profileImage.png",
          chatId: msg.chatId,
          isResponded: msg.status !== 'pending',
          apiType: msg.content.includes("マッチの希望が届いています") ? "match" : "suggestion",
          suggestedUserName: msg.suggestedUserName || "Unknown",
          suggestedUserCategory: msg.suggestedUserCategory || "N/A",
          status: msg.status || 'pending',
          isSuggested: msg.isSuggested || false
        };

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

        const formatted = {
          id: msg.id,
          sender: msg.sender,
          senderId: msg.senderId,
          text: msg.content,
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          rawTimestamp: msg.createdAt,
          isUser: msg.senderId === currentSystemUser?.id,
          profileImageUrl: msg.senderId === currentSystemUser?.id
            ? currentSystemUser?.profileImageUrl
            : "/images/profileImage.png",
          isMatchCard: false
        };

        return [...prev, formatted];
      });
    };

    socket.on('newMessage', handleNewMessage);
    return () => socket.off('newMessage', handleNewMessage);
  }, [socket, selectedUserId, currentSystemUser]);

  const handleSendMessage = async (text) => {
    if (!socket || !text.trim()) return;

    socket.emit('sendMessage', {
      chatId: selectedUserId,
      content: text,
      senderId: currentSystemUser?.id
    });

    socket.emit('typing', {
      chatId: selectedUserId,
      userId: currentSystemUser?.id
    });

    try {
      await secureApi.post("/api/chats/messages", {
        content: text,
        chatId: selectedUserId
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  const isBotChat = chatInfo?.name === "COMY オフィシャル AI";

  return (
    <section className={`${showProfile ? "mainChantWithProfile" : "mainChat"}`}>
      {currentUser.length > 0 || messages.length > 0 ? (
        <>
          <ChatHeader
            currentUser={{
              name: chatInfo?.name ?? "",
              profileImageUrl: chatInfo?.name === "COMY オフィシャル AI"
                ? botImage
                : chatInfo?.profileImageUrl || "/images/profileImage.png"
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
                setMessages((prev) => [...prev, msg]);
              }}
            />
              <MessageInput
                onSendMessage={handleSendMessage}
                socket={socket}
                selectedUserId={selectedUserId}
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
