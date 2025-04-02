import React from "react";
import "../styles/Logo.css";
import LogoIcon from "../assets/Images/Logo.svg";

const Logo = () => {
  return (
    <>
      <div className="logo-container">
      <img src={LogoIcon} alt=""  className="icon"/>
        <span className="logo-text">CNNCT</span>
      </div>
    </>
  );
};

export default Logo;
