import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MasterList from '../components/MasterList';
import UserDrawer from '../components/ParticipantsList';

const Rejected = () => {
  const {  events } = useOutletContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleButtonClick = (type) => {
    console.log(`Button clicked: ${type}`);
  };



  return (
    <div>
      {events.rejected.length > 0 ? (
        events.rejected.map(event => (
          <MasterList
            key={event._id}
            date={new Date(event.date).toDateString()}
            time={`${event.timeStart} - ${event.timeEnd}`}
            title={event.eventTopic}
            subtitle={`Hosted by ${event.hostName}`}
            buttons={[
              { type: "rejected", text: "Rejected", onClick: () => handleButtonClick("rejected") },
            ]}
          
          />
        ))
      ) : (
        <p>No canceled events</p>
      )}
        

      <UserDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} users={selectedUsers} />
    </div>
  );
};

export default Rejected;
