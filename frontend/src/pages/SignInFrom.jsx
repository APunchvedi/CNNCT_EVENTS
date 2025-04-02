import React from 'react';
import SignInForm from '../components/SignIn';
import '../styles/SignIn.css';
import MainHeader from '../components/MainHeader';

const Index = () => {


  return (
    <>
     <MainHeader/>
    <div className="auth-layout">
      <div className="auth-form-container">
      
        
        <SignInForm />
      </div>
      
      <div className="auth-image-container">
   
          <div className="auth-image-overlay"></div>
        </div>
      </div>
 
    </>
  );
};

export default Index;
