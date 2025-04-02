import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryCard from '../components/CategoryCard';
import Logo from '../components/Logo';
import '../styles/PreferencesForm.css';
import SideImage from '../assets/Images/Side.svg';
import { BASE_URL } from '../PreData/Properties';
import MainHeader from '../components/MainHeader';

const categories = [
  { id: 'sales', icon: '💼', label: 'Sales' },
  { id: 'education', icon: '📚', label: 'Education' },
  { id: 'finance', icon: '💰', label: 'Finance' },
  { id: 'government', icon: '🏛️', label: 'Government & Politics' },
  { id: 'consulting', icon: '📊', label: 'Consulting' },
  { id: 'recruiting', icon: '🔍', label: 'Recruiting' },
  { id: 'tech', icon: '💻', label: 'Tech' },
  { id: 'marketing', icon: '📱', label: 'Marketing' }
];

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
 const email = location.state?.email;

  const [username, setUsername] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]); // Allow multiple selections
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) // Remove if already selected
        : [...prev, categoryId] // Add if not selected
    );
  };

  const handleSubmit = async () => {
    if (!username.trim()) {
      toast.error("Please enter your username");
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/updateusername`, {
        username,
        email,
        category: selectedCategories.map(id => {
          const category = categories.find(cat => cat.id === id);
          return category ? category.label : id;
        })
      });

      toast.success(response.data.message || "Profile updated successfully!");
      setTimeout(() => navigate('/sign-in'), 2000); // Redirect after success
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <MainHeader/>

      {/* Form Side */}
      <div className="form-side">
        <div className="logo-wrapper">
  
        </div>

        <div className="form-wrapper">
          <h1 className="form-title">Your Preferences</h1>

          <div className="input-wrapper">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              className="input-field"
              placeholder="Tell us your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <p className="category-label">Select categories that best describe you:</p>
            <div className="categories-grid">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  selected={selectedCategories.includes(category.id)}
                  onClick={() => toggleCategory(category.id)}
                />
              ))}
            </div>
          </div>

          <div className="button-container">
            <button 
              className="button-primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>

      {/* Image Side */}
      <div className="image-side">
        <div className="image-container" style={{ backgroundImage: `url(${SideImage})` }}></div>
      </div>
    </div>
  );
};

export default Index;
