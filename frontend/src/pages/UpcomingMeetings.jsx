import React, {  useState } from "react";
import { useOutletContext } from "react-router-dom";
import MasterList from "../components/MasterList";
import UserDrawer from "../components/ParticipantsList";

const Upcoming = () => {
  const { events } = useOutletContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleOpenDrawer = (participants) => {
    console.log("Opening drawer with participants:", participants);
    if (!Array.isArray(participants) || participants.length === 0) return;
  
    const users = participants.map((p, index) => ({
      id: p?.user?._id || `unknown-${index}`,
      name: `${p?.user?.firstname || 'User'} ${p?.user?.lastname || ''}`.trim(),
      avatar: p?.user?.avatar || `https://randomuser.me/api/portraits/men/${index % 100}.jpg`,
    }));
  
    console.log("Mapped Users:", users);
    setSelectedUsers(users);
    setIsDrawerOpen(true);
  };
  

  console.log(selectedUsers);
  return (
    <div>
      {events.upcoming.length > 0 ? (
        events.upcoming.map((event) => (
          <MasterList
          key={event._id}
          date={new Date(event.date).toDateString()}
          time={`${event.timeStart} - ${event.timeEnd}`}
          title={event.eventTopic}
          subtitle={`Hosted by ${event.hostName}`}
          participantCount={event.participants?.length || 0}
          onParticipantClick={() => {
            handleOpenDrawer(event.participants);
          }}
        />
        
        ))
      ) : (
        <p>No upcoming events</p>
      )}
      
      <UserDrawer 
  isOpen={isDrawerOpen} 
  onClose={() => setIsDrawerOpen(false)} 
  users={selectedUsers.length > 0 ? selectedUsers : []} 
/>

    </div>
  );
};

export default Upcoming;
