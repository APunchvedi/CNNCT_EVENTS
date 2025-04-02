import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SignupForm from '../components/SignUp';
import MainHeader from '../components/MainHeader';


const Signup = () => {
  

  return (
    <>
    <MainHeader/>
    <div className="container">
      <div className="form-container">
        <div className="form-content">
          <Logo className="logo" />
          
          <div className="header-flex">
           
          <h1 className="header">Create an account</h1>
            <Link to="/sign-in">
              Sign in instead
            </Link>
          </div>
          
          <SignupForm />
        </div>
      </div>
      
      
      <div className="hero-container">
        <img 
          src= "https://i.ibb.co/8v5M2QS/image-1.png" 
          alt="Professional analyzing data" 
          className="hero-image"
        />
       
      </div>
    </div>
    </>
  );
};

export default Signup;
