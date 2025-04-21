import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';

const Login = () => {
  const [currentState,setCurrentState] = useState('Sign Up')
  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className='logo' />
      <form action="" className="login-form">
        <h2>{currentState}</h2>
        {currentState === 'Sign Up' && <input type="text" placeholder='Username'  required className='form-control' />}
        <input type="email" placeholder='Email' className='form-control' required/>
        <input type="password" placeholder='Password' className='form-control' required/>
        <button type='submit' className='btn btn-primary'>{currentState == 'Sign Up' ? "Create Account" : "Login"}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy</p>       
        </div>
        <div className="login-forgot">
          {currentState=== 'Sign Up'? 
          <p className="login-toggle">
            Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span>
          </p> :
          <p className="login-toggle">
            Create an account <span onClick={() => setCurrentState('Sign Up')}>Create an account</span>
          </p> }
        </div>
        
        
      </form>
    </div>
  )
}

export default Login