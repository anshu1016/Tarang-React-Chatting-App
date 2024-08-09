import ChatHeader from './components/chat-header'
import MessageBar from './components/message-bar'
import MessageContainer from './components/message-container'


const ChatContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <ChatHeader/>
        <MessageContainer/>
        <MessageBar/>
    </div>
  )
}

// const ChatContainer = () => {
//   return (
//     <div className='fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col '>
//         <ChatHeader/>
//         <MessageContainer/>
//         <MessageBar/>
//     </div>
//   )
// }


export default ChatContainer