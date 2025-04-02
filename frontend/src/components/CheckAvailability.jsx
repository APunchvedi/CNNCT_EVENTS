import React, { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import '../styles/CheckAvailability.css';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CheckAvailability = () => {
  const [schedule, setSchedule] = useState({
    Sun: { enabled: false, slots: [] },
    Mon: { enabled: true, slots: [{ start: '', end: '' }] },
    Tue: { enabled: true, slots: [{ start: '', end: '' }] },
    Wed: { enabled: true, slots: [{ start: '', end: '' }] },
    Thu: { enabled: true, slots: [{ start: '', end: '' }] },
    Fri: { enabled: true, slots: [{ start: '', end: '' }] },
    Sat: { enabled: true, slots: [{ start: '', end: '' }] },
  });

  const [timeZone] = useState('(GMT-7:00) Standard');

  const toggleDay = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        slots: prev[day].enabled ? prev[day].slots : [{ start: '', end: '' }]
      }
    }));
  };

  const addTimeSlot = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: '', end: '' }]
      }
    }));
  };

  const removeTimeSlot = (day, index) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTimeSlot = (day, index, field, value) => {
    setSchedule(prev => {
      const updatedSlots = [...prev[day].slots];
      updatedSlots[index] = {
        ...updatedSlots[index],
        [field]: value
      };
      
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: updatedSlots
        }
      };
    });
  };

  const duplicateDay = (day) => {
    
    console.log(`Duplicate schedule for ${day}`); //if schedule is duplicated
  };

  return (
    <div className="weekly-schedule-container">
      <div className="schedule-header">
        <div className="header-section">
          <h3>Activity</h3>
          <p className="text-light">Event type</p>
        </div>
        <div className="header-section">
          <h3>Time Zone</h3>
          <p className="text-primary">{timeZone}</p>
        </div>
      </div>
      
      <div className="schedule-divider"></div>
      
      <div className="weekly-hours-section">
        <h3>Weekly hours</h3>
        
        <div className="days-container">
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="day-row">
              <div className="day-checkbox">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={schedule[day].enabled} 
                    onChange={() => toggleDay(day)}
                  />
                  <span className="checkmark">
                    {schedule[day].enabled && <Check size={14} />}
                  </span>
                  {day}
                </label>
              </div>
              
              {day === 'Sun' && !schedule[day].enabled ? (
                <div className="unavailable-text">Unavailable</div>
              ) : (
                <div className="time-slots-container">
                  {schedule[day].enabled && schedule[day].slots.map((slot, index) => (
                    <div key={index} className="time-slot">
                      <input 
                        type="text" 
                        className="time-input" 
                        placeholder="9:00am" 
                        value={slot.start}
                        onChange={(e) => updateTimeSlot(day, index, 'start', e.target.value)}
                      />
                      <span className="time-separator">-</span>
                      <input 
                        type="text" 
                        className="time-input" 
                        placeholder="5:00pm" 
                        value={slot.end}
                        onChange={(e) => updateTimeSlot(day, index, 'end', e.target.value)}
                      />
                      
                      <button 
                        className="icon-button remove-button"
                        onClick={() => removeTimeSlot(day, index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {schedule[day].enabled && (
                    <div className="slot-actions">
                      <button 
                        className="icon-button add-button"
                        onClick={() => addTimeSlot(day)}
                      >
                        <Plus size={16} />
                      </button>
                      
                      <button 
                        className="icon-button duplicate-button"
                        onClick={() => duplicateDay(day)}
                      >
                        <div className="duplicate-icon"></div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckAvailability;
