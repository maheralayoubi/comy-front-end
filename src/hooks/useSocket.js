import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../utils/apiUtils";

const useSocket = (currentSystemUser) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(API_URL, {
      withCredentials: true,
      reconnect: true,
      reconnectionDelay: 5000,
    });

    socketInstance.on("connect", () => {});

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
    
    socketInstance.on("newMessage", () => {});
    
    socketInstance.on("userStatusChanged", () => {});

    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, [currentSystemUser?.id]);

  return socket;
};

export default useSocket;
