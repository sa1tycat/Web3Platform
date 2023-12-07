import React, { useState } from 'react';
import adminService from '../../api/adminService';

function ViewActivityParticipants() {
  const [activityID, setActivityID] = useState('');
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState('');

  const handleViewParticipants = async () => {
    try {
      const response = await adminService.viewActivityParticipants(activityID);
      setParticipants(response.users);
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <input value={activityID} onChange={e => setActivityID(e.target.value)} placeholder="Activity ID" />
      <button onClick={handleViewParticipants}>View Participants</button>
      {participants.length > 0 && (
        <ul>
          {participants.map(participant => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ViewActivityParticipants;
