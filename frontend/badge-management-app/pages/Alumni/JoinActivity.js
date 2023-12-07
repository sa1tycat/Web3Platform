import React, { useState } from 'react';
import apiService from '../../api/apiService';

function JoinActivity() {
  const [userID, setUserID] = useState('');
  const [activityID, setActivityID] = useState('');
  const [message, setMessage] = useState('');

  const handleJoinActivity = async () => {
    try {
      const response = await apiService.joinActivity(userID, activityID);
      setMessage(response.message);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div>
      <input value={userID} onChange={e => setUserID(e.target.value)} placeholder="User ID" />
      <input value={activityID} onChange={e => setActivityID(e.target.value)} placeholder="Activity ID" />
      <button onClick={handleJoinActivity}>Join Activity</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default JoinActivity;
