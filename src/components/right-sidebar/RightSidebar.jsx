import React, { useContext } from 'react';
import './RightSidebar.css';
import assets from '../../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { authUser , logout } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout();
    }
  
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img className='' src={authUser?.profilePic || assets.avatar_icon} alt="" /> 
        <h3>{authUser?.fullName} <img className='dot' src={assets.green_dot} alt="" /></h3>
        <p>{authUser?.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div className="">
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button className='btn btn-danger' onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default RightSidebar