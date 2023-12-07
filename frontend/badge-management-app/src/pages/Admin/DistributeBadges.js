import React, { useState } from 'react';
import adminService from '../../api/adminService';

function DistributeBadges() {
  const [distributions, setDistributions] = useState('');
  const [message, setMessage] = useState('');

  const handleDistributeBadges = async () => {
    try {
      const response = await adminService.distributeBadges(distributions.split(','));
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <input value={distributions} onChange={e => setDistributions(e.target.value)} placeholder="Distributions (comma separated)" />
      <button onClick={handleDistributeBadges}>Distribute Badges</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DistributeBadges;
