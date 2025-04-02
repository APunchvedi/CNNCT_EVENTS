import React from "react";
import "../styles/Header.css";


const Header = ({ title, subtitle, button }) => {
  return (
    <div className="header-container">
      <div className="header-content">
        {title && <h1 className="header-title">{title}</h1>}
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
      {button && (
        <button className="header-button" onClick={button.onClick}>
          {button.icon && <span className="button-icon">{button.icon}</span>}
          {button.label && <span className="button-text">{button.label}</span>}
        </button>
      )}
    </div>
  );
};

export default Header;
