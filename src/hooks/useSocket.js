import { useState, useEffect } from 'react';
const useSocket = (users, selectedUserId) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const mockSocket = {
      on: (event, callback) => {
        if (!mockSocket.listeners[event]) mockSocket.listeners[event] = [];
        mockSocket.listeners[event].push(callback);
      },
      emit: (event, data) => {
        if (event === "send_message") {
          setTimeout(() => {
            const user = users.find((u) => u.id === selectedUserId);
            if (user) {
              if (mockSocket.listeners["typing"]) {
                mockSocket.listeners["typing"].forEach((cb) => cb({ userId: selectedUserId, isTyping: true }));
              }
              setTimeout(() => {
                if (mockSocket.listeners["typing"]) {
                  mockSocket.listeners["typing"].forEach((cb) => cb({ userId: selectedUserId, isTyping: false }));
                }
                if (mockSocket.listeners["receive_message"]) {
                  const responseMessage = {
                    id: Date.now(),
                    sender: user.name,
                    senderId: user.id,
                    text: `これはユーザー${user.name}からの自動応答メッセージです。`,
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    isUser: false,
                    profileImageUrl: user.profileImageUrl
                  };
                  mockSocket.listeners["receive_message"].forEach((cb) => cb(responseMessage));
                }
              }, 3000);
            }
          }, 1000);
        }
      },
      off: (event, callback) => {
        if (mockSocket.listeners[event]) {
          mockSocket.listeners[event] = mockSocket.listeners[event].filter((cb) => cb !== callback);
        }
      },
      listeners: {},
    };
    setSocket(mockSocket);
    return () => {
      setSocket(null);
    };
  }, [users, selectedUserId]);
  return socket;
};
export default useSocket;
