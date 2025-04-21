import React, { useState } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';

const ProfileUpdate = () => {
  const [image, setImage] = useState(false);
  return (
    <div className='profile'>
      <div className="profile-container">
        <form >
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e) => setImage(e.target.files[0])} type="file" className='form-control' id="avatar" accept='.png, .jpg, .jpeg' hidden />
            <img src={image ? URL.createObjectURL(image)  : assets.avatar_icon} alt="" />
            Upload profile image
          </label>
          <input type="text" className='form-control' placeholder='Your name' required/>
          <textarea placeholder='write profile bio' required className='form-control'></textarea>
          <button className='btn btn-primary' type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={image ? URL.createObjectURL(image)  : assets.logo_icon} alt="" />

      </div>
    </div>
  )
}

export default ProfileUpdate