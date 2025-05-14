import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (users, selectedUserId, currentSystemUser) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:8080", {
      withCredentials: true,
      query: {
        userId: currentSystemUser?.id,
      },
    });

    socketInstance.on("connect", () => {
      console.log(" Connected to socket server with ID:", socketInstance.id);
    });

    socketInstance.on("connect_error", (err) => {
      console.error(" Socket connection error:", err);
    });

    setSocket(socketInstance);
    return () => socketInstance.disconnect();
  }, [currentSystemUser?.id]);

  return socket;
};

export default useSocket;
