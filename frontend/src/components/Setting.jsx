import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Setting.css";
import { BASE_URL } from "../PreData/Properties";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/auth/getProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          firstName: response.data.user.firstname || "",
          lastName: response.data.user.lastname || "",
          email: response.data.user.email || "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        toast.error("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("All fields are required");
      return;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/auth/update`,
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          password: formData.password || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="profile-card">
        <div className="header">
          <div className="title-container">
            <h2 className="title">Edit Profile</h2>
          </div>
          <div className="divider">
            <div className="blue-indicator"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-field">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-field">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfileEdit;