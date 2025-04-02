import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  BookOutlined,
  FieldTimeOutlined,
  SettingOutlined,
  LinkOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Avatar, Button, Dropdown, Menu } from "antd";
import "../styles/SideBar.css";
import LogoIcon from "../assets/Images/Logo.svg";
import AvtarImg from "../assets/Images/Avatar.png";
import { Plus } from "lucide-react";

const { Sider, Content, Footer } = Layout;

const LayoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("User Name");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { key: "events", icon: <LinkOutlined />, label: "Events", path: "/events" },
    { key: "booking", icon: <BookOutlined />, label: "Booking", path: "/booking" },
    { key: "availability", icon: <FieldTimeOutlined />, label: "Availability", path: "/availability" },
    { key: "settings", icon: <SettingOutlined />, label: "Settings", path: "/settings" },
  ];

  useEffect(() => {
    const fetchUserData = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setUserName(`${userData?.firstname || "User"} ${userData?.lastname || "Name"}`);
      }
    };

    fetchUserData();
    window.addEventListener("storage", fetchUserData);
    return () => window.removeEventListener("storage", fetchUserData);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const dropdownMenu = (
    <Menu
      items={[
        {
          key: "logout",
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ]}
    />
  );

  if (isMobile) {
    return (
      <Layout>
        <Content className="mobile-content">
          <Outlet />
        </Content>
        <Footer className="mobile-footer">
          <div className="mobile-nav">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={item.key}
                  className={`mobile-nav-item ${isActive ? "active" : ""}`}
                  onClick={() => handleNavClick(item.path)}
                >
                  <div className="mobile-nav-icon">{item.icon}</div>
                  <div className="mobile-nav-label">{item.label}</div>
                </div>
              );
            })}
            <Button
              type="primary"
              className="custom-button"
              icon={<Plus size={24} />}
              onClick={() => handleNavClick("/create")}
            >
              Create
            </Button>
          </div>
        </Footer>
      </Layout>
    );
  }

  return (
    <Layout hasSider>
      <Sider className="desktop-sider" theme="light">
        <div className="logo-container" />
        <header className="brand">
          <img src={LogoIcon} alt="Logo" className="brand-logo" />
          <h1 className="brand-name">CNNCT</h1>
        </header>
        <div className="desktop-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.key}
                className={`desktop-nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavClick(item.path)}
              >
                <span className={`desktop-nav-icon ${isActive ? "active-icon" : ""}`}>{item.icon}</span>
                <span className={`desktop-nav-label ${isActive ? "active-label" : ""}`}>{item.label}</span>
              </div>
            );
          })}
          <Button
            type="primary"
            className="custom-button"
            icon={<Plus size={15} className="btn-icon" />}
            onClick={() => handleNavClick("/create")}
          >
            Create
          </Button>
        </div>
        <div className="user-profile-container">
          <Dropdown overlay={dropdownMenu} trigger={["click"]}>
            <div className="user-profile" style={{ cursor: "pointer" }}>
              <Avatar size="small" src={AvtarImg} />
              <span className="username">{userName}</span>
            </div>
          </Dropdown>
        </div>
      </Sider>
      <Layout>
        <Content className="desktop-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
