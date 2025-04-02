import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, Navigate } from 'react-router-dom';
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Booking.css';
import Header from './Header';
import axios from 'axios';
import { BASE_URL } from '../PreData/Properties';

const Booking = () => {
  const location = useLocation();
  const [events, setEvents] = useState({ upcoming: [], pending: [], past: [], rejected: [] });


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/event/my-events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data.events);
        toast.success('Events fetched successfully!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch events');
      }
    };

    fetchEvents();
  }, []);

  if (location.pathname === '/booking') {
    return <Navigate to="/booking/upcoming" replace />;
  }

  return (
    <>
    <ToastContainer />
      <Header
        title="Booking"
        subtitle="See upcoming and past events booked through your event type links."
      />
      <div className="booking-container">
        <div className="booking-tabs-container">
          <nav className="booking-tabs">
            <NavLink to="/booking/upcoming" className={({ isActive }) => `booking-tab ${isActive ? 'active' : ''}`}>Upcoming</NavLink>
            <NavLink to="/booking/pending" className={({ isActive }) => `booking-tab ${isActive ? 'active' : ''}`}>Pending</NavLink>
            <NavLink to="/booking/canceled" className={({ isActive }) => `booking-tab ${isActive ? 'active' : ''}`}>Canceled</NavLink>
            <NavLink to="/booking/past" className={({ isActive }) => `booking-tab ${isActive ? 'active' : ''}`}>Past</NavLink>
          </nav>
          <div className="booking-content">
            <Outlet context={{ events }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
