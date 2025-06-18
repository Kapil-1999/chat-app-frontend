import React, { useContext, useEffect, useState } from 'react';
import './Leftside.css';
import assets from '../../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { logout, onlineUsers } = useContext(AuthContext);
    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
    const [input, setInput] = useState(false);

    const handleEditProfile = () => {
        navigate("/profile");
    };

    const handleLogout = async () => {
        await logout();
    }

    const filteredUser = input ? users.filter((user) => user?.fullName?.toLowerCase()?.includes(input.toLowerCase())) : users;

    useEffect(() => {
        getUsers()
    }, [onlineUsers])


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
                    <input onChange={(e) => setInput(e.target.value)} type="text" placeholder='search here' />
                </div>
            </div>
            <div className="ls-list">
                {filteredUser.map((item, index) => {
                    const unseenCount = unseenMessages[item._id] || 0;
                    const isOnline = onlineUsers.includes(item._id);

                    return (
                        <div
                            className="friends"
                            key={index}
                            onClick={() => {
                                setSelectedUser(item);
                                setUnseenMessages(prev => ({
                                    ...prev,
                                    [item._id]: 0
                                }));
                            }}
                        >
                            <img src={item?.profilePic || assets.avatar_icon} alt="" />
                            <div className="friend-info">
                                <p>{item?.fullName}</p>
                                {isOnline ? (
                                    <span className='online-status'>Online</span>
                                ) : (
                                    <span className='offline-status'>Offline</span>
                                )}
                            </div>
                            {unseenCount > 0 && (
                                <div className="unseen-badge">{unseenCount}</div>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default LeftSidebar