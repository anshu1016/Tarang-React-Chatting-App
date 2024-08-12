import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import PropTypes from 'prop-types';

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const socket = useRef(null); // Initialize as null
  const { userInfo } = useAppStore();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (userInfo && !isConnected) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to Socket Server");
        setIsConnected(true); // Set connected state
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        setIsConnected(false); // Reset connected state
      }
    };
  }, [userInfo]);
  
  SocketProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate that 'children' is passed correctly
  };
  // Return the socket instance only when it's connected
  return (
    <SocketContext.Provider value={isConnected ? socket.current : null}>
      {children}
    </SocketContext.Provider>
  );

}
