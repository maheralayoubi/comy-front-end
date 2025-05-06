import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../pages/Chat";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import "./styles/ChatMain.scss";
const ChatMain = ({ selectedUserId, onBackClick, isMobileView, users }) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (selectedUserId && users && users.length > 0) {
      const user = users.find(u => u.id === selectedUserId);
      if (user) {
        setCurrentUser(user);
        setMessages([
          {
            id: Date.now() - 1000,
            sender: user.name,
            senderId: user.id,
            text: `こんにちは！${user.name}です。`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: false
          }
        ]);
      } else {
        setCurrentUser(null);
        setMessages([]);
      }
    } else {
      setCurrentUser(null);
      setMessages([]);
    }
  }, [selectedUserId, users]);
  useEffect(() => {
    if (!socket || !selectedUserId) return;
    const handleReceiveMessage = (message) => {
      if (message.senderId === selectedUserId) {
        setMessages(prevMessages => [...prevMessages, message]);
        setIsTyping(false);
      }
    };
    const handleTyping = (data) => {
      if (data.userId === selectedUserId) {
        setIsTyping(data.isTyping);
      }
    };
    socket.on('receive_message', handleReceiveMessage);
    socket.on('typing', handleTyping);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('typing', handleTyping);
    };
  }, [socket, selectedUserId]);
  const handleSendMessage = (text) => {
    if (!socket || !text.trim() || !currentUser) return;
    const newMessage = {
      id: Date.now(),
      sender: "ユーザー",
      senderId: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    socket.emit('send_message', {
      to: selectedUserId,
      text: text
    });
    socket.emit('typing', { userId: selectedUserId, isTyping: false });
  };
  if (!currentUser) {
    return (
      <section className="mainChat">
        <EmptyState message="ユーザーを選択してください" />
      </section>
    );
  }
  return (
    <section className="mainChat">
      <ChatHeader
        currentUser={currentUser}
        onBackClick={onBackClick}
        isMobileView={isMobileView}
      />
      <div className="messageContainer">
        <MessageList
          messages={messages}
          isTyping={isTyping}
          currentUser={currentUser}
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
