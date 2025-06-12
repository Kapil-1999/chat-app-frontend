import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import Chat from '../pages/chat/Chat'
import ProfileUpdate from '../pages/profile-update/ProfileUpdate'
import { AuthContext } from '../context/AuthContext'

const MyRoutes = () => {
    const { authUser } = useContext(AuthContext)

  return (
    <div>
        <Routes>
            <Route path='/' element={!authUser ? <Login/> : <Navigate to="/chat"/>} />
            <Route path='/chat' element={authUser ? <Chat/> : <Navigate to="/"/>} />
            <Route path='/profile' element={authUser ? <ProfileUpdate/> : <Navigate to="/"/>} />
        </Routes>

    </div>
  )
}

export default MyRoutes