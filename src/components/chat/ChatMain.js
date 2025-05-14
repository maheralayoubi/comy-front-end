import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../pages/Chat";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import "./styles/ChatMain.scss";
import axios from "axios";
import botImage from '../../assets/images/hedgehog.png';

axios.defaults.withCredentials = true;

const ChatMain = ({ selectedUserId, onBackClick, isMobileView, users, currentSystemUser, chatInfo }) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!selectedUserId || users.length === 0) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/chats/${selectedUserId}/messages`);
        const allMessages = response.data;

        const matchMessage = allMessages.find(m =>
          typeof m.content === "string" && m.content.length > 0
        );

        if (matchMessage) {
          const matchUser = {
            id: selectedUserId,
            name: "", // لا اسم ثابت
            profileImageUrl: matchMessage.suggestedUserProfileImageUrl || "/images/profileImage.png",
            text: [matchMessage.content] // نعرض المحتوى كما هو
          };

          setCurrentUser(matchUser);
        } else {
          const fallbackUser = users.find(u => u.id === selectedUserId);
          const fallback = fallbackUser || {
            id: selectedUserId,
            name: chatInfo?.name ?? "",
            profileImageUrl: chatInfo?.profileImageUrl || "/images/profileImage.png"
          };
          setCurrentUser(fallback);
        }

        const visibleMessages = allMessages;

        setMessages(visibleMessages.map((msg) => {
          const senderName = msg.sender?.name || "Unknown";
          const senderId = String(msg.senderId ?? "");
          const currentUserId = String(currentSystemUser?.id ?? "");
          const isFromUser = senderId === currentUserId;

          return {
            id: msg.id,
            senderId: msg.senderId,
            sender: senderName,
            text: msg.content,
            timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isUser: isFromUser,
            profileImageUrl:
              msg.sender?.profileImageUrl || "/images/profileImage.png",
          };
        }));
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setCurrentUser(null);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [selectedUserId, users, currentSystemUser, chatInfo]);

  const handleSendMessage = async (text) => {
    if (!socket || !text.trim() || !currentUser) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      senderId: currentSystemUser?.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    socket.emit('send_message', {
      to: selectedUserId,
      text
    });

    socket.emit('typing', { userId: selectedUserId, isTyping: false });

    try {
      await axios.post(`http://localhost:8080/api/chats/messages`, {
        content: text,
        chatId: selectedUserId
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  const handleMatchAccepted = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const botName = "COMY オフィシャル AI";
    const botAvatar = "/assets/comy-avatar.png";

    const matchCardMessage = {
      id: Date.now(),
      sender: botName,
      senderId: "system",
      timestamp,
      isUser: false,
      profileImageUrl: botAvatar,
      isMatchCard: true,
      text: "",
      data: { ...currentUser }
    };

    const systemMessage1 = {
      id: Date.now() + 1,
      sender: botName,
      senderId: "system",
      text: `${currentUser.name} さんにマッチの希望を送りました。`,
      timestamp,
      isUser: false,
      profileImageUrl: botAvatar
    };

    const systemMessage2 = {
      id: Date.now() + 2,
      sender: botName,
      senderId: "system",
      text: `${currentUser.name} さんとのビジネスマッチが確定されました。チャットで挨拶してみましょう。`,
      timestamp,
      isUser: false,
      profileImageUrl: botAvatar
    };

    setMessages(prev => [...prev, matchCardMessage, systemMessage1, systemMessage2]);
  };

  if (!currentUser) {
    return (
      <section className="mainChat">
        <EmptyState message="Please select a user" />
      </section>
    );
  }

  return (
    <section className="mainChat">
      <ChatHeader
        currentUser={{
          name: chatInfo?.name ?? "",
          profileImageUrl:
            chatInfo?.name === "COMY オフィシャル AI"
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
          onMatchAccept={handleMatchAccepted}
        />
        <div className="inputContainer">
          <MessageInput
            onSendMessage={handleSendMessage}
            socket={socket}
            selectedUserId={selectedUserId}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatMain;
