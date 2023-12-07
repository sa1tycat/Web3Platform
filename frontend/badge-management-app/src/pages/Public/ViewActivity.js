// src/pages/Public/ViewActivity.js
import React, { useState, useEffect } from 'react';
import activityService from '../../api/activityService';

function ViewActivity() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await activityService.viewAllActivities(); // 假设有一个方法来获取所有活动
        setActivities(response.activities);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h1>Activities</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <h2>{activity.name}</h2>
            <p>{activity.description}</p>
            {/* 其他活动信息 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewActivity;
