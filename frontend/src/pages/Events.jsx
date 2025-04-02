import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Card from "../components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Events.css"; // Import the CSS file
import { BASE_URL } from "../PreData/Properties";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(`${BASE_URL}/api/event/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setEvents(response.data);
        } else {
          throw new Error("Failed to fetch events.");
        }
      } catch (error) {
        setError(error.message || "Something went wrong.");
        toast.error(error.message || "Failed to fetch events.", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleEdit = (event) => {
    console.log("events page",event)
    navigate("/edit-event", { state: { eventData: event } });
  };

  
  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      await axios.delete(`${BASE_URL}/api/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));

    
      toast.success("Event deleted successfully!", { position: "top-right", autoClose: 2000 });
    } catch (error) {
    
      toast.error(error.message || "Failed to delete event.", { position: "top-right" });
    }
  };

  return (
    <div className="events-page">
      <ToastContainer />
      <Header
        title="Event Types"
        subtitle="Create events to share for people to book on your calendar."
        button={{
          label: "Add New Event",
          icon: "+",
          onClick: () => handleNavClick("/create") ,

        }}
      />

      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}

      <div className="events-container">
        {!loading &&
          events.map((event) => (
            <div key={event._id} className="event-card-wrapper">
              <Card
                title={event.eventTopic}
                date={new Date(event.date).toLocaleDateString()}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
                description={event.description}
                color={event.backgroundColor}
                onToggle={!!event.password}
                onDelete={() => handleDelete(event._id)} 
                onEdit={() => handleEdit(event)}
                onCopy={() => {
                  navigator.clipboard.writeText(event.link);
                  toast.success("Link copied to clipboard!", { position: "top-right", autoClose: 2000 });
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Events;