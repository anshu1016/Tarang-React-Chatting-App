 
// eslint-disable-next-line no-unused-vars
import { useAppStore } from '@/store';
import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './chat-container';
import ContactsContainer from './contacts-container';
import EmptyChatContainer from './empty-chat-container';

const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("Please setup profile to continue")
      navigate("/profile")
    }
  },[userInfo,navigate])

  return (
    <div className=' flex h-[100vh] text-white overflow-hidden  '>
      <ChatContainer/>
       <ContactsContainer/>
      <EmptyChatContainer/>
     
    </div>
  )
}

export default Chat