/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import Victory from "../../assets/victory.svg"
import Background from "../../assets/login2.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { SIGNUP_ROUTE } from '@/utils/constants';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validateSignup = () =>{
    if(!email.length ){
      toast.error("Email is Required")
      return false;
    }
    if(!password.length ){
      toast.error("Password is Required")
      return false;
    }
    if(!confirmPassword.length ){
      toast.error("Confirm Password is Required")
      return false;
    }
    if(password !== confirmPassword ){
      toast.error("Password and Confirm Password should be same")
      return false;
    }
    return true;
  }
  const handleLogin = async () => {}
  const handleSignUp = async () => {
    if (validateSignup()) {
      try {
        const response = await apiClient.post(SIGNUP_ROUTE, { email, password });
        console.log("response", response);
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      } catch (error) {
        console.log('Error during signup:', error);
      }
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
        <div className='flex flex-col gap-10 items-center justify-center p-10'>
          <div className='flex flex-col items-center justify-center'>
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl mb-4">
                Welcome
              </h1>
              <img src={Victory} alt="victoryImg" className='h-[100px]' />
            </div>
            <p className="font-medium text-center mt-4">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <Tabs className='w-full mt-8'>
            <TabsList className='bg-transparent rounded-none w-full flex justify-center'>
              <TabsTrigger value="login" className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-1/2 text-center data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Login</TabsTrigger>
              <TabsTrigger value='signup' className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-1/2 text-center data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Signup</TabsTrigger>
            </TabsList>
            <TabsContent className='flex flex-col mt-4 gap-5' value='login'>
              <input placeholder="Email" type="email" value={email} className="rounded-full p-4 border" onChange={(e) => setEmail(e.target.value)} />
              <input placeholder="Password" type="password" value={password} className="rounded-full p-4 border" onChange={(e) => setPassword(e.target.value)} />
              <Button className="rounded-full p-4" onClick={handleLogin}>Login</Button>
            </TabsContent>
            <TabsContent className='flex flex-col mt-4 gap-5' value='signup'>
              <input placeholder="Email" type="email" value={email} className="rounded-full p-4 border" onChange={(e) => setEmail(e.target.value)} />
              <input placeholder="Password" type="password" value={password} className="rounded-full p-4 border" onChange={(e) => setPassword(e.target.value)} />
              <input placeholder="Confirm Password" type="password" value={confirmPassword} className="rounded-full p-4 border" onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button className="rounded-full p-4" onClick={handleSignUp}>Signup</Button>
            </TabsContent>
          </Tabs>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="background-img" className='h-[700px]' />
        </div>
      </div>
    </div>
  )
}

export default Auth
