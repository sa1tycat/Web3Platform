import React, { useState } from 'react';
import alumniService from '../../api/alumniService';

function ViewBadges() {
  const [userID, setUserID] = useState('');
  const [message, setMessage] = useState('');

  const handleViewBadges = async () => {
    try {
      const response = await alumniService.viewBadges(userID);
      setMessage(JSON.stringify(response.badges));
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div>
      <input value={userID} onChange={e => setUserID(e.target.value)} placeholder="User ID" />
      <button onClick={handleViewBadges}>View Badges</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ViewBadges;
