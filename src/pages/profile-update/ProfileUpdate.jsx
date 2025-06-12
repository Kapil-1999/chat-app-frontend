import React, { useContext, useState } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfileUpdate = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [image, setImage] = useState(false);
  const navigate = useNavigate();
  const [profileUpdate, setProfileUpdate] = useState({
    fullName: '',
    bio: "",
  });


  const handleChange = (e) => {
    e.preventDefault();
    setProfileUpdate({
      ...profileUpdate,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('fullName', profileUpdate.fullName);
    formData.append('bio', profileUpdate.bio);

    if (image) {
      formData.append('profilePic', image);
    }
    await updateProfile(formData);
    navigate("/chat")
  }

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e) => setImage(e.target.files[0])} type="file" className='form-control' id="avatar" accept='.png, .jpg, .jpeg' hidden />
            <img src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            Upload profile image
          </label>
          <input type="text" name='fullName' value={profileUpdate.fullName || authUser?.fullName} onChange={handleChange} className='form-control' placeholder='Your name' required />
          <textarea placeholder='write profile bio' name='bio' value={profileUpdate.bio || authUser?.bio} onChange={handleChange} required className='form-control'></textarea>
          <button className='btn btn-primary' type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={authUser?.profilePic || assets.logo_icon} alt="" />

      </div>
    </div>
  )
}

export default ProfileUpdate