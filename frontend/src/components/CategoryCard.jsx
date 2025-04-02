import React from 'react';
import '../styles/CategoryCard.css';


const CategoryCard = ({ icon, label, selected, onClick }) => {
  return (
    <div 
      className={`category-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="category-icon">{icon}</span>
      <span className="category-label">{label}</span>
    </div>
  );
};

export default CategoryCard;
