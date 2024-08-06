import { Button } from '@/components/ui/button'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from '@/pages/auth'
import Profile from '@/pages/profile'
import Chat from '@/pages/chat'
import { useAppStore } from './store'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'


const PrivateRoute = ({children}) =>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo
  return isAuthenticated ? children :  <Navigate to="/auth"/>
}
const AuthRoute = ({children}) =>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo
  return isAuthenticated ?  <Navigate to="/auth"/> : children
}
const App = () => {
  const {userInfo,setUserInfo} = useAppStore();
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const getUserData = async() =>{
      try{
        const response =await apiClient.get(GET_USER_INFO,{withCredentials:true})
        console.log(response,"GET_USER_RESPONSE")
      }
      catch(err){
        console.log(err)
      }
    }
    if(!userInfo){
      getUserData();
    }
    else{
      setLoading(false)
    }
  },[userInfo,setUserInfo])
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth/></AuthRoute>}/>
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>}/>
        <Route path="*" element={<Navigate to="/auth"/>}/>
      </Routes>
      
      
    </div>
  )
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default App