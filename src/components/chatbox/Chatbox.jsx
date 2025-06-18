import React, { useContext, useEffect, useRef, useState } from 'react';
import './Chatbox.css';
import assets from '../../assets/assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Chatbox = () => {
  const scrollEnd = useRef(null);
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    try {
      await sendMessage({ text: input.trim() });
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Select a valid image file');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('text', '');
      formData.append('image', file);
      await sendMessage(formData);
      toast.success('Image sent!');
      e.target.value = '';
    } catch (error) {
      console.error(error);
      toast.error('Failed to send image');
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messages?.length) {
      setTimeout(() => {
        scrollEnd.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages]);

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const sortedMessages = [...messages]?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return selectedUser ? (
    <div className='chat-box'>
      <div className='chat-user'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt='' />
        <p>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <img className='dot' src={assets.green_dot} alt='Online' />
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.help_icon}
          className='help'
          alt='Close Chat'
        />
      </div>

      <div className='chat-message mt-2'>
        {sortedMessages.map((msg, index) => (
          <div key={index}>
            {msg.senderId === authUser._id ? (
              <div className='s-msg'>
                {msg.image && <img className='msg-img' src={msg.image} alt='sent' />}
                {msg.text && <p className='msg'>{msg.text}</p>}
                <div>
                  <img src={msg.senderImage || assets.avatar_icon} alt='sender' />
                  <p>{formatTime(msg.createdAt)}</p>
                </div>
              </div>
            ) : (
              <div className='r-msg'>
                {msg.image && <img className='msg-img' src={msg.image} alt='received' />}
                {msg.text && <p className='msg'>{msg.text}</p>}
                <div>
                  <img src={msg.senderImage || assets.avatar_icon} alt='sender' />
                  <p>{formatTime(msg.createdAt)}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        <div ref={scrollEnd}></div>
      </div>

      <div className='chat-input'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
          className='form-control'
          placeholder='Send a message'
        />
        <input
          type='file'
          className='form-control'
          onChange={handleImage}
          id='image'
          accept='image/png,image/jpeg,image/jpg'
          hidden
        />
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt='Upload' />
        </label>
        <img onClick={handleSendMessage} src={assets.send_button} alt='Send' />
      </div>
    </div>
  ) : (
    <div className='without-chat'>
      <img src={assets.logo_icon} className='chat_image' alt='Chat Logo' />
      <p className='text-chat'>Chat Anytime, Anywhere</p>
    </div>
  );
};

export default Chatbox;
