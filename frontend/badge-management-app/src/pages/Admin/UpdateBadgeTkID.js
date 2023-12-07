import React, { useState } from 'react';
import adminService from '../../api/adminService';

function UpdateBadgeTkID() {
  const [badges, setBadges] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateBadgeTkID = async () => {
    try {
      const response = await adminService.updateBadgeTkID(badges.split(','));
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <input value={badges} onChange={e => setBadges(e.target.value)} placeholder="Badges (comma separated)" />
      <button onClick={handleUpdateBadgeTkID}>Update Badge Token ID</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateBadgeTkID;
