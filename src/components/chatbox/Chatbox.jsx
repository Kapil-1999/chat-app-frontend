import React from 'react';
import './Chatbox.css';
import assets from '../../assets/assets';

const Chatbox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>Kapil Singh PIlkhwal <img className='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} className='help' alt="" />
      </div>
      <div className="chat-message">
        <div className="s-msg">
          <p className="msg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque voluptatem ea enim! Voluptas corporis architecto quibusdam aut consectetur accusamus consequatur, possimus dolor laborum et fuga doloremque natus sequi perspiciatis earum?
          </p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 Pm</p>
          </div>
        </div>
        <div className="s-msg">
         <img className='msg-img' src={assets.pic1} alt="" />
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 Pm</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque voluptatem ea enim! Voluptas corporis architecto quibusdam aut consectetur accusamus consequatur, possimus dolor laborum et fuga doloremque natus sequi perspiciatis earum?
          </p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 Pm</p>
          </div>
        </div>
      </div>
      <div className="chat-input">
        <input type="text" className='form-control' placeholder='Send a message' />
        <input type="file" className='form-control' id='image' accept='image.png,image/jpeg,image/jpg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  )
}

export default Chatbox