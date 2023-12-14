// ActivityDetailPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActivityInfoCard from '../../../Components/Admin/PageContent/ActivityInfo';

const ActivityDetailPage = () => {
  const { activityID } = useParams();
  const navigate = useNavigate();

  return (
    <div className="PageContent"> {/* 确保这个类名匹配您的 CSS */}
      <ActivityInfoCard 
        activityID={activityID} 
        onBack={() => navigate(-1)}
      />
    </div>
  );
};

export default ActivityDetailPage;
