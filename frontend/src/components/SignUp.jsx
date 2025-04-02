import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../PreData/Properties";
import "../styles/SignUp.css";
import { Checkbox } from "antd";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!formData.agreedToTerms) {
      errors.agreedToTerms = "You must agree to the terms";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmpassword: formData.confirmPassword,
      });

      toast.success(response.data.message || "Signup successful!");
      navigate("/username", { state: { email: formData.email } });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
          />
          {formErrors.firstName && (
            <p className="error-message">{formErrors.firstName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
          />
          {formErrors.lastName && (
            <p className="error-message">{formErrors.lastName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
          {formErrors.confirmPassword && (
            <p className="error-message">{formErrors.confirmPassword}</p>
          )}
        </div>

        <div className="checkbox-container">
          <Checkbox
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreedToTerms" className="checkbox-label">
            By creating an account, I agree to the{" "}
            <Link to="/terms">Terms of use</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>
          </label>

          {formErrors.agreedToTerms && (
            <p className="error-message">{formErrors.agreedToTerms}</p>
          )}
        </div>

        <button type="submit" className="button">
          Create an account
        </button>

        <div className="footer-text">
          This site is protected by reCAPTCHA and the{" "}
          <Link to="/google-privacy">Google Privacy Policy</Link> and{" "}
          <Link to="/google-terms">Terms of Service</Link> apply.
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
