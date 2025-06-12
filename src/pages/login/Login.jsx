import React, { useContext, useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    bio: "test",
  });

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = async(e) => {
    e.preventDefault();
    login(currentState == "Sign Up" ? 'register' : 'login' , user)
  }


  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className='logo' />
      <form action="" className="login-form" onSubmit={onFormSubmit}>
        <h2>{currentState}</h2>
        {currentState === 'Sign Up' && <input type="text" placeholder='Username' name='fullName' value={user.fullName} onChange={handleChange} required className='form-control' />}
        <input type="email" placeholder='Email' className='form-control' name='email' value={user.email} onChange={handleChange} required />
        <input type="password" placeholder='Password' className='form-control' name='password' value={user.password} onChange={handleChange} required />
        <button type='submit' className='btn btn-primary'>{currentState == 'Sign Up' ? "Create Account" : "Login"}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy</p>
        </div>
        <div className="login-forgot">
          {currentState === 'Sign Up' ?
            <p className="login-toggle">
              Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span>
            </p> :
            <p className="login-toggle">
              Create an account <span onClick={() => setCurrentState('Sign Up')}>Create an account</span>
            </p>}
        </div>


      </form>
    </div>
  )
}

export default Login