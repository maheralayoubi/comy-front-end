import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/ChatSidebar.scss';
import { SocketContext } from '../../pages/Chat';
import botImage from '../../assets/images/hedgehog.png';
import { API_URL } from '../../utils/apiUtils';

const ChatSidebar = ({ onSelectUser, selectedChatId, currentSystemUserId, setSelectedSenderId }) => {
  const socket = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const [now, setNow] = useState(new Date());
  const [botId, setBotId] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/chats`, { withCredentials: true });
        const allChats = res.data;

        const getBotId = () => {
          const botChat = allChats.find(chat => chat.name === "COMY オフィシャル AI");
          if (botChat && botChat.users) {
            const botUser = botChat.users.find(user => user.role === "bot");
            return botUser ? botUser.id : null;
          }
          return null;
        };

        const dynamicBotId = getBotId();
        setBotId(dynamicBotId);

        const formatted = allChats.map(chat => {
          const otherUser = chat.users.find(user =>
            user.id !== currentSystemUserId && user.role !== "bot"
          );

          return {
            id: chat.id,
            name: chat.name || 'Private Chat',
            users: chat.users,
            latestMessage: chat.latestMessage?.content || 'メッセージはありません ',
            latestTime: chat.latestMessage?.createdAt || chat.updatedAt,
            profileImageUrl: otherUser?.image || '',
          };
        });

        setChats(formatted);
      } catch (err) {
        console.error('Failed to load chats:', err);
      }
    };

    fetchChats();
  }, [currentSystemUserId]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleMessageUpdate = (message) => {
      const { chatId, content, createdAt } = message;
      setChats(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? { ...chat, latestMessage: content, latestTime: createdAt }
            : chat
        )
      );
    };

    socket.on('receive_message', handleMessageUpdate);
    socket.on('newMessage', handleMessageUpdate);

    return () => {
      socket.off('receive_message', handleMessageUpdate);
      socket.off('newMessage', handleMessageUpdate);
    };
  }, [socket]);

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getOtherUserId = (chat) => {
    const otherUsers = chat.users.filter(user =>
      user.id !== currentSystemUserId && user.id !== botId
    );
    return otherUsers.length > 0 ? otherUsers[0].id : null;
  };

  const handleUserSelect = (chatId, chat) => {
    const isBot = chat.name === "COMY オフィシャル AI";
    const chatInfo = {
      ...chat,
      profileImageUrl: isBot ? botImage : (chat.profileImageUrl || "/images/profileImage.png")
    };

    if (!isBot) {
      const otherUserId = getOtherUserId(chat);
      if (otherUserId) {
        setSelectedSenderId(otherUserId);
      }
    } else {
      setSelectedSenderId(null);
    }

    onSelectUser(chatId, chatInfo);
  };

  return (
    <aside className="sidebarV2">
      {chats.map((chat) => {
        const isBot = chat.name === 'COMY オフィシャル AI';
        const showBotNotification = isBot;

        return (
          <div
            key={chat.id}
            className={`chatPreviewV2 ${selectedChatId === chat.id ? 'active' : ''}`}
            onClick={() => handleUserSelect(chat.id, chat)}
          >
            <div className="avatarContainerV2">
              {isBot ? (
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
            {showBotNotification && <div className="notificationDotV2" />}
          </div>
        );
      })}
    </aside>
  );
};

export default ChatSidebar;