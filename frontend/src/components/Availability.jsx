
import Header from './Header'
import React, { useState } from "react";
import SchedulerToggle from "./SchedulerToggle";
import CheckAvailability from "./CheckAvailability";
import CalendarView from "./CalendarView";
import "../styles/SchedulerCard.css";


const Availability = () => {
  

  const [activeView, setActiveView] = useState("calendar");
  return (
    <>
    <Header
        title="Availability"
        subtitle="Configure times when you are available for bookings"
      
    />
    
 

    <div className="scheduler-header">
        <SchedulerToggle activeView={activeView} onViewChange={setActiveView} />
      </div>
    <div className="scheduler-card">
    
      
      <div className="scheduler-content">
        <div className={`view-container ${activeView === "availability" ? "active" : "inactive"}`}>
          {activeView === "availability" && <CheckAvailability />}
        </div>
        
        <div className={`view-container ${activeView === "calendar" ? "active" : "inactive"}`}>
          {activeView === "calendar" && <CalendarView />}
        </div>
      </div>
    </div>


    </>
  )
}

export default Availability