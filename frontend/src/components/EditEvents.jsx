import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Setting.css";
import { BASE_URL } from "../PreData/Properties";
import Header from "./Header";
import { Input, Button } from "antd";

const { TextArea } = Input;

const EditEvents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.eventData || {};

  const [formData, setFormData] = useState({
    title: event.eventTopic || "",
    date: event.date ? new Date(event.date).toISOString().slice(0, 10) : "",
    timeStart: event.timeStart || "",
    timeEnd: event.timeEnd || "",
    description: event.description || "",
   
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { title, date, timeStart, timeEnd, description, password } = formData;
    if (!title || !date || !timeStart || !timeEnd || !description || !password) {
      toast.error("All fields are required");
      return false;
    }
    if (new Date(`1970-01-01T${timeEnd}`) <= new Date(`1970-01-01T${timeStart}`)) {
      toast.error("End time must be after start time");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `${BASE_URL}/api/event/update/${event._id}`,
        {
          eventTopic: formData.title,
          date: formData.date,
          timeStart: formData.timeStart,
          timeEnd: formData.timeEnd,
          description: formData.description,
          password: formData.password,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Event updated successfully");
      navigate("/events");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="Edit Event" subtitle="Modify event details" />
      <div className="container">
        <div className="profile-card">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-field">
              <label htmlFor="title">Title</label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-field">
              <label htmlFor="date">Date</label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-field">
              <label htmlFor="timeStart">Time Start</label>
              <Input id="timeStart" name="timeStart" type="time" value={formData.timeStart} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-field">
              <label htmlFor="timeEnd">Time End</label>
              <Input id="timeEnd" name="timeEnd" type="time" value={formData.timeEnd} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <TextArea id="description" name="description" rows={5} value={formData.description} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-actions">
              <Button type="primary" htmlType="submit" loading={isLoading} className="save-button">Save</Button>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default EditEvents;