import React, { useState } from 'react';
import adminService from '../../api/adminService';

function CreateActivity() {
  const [activityInfo, setActivityInfo] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateActivity = async () => {
    try {
      const response = await adminService.createActivity({ activityInfo });
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <textarea value={activityInfo} onChange={e => setActivityInfo(e.target.value)} placeholder="Activity Info" />
      <button onClick={handleCreateActivity}>Create Activity</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateActivity;
