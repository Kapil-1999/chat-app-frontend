import React, { useContext, useState } from 'react';
import './Leftside.css';
import assets from '../../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LeftSidebar = () => {
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext);
    const handleEditProfile = () => {
        navigate("/profile");
    };

    const handleLogout = async () => {
        await logout();
    }
    return (
        <div className='ls'>
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} className='logo' alt="" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt="" />
                        <div className='sub-menu'>
                            <p onClick={handleEditProfile}>Edit Profile</p>
                            <hr />
                            <p onClick={handleLogout}>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="ls-search">
                    <img src={assets.search_icon} alt="" />
                    <input type="text" placeholder='search here' />
                </div>
            </div>
            <div className="ls-list">
                {Array(12).fill("").map((item, index) => {
                    return <div className="friends" key={index}>
                        <img src={assets.profile_img} alt="" />
                        <div>
                            <p>Kapil</p>
                            <span>Hello , How are You</span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default LeftSidebar