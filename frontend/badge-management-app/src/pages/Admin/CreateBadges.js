import React, { useState } from 'react';
import adminService from '../../api/adminService';

function CreateBadges() {
  const [activityID, setActivityID] = useState('');
  const [badges, setBadges] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateBadges = async () => {
    try {
      const response = await adminService.createBadges(activityID, badges.split(','));
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <input value={activityID} onChange={e => setActivityID(e.target.value)} placeholder="Activity ID" />
      <input value={badges} onChange={e => setBadges(e.target.value)} placeholder="Badges (comma separated)" />
      <button onClick={handleCreateBadges}>Create Badges</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateBadges;
