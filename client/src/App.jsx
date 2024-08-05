import { Button } from '@/components/ui/button'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from '@/pages/auth'
import Profile from '@/pages/profile'
import Chat from '@/pages/chat'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="*" element={<Navigate to="/auth"/>}/>
      </Routes>
      
      
    </div>
  )
}

export default App