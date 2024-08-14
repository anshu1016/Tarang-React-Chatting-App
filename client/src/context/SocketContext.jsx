// /* eslint-disable react-refresh/only-export-components */
// import { useAppStore } from "@/store";
// import { HOST } from "@/utils/constants";
// import { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import PropTypes from 'prop-types';

// const SocketContext = createContext(null);



// export const SocketProvider = ({ children }) => {
//   const socket = useRef(); // Initialize as null
//   const { userInfo } = useAppStore();
 
//   useEffect(() => {
//     if (userInfo ) {
//       socket.current = io(HOST, {
//         withCredentials: true,
//         query: { userId: userInfo.id },
//       });

//       socket.current.on("connect", () => {
//         console.log("Connected to Socket Server");
//     });
//          // Set connected state
// const handleRecieveMessage = (message) =>{
// const {addMessage,selectedChatData,selectedChatType} = useAppStore.getState();
// if (
//     selectedChatType !== undefined &&
//     (selectedChatData._id === message.sender._id || selectedChatData.id === message.recipient._id)
//   ) {
//     console.log("Message_Recieved_ASDFG",message)
//     addMessage(message);
//   }

// }
//         // Register event listeners only after the socket is connected
//         socket.current.on("recieveMessage", handleRecieveMessage);

//     return () => {
//     socket.current.disconnect();
//   }
// }}, [userInfo])



//   SocketProvider.propTypes = {
//     children: PropTypes.node.isRequired, // Validate that 'children' is passed correctly
//   };

//   // Return the socket instance only when it's connected
//   return (
//     <SocketContext.Provider value={socket.current}>
//         {children}
//     </SocketContext.Provider>
//   );
// }

//  const useSocket = () => useContext(SocketContext)
//  export {useSocket};

import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import PropTypes from 'prop-types';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socket = useRef(null); // Initialize as null
  const { userInfo } = useAppStore();
 
  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to Socket Server");
      });

      const handleReceiveMessage = (message) => {
        const { addMessage, selectedChatData, selectedChatType } = useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id || selectedChatData.id === message.recipient._id)
        ) {
          console.log("Message Received", message);
          addMessage(message);
        }
      }

      // Register event listeners only after the socket is connected
      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.current.disconnect();
        console.log("Socket disconnected");
      }
    }
  }, [userInfo]);

  SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);