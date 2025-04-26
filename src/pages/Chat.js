// /src/pages/Chat.js
import React, { useState, useEffect, createContext } from "react";
import Header from "../components/global/Header";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMain from "../components/chat/ChatMain";
import { getMemberList } from "../api/memberList";
import "../components/chat/scss/Chat.scss";
// Create a context for socket.io
export const SocketContext = createContext(null);

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showChat, setShowChat] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real users from API
  useEffect(() => {
    setLoading(true);
    getMemberList()
      .then((response) => {
        if (response.data && response.data.length > 0) {
          // Transform API users to chat users format
          const chatUsers = response.data.map(user => ({
            id: user.id,
            name: user.name,
            lastMessage: "こんにちは！",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            hasNotification: false,
            initial: user.name.charAt(0),
            profileImageUrl: user.profileImageUrl || "/images/profileImage.png"
          }));
          
          setUsers(chatUsers);
          setSelectedUserId(chatUsers[0].id);
        } else {
          setError("ユーザーが見つかりませんでした。");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("ユーザーの取得中にエラーが発生しました。");
        setLoading(false);
      });
  }, []);

  // Check if mobile view and reset styles on resize
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);

      // Reset display styles when switching to desktop view
      if (!isMobile) {
        const sidebar = document.querySelector(".sidebar");
        const mainChat = document.querySelector(".mainChat");
        if (sidebar) sidebar.style.display = "block"; // Ensure sidebar is visible
        if (mainChat) mainChat.style.display = "flex"; // Ensure main chat is visible
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Initialize socket connection
  useEffect(() => {
    const mockSocket = {
      on: (event, callback) => {
        if (!mockSocket.listeners[event]) {
          mockSocket.listeners[event] = [];
        }
        mockSocket.listeners[event].push(callback);
      },
      emit: (event, data) => {
        if (event === "send_message") {
          setTimeout(() => {
            const user = users.find((u) => u.id === selectedUserId);
            if (user) {
              if (mockSocket.listeners["typing"]) {
                mockSocket.listeners["typing"].forEach((callback) => {
                  callback({
                    userId: selectedUserId,
                    isTyping: true,
                  });
                });
              }
              setTimeout(() => {
                if (mockSocket.listeners["typing"]) {
                  mockSocket.listeners["typing"].forEach((callback) => {
                    callback({
                      userId: selectedUserId,
                      isTyping: false,
                    });
                  });
                }
                if (mockSocket.listeners["receive_message"]) {
                  mockSocket.listeners["receive_message"].forEach((callback) => {
                    callback({
                      id: Date.now(),
                      sender: user.name,
                      senderId: user.id,
                      text: これはユーザー${user.name}からの自動応答メッセージです。,
                      timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                      isUser: false,
                      profileImageUrl: user.profileImageUrl
                    });
                  });
                }
              }, 3000);
            }
          }, 1000);
        }
      },
      off: (event, callback) => {
        if (mockSocket.listeners[event]) {
          mockSocket.listeners[event] = mockSocket.listeners[event].filter(
            (cb) => cb !== callback
          );
        }
      },
      listeners: {},
    };

    setSocket(mockSocket);
  }, [users, selectedUserId]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    setShowChat(true);

    if (isMobileView) {
      document.querySelector(".sidebar").style.display = "none";
      document.querySelector(".mainChat").style.display = "flex";
    }
  };

  const handleBackToList = () => {
    if (isMobileView) {
      document.querySelector(".sidebar").style.display = "block";
      document.querySelector(".mainChat").style.display = "none";
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="chat-container">
          <div className="loading">読み込み中...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="chat-container">
          <div className="error">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="chat-container">
        <SocketContext.Provider value={socket}>
          <div className="chat-wrapper">
            <ChatSidebar
              users={users}
              onSelectUser={handleSelectUser}
              selectedUserId={selectedUserId}
            />
            {showChat && (
              <ChatMain
                selectedUserId={selectedUserId}
                onBackClick={handleBackToList}
                isMobileView={isMobileView}
                users={users}
              />
            )}
          </div>
        </SocketContext.Provider>
      </div>
    </>
  );
};

export default Chat;