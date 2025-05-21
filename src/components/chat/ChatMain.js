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
  onRefreshSidebar
}) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (socket && selectedUserId) {
      socket.emit('joinChat', selectedUserId);
      console.log(`Joined chat room: ${selectedUserId}`);
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
              suggestedUserCategory: m.suggestedUserCategory 
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

  const handleSendMessage = async (text) => {
    if (!socket || !text.trim()) return;

    const now = new Date();

    const newMessage = {
      id: Date.now(),
      sender: currentSystemUser?.name,
      senderId: currentSystemUser?.id,
      text,
      timestamp: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      rawTimestamp: now.toISOString(),
      isUser: true,
      isMatchCard: false,
      profileImageUrl: currentSystemUser?.profileImageUrl
    };

    setMessages(prev => [...prev, newMessage]);

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
    <section className="mainChat">
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
            <div className="inputContainer">
              <MessageInput
                onSendMessage={handleSendMessage}
                socket={socket}
                selectedUserId={selectedUserId}
                isDisabled={!isBotChat}
              />
            </div>
          </div>
        </>
      ) : (
        <EmptyState message="Please select a user" />
      )}
    </section>
  );
};

export default ChatMain;
