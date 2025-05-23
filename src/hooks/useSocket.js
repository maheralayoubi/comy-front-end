import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../utils/apiUtils";

const useSocket = (users, selectedUserId, currentSystemUser) => {
  const [socket, setSocket] = useState(null);
  // const API_URL = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    const socketInstance = io(API_URL, {
      withCredentials: true,
    });

    socketInstance.on("connect", () => {
      console.log("Connected to socket server with ID:", socketInstance.id);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
   
    socketInstance.on("newMessage", (message) => {
      console.log("Received new message:", message);
    });
   
    socketInstance.on("userStatusChanged", ({ userId, isOnline }) => {
      console.log(`User ${userId} is now ${isOnline ? 'online' : 'offline'}`);
    });

    setSocket(socketInstance);
    return () => socketInstance.disconnect();
  }, [currentSystemUser?.id]);

  return socket;
};

export default useSocket;
