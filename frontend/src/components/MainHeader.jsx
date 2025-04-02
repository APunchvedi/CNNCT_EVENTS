import React from 'react';
import '../styles/MainHeader.css';
import Logo from "../assets/Images/Logo.svg"

const MainHeader = ({
  logoText = "CNNCT",
  logoSrc,
  signUpText,
  onSignUpClick,
}) => {
 
  const showButton = !!signUpText;
  
  return (
    <div className="nav-container">
      <div className={`nav-wrapper ${!showButton ? 'transparent-bg' : ''}`}>
        <div className="brand-logo">
          {logoSrc ? (
            <img src={Logo} alt={logoText} className="logo-image" />
          ) : (
            <div className="brand-logo-wrapper">
              <img src={Logo} alt={logoText} className="logo-image" />
              <span className="logo-text">{logoText}</span>
            </div>
          )}
        </div>
        {showButton && (
          <button className="cta-button" onClick={onSignUpClick}>
            {signUpText}
          </button>
        )}
      </div>
    </div>
  );
};

export default MainHeader;