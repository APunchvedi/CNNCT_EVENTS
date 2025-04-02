import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format, parse, addMinutes } from 'date-fns';
import Header from '../components/Header';
import Banner from "../assets/Images/Banner.svg";
import '../styles/CreateEvent.css';
import { BASE_URL } from '../PreData/Properties';

const AddEvent = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Step 1 data
    eventTopic: '',
    password: '',
    hostName: '',
    description: '',
    date: format(new Date(), 'dd/MM/yyyy'),
    time: '',
    meridiem: '',
    timezone: '',
    duration: '',
    // Step 2 data
    link: '',
    emails: '',
    backgroundColor: '',
    eventName: ''
  });

  const colorOptions = [
    { color: '#FF6600', name: 'Orange' },
    { color: '#00FF00', name: 'Green' },
    { color: '#808080', name: 'Gray' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error message for the field on change
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    if(name === 'date' || name === 'time' || name === 'meridiem' || name === 'timezone'){
      setErrors(prevErrors => ({ ...prevErrors, dateTime: '' }));
    }
    if(name === 'duration'){
      setErrors(prevErrors => ({ ...prevErrors, duration: '' }));
    }
  };

  const handleColorSelect = (color) => {
    setFormData(prevState => ({
      ...prevState,
      backgroundColor: color
    }));
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      eventTopic: '',
      password: '',
      hostName: 'Sarthak Pal',
      description: '',
      date: format(new Date(), 'dd/MM/yyyy'),
      time: '',
      meridiem: '',
      timezone: '',
      duration: '',
      link: '',
      emails: '',
      backgroundColor: '',
      eventName: ''
    });
    setErrors({});
    toast.info('Form cleared');
  };

  const handleCancel = () => {
    if (step === 2) {
      setStep(1);
      toast.info('Returning to previous step');
      return;
    }
    resetForm();
  };

  const handleNextStep = () => {
    const newErrors = {};
    if (!formData.eventTopic) {
      newErrors.eventTopic = 'Please add an event topic';
    }
    if (!formData.hostName) {
      newErrors.hostName = 'Please enter a host name';
    }
    if (!formData.date || !formData.time || !formData.meridiem || !formData.timezone) {
      newErrors.dateTime = 'Please complete the date and time fields';
    }
    if (!formData.duration) {
      newErrors.duration = 'Please select a duration';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  // Helper: convert duration string to minutes
  const getDurationMinutes = (durationStr) => {
    switch (durationStr) {
      case '30 mins':
        return 30;
      case '1 hour':
        return 60;
      case '1.5 hours':
        return 90;
      case '2 hours':
        return 120;
      case '3 hours':
        return 180;
      default:
        return 0;
    }
  };

  // Calculate timeEnd from date, time, meridiem, and duration
  const calculateTimeEnd = (dateStr, timeStr, meridiem, durationStr) => {
    const dateTimeString = `${dateStr} ${timeStr} ${meridiem}`;
    const parsedStart = parse(dateTimeString, 'dd/MM/yyyy hh:mm a', new Date());
    if (isNaN(parsedStart)) {
      return '';
    }
    const minutesToAdd = getDurationMinutes(durationStr);
    const endTime = addMinutes(parsedStart, minutesToAdd);
    return format(endTime, 'hh:mm a');
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.link) {
      newErrors.link = 'Please add a meeting link';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const timeEnd = calculateTimeEnd(formData.date, formData.time, formData.meridiem, formData.duration);
    const eventData = {
      eventTopic: formData.eventTopic,
      description: formData.description,
      date: formData.date,
      timeStart: `${formData.time} ${formData.meridiem}`,
      timeEnd, 
      hostName: formData.hostName,
      password: formData.password,
      link: formData.link,
      bannerImage: '',
      backgroundColor: formData.backgroundColor,
      status: 'upcoming'
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/event/create`, eventData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Event created successfully');
        resetForm();
      } else {
        toast.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Something went wrong');
    }
  };

  // Render form based on current step
  const renderForm = () => {
    if (step === 2) {
      return (
        <div className="event-form-container">
          <div className="form-group">
            <label className="banner-label">Banner</label>
            <div 
              className="banner-preview" 
              style={{ backgroundColor: formData.backgroundColor }}
            >
              <div className="banner-preview-content">
                <div className="banner-user-icon">
                  <img src={Banner} alt="Banner" className="banner" />
                </div>
                <div 
                  className="banner-preview-text"
                  style={{ color: formData.backgroundColor === '#000000' ? 'white' : 'black' }}
                >
                  {formData.eventName}
                </div>
              </div>
            </div>
            <label>Custom Background Color</label>
            <div className="color-picker">
              {colorOptions.map((option) => (
                <div
                  key={option.color}
                  className={`color-option ${formData.backgroundColor === option.color ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: option.color,
                    border: option.color === '#FFFFFF' ? '1px solid #ddd' : 'none'
                  }}
                  onClick={() => handleColorSelect(option.color)}
                  aria-label={`Select ${option.name} color`}
                />
              ))}
              <input
                type="text"
                name="backgroundColor"
                className="form-control color-input"
                value={formData.backgroundColor}
                onChange={handleInputChange}
                placeholder="#000000"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="link" className="required">Add Link</label>
            <input
              type="url"
              id="link"
              name="link"
              className="form-control"
              placeholder="Enter URL Here"
              value={formData.link}
              onChange={handleInputChange}
            />
            {errors.link && <div className="error-message">{errors.link}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="emails" className="required">Add Emails</label>
            <input
              type="text"
              id="emails"
              name="emails"
              className="form-control"
              placeholder="Add member Emails"
              value={formData.emails}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-outline" onClick={handleCancel}>
              Back
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      );
    } else if (step === 1) {
      return (
        <div className="event-form-container">
          <div className="form-row">
            <label htmlFor="eventTopic" className="required">Event Topic</label>
            <div className="input-container">
              <input
                type="text"
                id="eventTopic"
                name="eventTopic"
                className="form-control"
                placeholder="Set a conference topic before it starts"
                value={formData.eventTopic}
                onChange={handleInputChange}
              />
              {errors.eventTopic && <div className="error-message">{errors.eventTopic}</div>}
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="hostName" className="required">Host Name</label>
            <div className="input-container">
              <input
                type="text"
                id="hostName"
                name="hostName"
                className="form-control"
                placeholder="Enter host name"
                value={formData.hostName}
                onChange={handleInputChange}
              />
              {errors.hostName && <div className="error-message">{errors.hostName}</div>}
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <div className="input-container">
              <textarea
                id="description"
                name="description"
                className="form-control textarea-control"
                placeholder="Enter event description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="dateTime" className="required">Date and Time</label>
            <div className="date-time-container">
              <input
                type="text"
                id="date"
                name="date"
                className="form-control date-control"
                placeholder="dd/mm/yy"
                value={formData.date}
                onChange={handleInputChange}
              />
              <div className="time-controls-wrapper">
                <select
                  id="time"
                  name="time"
                  className="form-control time-control dropdown-control"
                  value={formData.time}
                  onChange={handleInputChange}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = i + 1;
                    return [0, 30].map(minute => {
                      const formattedMinute = minute.toString().padStart(2, '0');
                      return (
                        <option key={`${hour}:${minute}`} value={`${hour}:${formattedMinute}`}>
                          {`${hour}:${formattedMinute}`}
                        </option>
                      );
                    });
                  }).flat()}
                </select>
                <select
                  id="meridiem"
                  name="meridiem"
                  className="form-control ampm-control dropdown-control"
                  value={formData.meridiem}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <select
                  id="timezone"
                  name="timezone"
                  className="form-control timezone-control dropdown-control"
                  value={formData.timezone}
                  onChange={handleInputChange}
                >
                  <option value="">Select Timezone</option>
                  <option value="(UTC +5:00 Delhi)">(UTC +5:00 Delhi)</option>
                  <option value="(UTC +0:00 London)">(UTC +0:00 London)</option>
                  <option value="(UTC -5:00 New York)">(UTC -5:00 New York)</option>
                  <option value="(UTC -8:00 Los Angeles)">(UTC -8:00 Los Angeles)</option>
                  <option value="(UTC +9:00 Tokyo)">(UTC +9:00 Tokyo)</option>
                  <option value="(UTC +11:00 Sydney)">(UTC +11:00 Sydney)</option>
                  <option value="(UTC +2:00 CapeTown)">(UTC +11:00 CapeTown)</option>
                  <option value="(UTC +3:00 Moscow)">(UTC +3:00 Moscow)</option>
                  <option value="(UTC +4:00 Istanbul)">(UTC +4:00 Istanbul)</option>
                  <option value="(UTC +6:00 Bangkok)">(UTC +6:00 Bangkok)</option>
                  <option value="(UTC +7:00 Hong Kong)">(UTC +7:00 Hong Kong)</option>
                  <option value="(UTC +8:00 Beijing)">(UTC +8:00 Beijing)</option>
                  <option value="(UTC +9:30 Jayapura)">(UTC +9:30 Jayapura)</option>
                  <option value="(UTC +11:00 New Caledonia)">(UTC +11:00 New Caledonia)</option>
                  <option value="(UTC +12:00 Auckland)">(UTC +12:00 Auckland)</option>
                  <option value="(UTC +13:00 Nuku'alofa)">(UTC +13:00 Nuku'alofa)</option>
                  <option value="(UTC +14:00 Tonga)">(UTC +14:00 Tonga)</option>
                  <option value="(UTC +15:00 Papua New Guinea)">(UTC +15:00 Papua New Guinea)</option> 
                </select>
              </div>
              {errors.dateTime && <div className="error-message">{errors.dateTime}</div>}
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="duration">Set Duration</label>
            <div className="input-container">
              <select
                id="duration"
                name="duration"
                className="form-control duration-control dropdown-control"
                value={formData.duration}
                onChange={handleInputChange}
              >
                <option value="">Select Duration</option>
                <option value="30 mins">30 mins</option>
                <option value="1 hour">1 hour</option>
                <option value="1.5 hours">1.5 hours</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
              </select>
              {errors.duration && <div className="error-message">{errors.duration}</div>}
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-outline" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleNextStep}>
              Next
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Header
        title="Create Event"
        subtitle="Create events to share for people to book on your calendar."
      />
      <div className="event-container">
        <div className="event-card">
          <div className="event-header">
            <ToastContainer autoClose={3000} />
            <h2>Add Event</h2>
          </div>
          {renderForm()}
        </div>
      </div>
    </>
  );
};

export default AddEvent;