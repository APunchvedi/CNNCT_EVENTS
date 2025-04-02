import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MasterList from '../components/MasterList';
import UserDrawer from '../components/ParticipantsList';

const Past = () => {
  const {  events } = useOutletContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  console.log(events);

  const handleOpenDrawer = (participants) => {
    setSelectedUsers(participants.map(p => ({
      id: p.user._id,
      name: `User ${p.user._id}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
    })));
    setIsDrawerOpen(true);
  };

  return (
    <div>
      {events.past.length > 0 ? (
        events.past.map(event => (
          <MasterList
            key={event._id}
            date={new Date(event.date).toDateString()}
            time={`${event.timeStart} - ${event.timeEnd}`}
            title={event.eventTopic}
            subtitle={`Hosted by ${event.hostName}`}
            // participantCount={event.participants.length}
            // onParticipantClick={() => handleOpenDrawer(event.participants)}
          />
        ))
      ) : (
        <p>No past events</p>
      )}

      <UserDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} users={selectedUsers} />
    </div>
  );
};

export default Past;
