import React, { useState, useEffect, useContext } from 'react';
import './styles/ChatSidebar.scss';
import { SocketContext } from '../../pages/Chat';
import botImage from '../../assets/images/hedgehog.png';
import secureApi from '../../api/secureApi';

const ChatSidebar = ({ onSelectUser, selectedUserId, refreshTrigger }) => {
  const socket = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await secureApi.get('/api/chats'); 
        const allChats = res.data;
        const formatted = allChats.map(chat => ({
          id: chat.id,
          name: chat.name || 'Private Chat',
          users: chat.users,
          latestMessage: chat.latestMessage?.content || chat.latestMessage?.text || 'No recent messages',
          latestTime: chat.latestMessage?.createdAt || chat.updatedAt,
          profileImageUrl: chat.profileImageUrl || '',
        }));
        setChats(formatted);
      } catch (err) {
        console.error("Sidebar fetch failed", err);
      }
    };

    fetchChats();
  }, [refreshTrigger]);

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
      name: chat.name,
      profileImageUrl: isBot
        ? botImage
        : (chat.profileImageUrl || "/images/profileImage.png")
    };
    onSelectUser(userId, chatInfo);
  };

  return (
    <aside className="sidebarV2">
      {chats.map((chat) => {
        const isBot = chat.name === "COMY オフィシャル AI";

        return (
          <div
            key={chat.id}
            className={`chatPreviewV2 ${selectedUserId === chat.id ? 'active' : ''}`}
            onClick={() => handleUserSelect(chat.id, chat)}
          >
            <div className="avatarContainerV2">
              <img
                src={
                  isBot
                    ? botImage
                    : chat.profileImageUrl || "/images/profileImage.png"
                }
                alt="Avatar"
                className="userAvatar"
              />
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
          </div>
        );
      })}
    </aside>
  );
};

export default ChatSidebar;
