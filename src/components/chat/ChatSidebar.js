import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/ChatSidebar.scss';
import { SocketContext } from '../../pages/Chat';
import botImage from '../../assets/images/hedgehog.png';

const ChatSidebar = ({ onSelectUser, selectedUserId }) => {
  const socket = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/chats', { withCredentials: true });
        const allChats = res.data;

        const formatted = allChats.map(chat => ({
          id: chat.id,
          name: chat.name || 'Private Chat',
          users: chat.users,
          latestMessage: chat.latestMessage?.text || 'No recent messages',
          latestTime: chat.latestMessage?.createdAt || chat.updatedAt,
        }));

        setChats(formatted);
      } catch (err) {
        console.error('Failed to load chats:', err);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      const { chatId, content, createdAt } = message;

      setChats(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? {
                ...chat,
                latestMessage: content,
                latestTime: createdAt,
              }
            : chat
        )
      );
    };

    socket.on('receive_message', handleReceiveMessage);
    return () => socket.off('receive_message', handleReceiveMessage);
  }, [socket]);

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const handleUserSelect = (userId) => {
    if (onSelectUser) onSelectUser(userId);
  };

  return (
    <aside className="sidebar">
      {chats.map(chat => {
        const isBot = chat.name.toLowerCase().includes('private chat');
        return (
          <div
            key={chat.id}
            className={`chatPreview ${selectedUserId === chat.id ? 'active' : ''}`}
            onClick={() => handleUserSelect(chat.id)}
          >
            <div className="avatarContainer">
              {isBot ? (
                <img src={botImage} alt="Bot" className="botAvatar" />
              ) : (
                <span className="userInitial">{chat.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="messagePreview">
              <div className="previewHeader">
                <h3 className="userName">{chat.name}</h3>
                <span className="timestamp">{formatTime(chat.latestTime)}</span>
              </div>
              <p className="previewText">{chat.latestMessage}</p>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default ChatSidebar;
