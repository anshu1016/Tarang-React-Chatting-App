// import { useAppStore } from "@/store";
// import { View } from "lucide-react";
// import moment from "moment";
// import { useEffect, useRef } from "react";

// const MessageContainer = () => {
//     const  scrollRef = useRef()
//     const {selectedChatType,selectedChatData,userInfo,selectedChatMessages} = useAppStore();

//     const renderMessages = () =>{
//         let lastDate = null;
//         return selectedChatMessages.map((message,index)=>{
//             const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
//             const showDate = messageDate !== lastDate;
//             lastDate = messageDate;
//             return (
//                 <div key ={index}>
//                     {showDate && (<div className="text-center text-gray-500 my-2 ">
//                         {moment(message.timeStamp).format("LL")}
//                     </div>)}
//                     {
//                         selectedChatType === "contact" && renderDMMessage(message)
//                     }
//                 </div>
//             )
//         })
//     }
//     const renderDMMessage = (message) =>{
   
//    <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
//    {message.messageType === "text" && (
//     <div
//     className={`${message.sender !== selectedChatData._id ?
//      "bg-[#841ff]/5 text-[#8417ff]/90 border-[#8417ff]/50 " : 
//      "bg-[#2a2b33]/5 text-white/80 border-[#fff]/20 "}
//      border inline-block p-4 rounded my-1 max-w-[50%] break-words `}>
//        {message.content}
//    </div>
//    )}
//    <div className="text-xs text-gray-600 ">
//     {moment(message.timeStamp).format("LT")}

//    </div>
//    </div>
    
   
//     }
//     useEffect(()=>{
//         if(scrollRef.current){
//             scrollRef.current.scrollIntoView({
//                 behavior: "smooth"
//             })
//         }
//     },[selectedChatMessages])
//   return (
//     <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w=[70vw] xl:w-[80vw] w-full ">
//         {renderMessages()}
//         <div ref={scrollRef}></div>
//     </div>
//   )
// }

// export default MessageContainer
import { useAppStore } from "@/store";
import moment from "moment";
import { useEffect, useRef } from "react";

const MessageContainer = () => {
    const scrollRef = useRef(null);
    const { selectedChatType, selectedChatData, userInfo, selectedChatMessages } = useAppStore();

    const renderMessages = () => {
        let lastDate = null;
        return selectedChatMessages.map((message, index) => {
            const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;
            return (
                <div key={index}>
                    {showDate && (
                        <div className="text-center text-gray-500 my-2">
                            {moment(message.timeStamp).format("LL")}
                        </div>
                    )}
                    {selectedChatType === "contact" && renderDMMessage(message)}
                </div>
            );
        });
    };

    const renderDMMessage = (message) => {
        const isCurrentUserSender = message.sender === userInfo._id;

        return (
            <div className={`flex ${isCurrentUserSender ? 'justify-end' : 'justify-start'}`}>
                <div
                    className={`${
                        isCurrentUserSender
                            ? "bg-blue-500 text-white border-blue-400"
                            : "bg-gray-300 text-black border-gray-400"
                    } border inline-block p-4 rounded my-1 max-w-[70%] break-words`}
                >
                    {message.content}
                    <div className="text-xs text-gray-600 mt-1">
                        {moment(message.timeStamp).format("LT")}
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [selectedChatMessages]);

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
            {renderMessages()}
            <div ref={scrollRef}></div>
        </div>
    );
};

export default MessageContainer;
