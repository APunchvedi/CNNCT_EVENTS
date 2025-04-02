import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MasterList from "../components/MasterList";
import UserDrawer from "../components/ParticipantsList";
import { BASE_URL } from "../PreData/Properties";

const Pending = () => {
  const { events } = useOutletContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch token from localStorage or any auth state
  const token = localStorage.getItem("token"); // Make sure token is stored in localStorage

  const handleOpenDrawer = (participants) => {
    if (!Array.isArray(participants) || participants.length === 0) return;

    const users = participants.map((p, index) => ({
      id: p?.user?._id || `unknown-${index}`,
      name: `${p?.user?.firstname || "User"} ${p?.user?.lastname || ""}`.trim(),
      avatar:
        p?.user?.avatar ||
        `https://randomuser.me/api/portraits/men/${index % 100}.jpg`,
    }));

    setSelectedUsers(users);
    setIsDrawerOpen(true);
  };

  
  const handleResponse = async (eventId, response) => { //API for acceptanc/rejection
    try {
      const res = await axios.post(
        `${BASE_URL}/api/event/respond`,
        { eventId, response },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`Event ${response}ed successfully!`);
      console.log(res.data);
    } catch (error) {
      console.error("Error responding to event:", error);
      toast.error(`Failed to ${response} event. Please try again.`);
    }
  };

  return (
    <div>
      {events.pending.length > 0 ? (
        events.pending.map((event) => {
          const currentUserFirstName = event.user.firstname;

          const isUserInParticipants = event.participants.some(
            (p) => p.user?.firstname === currentUserFirstName
          );

          // Conditionally render buttons
          const buttons = !isUserInParticipants
            ? [
                {
                  type: "reject",
                  onClick: () => handleResponse(event._id, "reject"),
                },
                {
                  type: "accept",
                  onClick: () => handleResponse(event._id, "accept"),
                },
              ]
            : [];

          return (
            <MasterList
              key={event._id}
              date={new Date(event.date).toDateString()}
              time={`${event.timeStart} - ${event.timeEnd}`}
              title={event.eventTopic}
              subtitle={`Hosted by ${event.hostName}`}
              buttons={buttons} // Pass conditionally rendered buttons
              participantCount={event.participants?.length || 0}
              onParticipantClick={() => handleOpenDrawer(event.participants)}
            />
          );
        })
      ) : (
        <p>No upcoming events</p>
      )}

      <UserDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        users={selectedUsers.length > 0 ? selectedUsers : []} // Prevent passing undefined
      />
    </div>
  );
};

export default Pending;
