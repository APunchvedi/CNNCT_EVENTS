import React from "react";
import { Calendar, LayoutGrid } from "lucide-react";
import "../styles/SchedulerToggle.css";

const SchedulerToggle = ({ activeView, onViewChange }) => {
  return (
    <div className="toggle-container">
      <button
        onClick={() => onViewChange("availability")}
        className={`toggle-button ${activeView === "availability" ? "active" : ""}`}
      >
        <LayoutGrid className="toggle-icon" />
        <span>Availability</span>
      </button>
      <button
        onClick={() => onViewChange("calendar")}
        className={`toggle-button ${activeView === "calendar" ? "active" : ""}`}
      >
        <Calendar className="toggle-icon" />
        <span>Calendar View</span>
      </button>
    </div>
  );
};

export default SchedulerToggle;
