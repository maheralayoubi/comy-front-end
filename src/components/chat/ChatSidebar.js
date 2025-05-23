import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/ChatSidebar.scss';
import { SocketContext } from '../../pages/Chat';
import botImage from '../../assets/images/hedgehog.png';
import { API_URL } from '../../utils/apiUtils';

const ChatSidebar = ({ onSelectUser, selectedUserId }) => {
  const socket = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/chats`, { withCredentials: true });
        const allChats = res.data;

        const formatted = allChats.map(chat => ({
          id: chat.id,
          name: chat.name || 'Private Chat',
          users: chat.users,
          latestMessage: chat.latestMessage?.text || 'メッセージはありません ',
          latestTime: chat.latestMessage?.createdAt || chat.updatedAt,
          profileImageUrl: chat.profileImageUrl || '',
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
            ? { ...chat, latestMessage: content, latestTime: createdAt }
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

  const handleUserSelect = (userId, chat) => {
    const isBot = chat.name === "COMY オフィシャル AI";
    const chatInfo = {
      ...chat,
      profileImageUrl: isBot ? botImage : (chat.profileImageUrl || "/images/profileImage.png")
    };
    onSelectUser(userId, chatInfo);
  };

  return (
    <aside className="sidebarV2">
      {chats.map((chat, index) => {
        const isBot = chat.name === 'COMY オフィシャル AI';
        const isFirstBot = index === 0 && isBot;

        return (
          <div
            key={chat.id}
            className={`chatPreviewV2 ${selectedUserId === chat.id ? 'active' : ''}`}
            onClick={() => handleUserSelect(chat.id, chat)}
          >
            <div className="avatarContainerV2">
              {isFirstBot ? (
                <img src={botImage} alt="Bot" className="userAvatar" />
              ) : (
                <>
                  <img src={botImage} alt="Bot" className="botOverlay" />
                  {chat.profileImageUrl ? (
                    <img src={chat.profileImageUrl} alt="User" className="userAvatar" />
                  ) : (
                    <span className="userInitial">{chat.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  )}
                </>
              )}
            </div>

            <div className="messagePreviewV2">
              <div className="previewHeaderV2">
                <h3 className="userNameV2">{chat.name}</h3>
                <div className="timestampWrapper">
                  <span className="timestampV2">{formatTime(chat.latestTime)}</span>
                </div>
              </div>
              <p className="previewTextV2">{chat.latestMessage}</p>
            </div>
            {isFirstBot && <div className="notificationDotV2" />}
          </div>
        );
      })}
    </aside>
  );
};

export default ChatSidebar;
