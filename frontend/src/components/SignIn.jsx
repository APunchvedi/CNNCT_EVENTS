import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/SignUp.css";
import { BASE_URL } from '../PreData/Properties';

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Username and Password are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password
      });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate('/events'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <div className="form-header">
        <h1 className="form-title">Sign in</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-fields">
          <div className="form-field">
            <input
              type="text"
              placeholder="Username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        
        <div className="text-center text-sm mt-4">
          <span className="text-gray">Don't have an account? </span>
          <Link className="auth-link" to="/sign-up">Sign up</Link>
        </div>
      </form>
      
      <div className="text-center text-xs text-gray mt-8">
        This site is protected by reCAPTCHA and the{' '}
        <a href="#" className="auth-link">Google Privacy Policy</a>{' '}
        and{' '}
        <a href="#" className="auth-link">Terms of Service</a>{' '}
        apply.
      </div>
    </div>
  );
};

export default SignInForm;