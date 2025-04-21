import React from 'react';
import './RightSidebar.css';
import assets from '../../assets/assets';

const RightSidebar = () => {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img className='' src={assets.profile_img} alt="" />
        <h3>Kapil Singh Pilkhwal <img className='dot' src={assets.green_dot} alt="" /></h3>
        <p>Hey, There i am Kapil Singh Pilkhwal using chat app</p>
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
      <button className='btn btn-danger'>Logout</button>

    </div>
  )
}

export default RightSidebar