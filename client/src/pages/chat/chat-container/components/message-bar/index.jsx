import { useSocket } from "@/context/SocketContext"
import { useAppStore } from "@/store"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import {GrAttachment} from "react-icons/gr"
import { IoSend } from "react-icons/io5"
import {RiEmojiStickerLine} from "react-icons/ri"

// const MessageBar = () => {
//     const [message,setMessage] = useState("")
//     const emojiRef = useRef();
//     const [emojiPicker,setEmojiPicker] = useState(false)
//     const {selectedChatType,selectedChatData,userInfo} = useAppStore();
//     const {socket} = useSocket();
//     useEffect(()=>{
//         function handleClickOutside(e){
//             if(emojiRef.current && !emojiRef.current.contains(e.target) ){
//                 setEmojiPicker(false)
//             } 
//         }
//         document.addEventListener("mousedown",handleClickOutside)
//         return(()=>{document.removeEventListener("mousedown",handleClickOutside)})
//     },[emojiRef])

//     const handleAddEmoji = (emoji) =>{
//         setMessage((msg)=>msg + emoji.emoji)
//     }
//     const handleSendMessage = async() =>{
//         alert("Button CLicked Send the message")
//         if (!socket) {
//            alert("Socket not initialized");
//             return;
//         }
    
//         if(selectedChatType === "contact"){
//             socket.emit("sendMessage",{
//                 sender:userInfo.id,
//                 content:message,
//                 recipient: selectedChatData._id,
//                 fileURL: undefined,
//                 messageType: "text "
//             })
//         }
//     }
//    return (
//     <div
//     className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6  ">
//         <div className="flex-1 flex rounded-md bg-[#2a2b33] gap-5 pr-5 ">
//             <input type="text" className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none "
//             placeholder="Enter Message"
//             value={message}
//             onChange={(e)=>setMessage(e.target.value)}
//              />
//              <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
//                 <GrAttachment className="text-2xl"/>
//              </button>
//              <div className="relative">
//              <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={()=>setEmojiPicker(!emojiPicker)}>
//                 <RiEmojiStickerLine className="text-2xl"/>
//              </button>
//              <div className="absolute bottom-16 right-0" ref={emojiRef}>
//                 <EmojiPicker theme="dark" open={emojiPicker} onEmojiClick={handleAddEmoji} autoFocusSearch={false}   />
//              </div>
//              </div>
//         </div>
//         <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:hover:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleSendMessage}>
//                 <IoSend className="text-2xl"/>
//              </button>
//     </div>
//   )
// }

// export default MessageBar

const MessageBar = () => {
    const [message, setMessage] = useState("");
    const emojiRef = useRef();
    const [emojiPicker, setEmojiPicker] = useState(false);
    const { selectedChatType, selectedChatData, userInfo } = useAppStore();
    const socket = useSocket();
  
    useEffect(() => {
      function handleClickOutside(e) {
        if (emojiRef.current && !emojiRef.current.contains(e.target)) {
          setEmojiPicker(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [emojiRef]);
  
    const handleAddEmoji = (emoji) => {
      setMessage((msg) => msg + emoji.emoji);
    }
  
    const handleSendMessage =  () => {
console.log("SEND BUTTON CLICKED",socket)
      if (!socket) {
        alert("Socket not initialized");
        return;
      }
  
      if (selectedChatType === "contact") {
        socket.emit("sendMessage", {
          sender: userInfo.id,
          content: message,
          recipient: selectedChatData._id,
          fileURL: undefined,
          messageType: "text"
        });
      }
      setMessage("")
      console.log("Message sent", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        fileURL: undefined,
        messageType: "text"
    }); // Add this line
    }
    console.log("userInfo.id:", userInfo.id);
    // console.log("Socket connected:", socket.current.connected);

    console.log("selectedChatType:", selectedChatType);
    console.log("selectedChatData:", selectedChatData);
    
    return (
      <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
        <div className="flex-1 flex rounded-md bg-[#2a2b33] gap-5 pr-5">
          <input
            type="text"
            className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
            <GrAttachment className="text-2xl" />
          </button>
          <div className="relative">
            <button
              className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
              onClick={() => setEmojiPicker(!emojiPicker)}
            >
              <RiEmojiStickerLine className="text-2xl" />
            </button>
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker theme="dark" open={emojiPicker} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
            </div>
          </div>
        </div>
        <button
          className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:hover:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleSendMessage}
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    )
  }
  
  export default MessageBar;