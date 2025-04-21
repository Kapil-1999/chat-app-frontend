import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import Chat from '../pages/chat/Chat'
import ProfileUpdate from '../pages/profile-update/ProfileUpdate'

const MyRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/chat' element={<Chat/>} />
            <Route path='/profile' element={<ProfileUpdate/>} />
        </Routes>

    </div>
  )
}

export default MyRoutes