import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../pages/Chat";
import "./scss/ChatSidebar.scss";

const ChatSidebar = ({ users, onSelectUser, selectedUserId }) => {
  const socket = useContext(SocketContext);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    
    if (typeof timestamp === 'string') {
      return timestamp;
    }
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "";
    }
  };

  useEffect(() => {
    if (!socket) return;
    
    const handleReceiveMessage = (message) => {
    };

    socket.on("receive_message", handleReceiveMessage);
    
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  const handleUserSelect = (userId) => {
    if (onSelectUser) {
      onSelectUser(userId);
    }
  };

  return (
    <aside className="sidebar">
      {Array.isArray(users) && users.map((user) => {
        const initial = user.name ? user.name.charAt(0) : "?";
        const profileImageUrl = user.profileImageUrl;

        return (
          <div 
            key={user.id} 
            className={`chatPreview ${selectedUserId === user.id ? "active" : ""}`}
            onClick={() => handleUserSelect(user.id)}
          >
            <div className="userInfo">
              <div className="avatarContainer">
                {profileImageUrl ? (
                  <img src={profileImageUrl} alt={user.name || "Avatar"} />
                ) : (
                  <span className="userInitial">{initial}</span>
                )}
              </div>
              <div className="messagePreview">
                <div className="previewHeader">
                  <h3 className="userName">{user.name}</h3>
                  <span className="timestamp">{formatTime(user.timestamp)}</span>
                </div>
                <p className="previewText">
                  {user.lastMessage}
                </p>
              </div>
              {user.hasNotification && <div className="notificationDot" />}
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default ChatSidebar;