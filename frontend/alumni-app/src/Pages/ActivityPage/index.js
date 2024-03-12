import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, message, Button } from 'antd';
import { useUser } from '../../contexts/UserContext'; // 确保路径正确
import getActivity from '../../API/getActivity'; // 确保路径正确
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const { user } = useUser(); // 使用 useUser 获取用户信息
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userID) {
      fetchActivities(user.userID);
    } else {
      message.warning('请先登录', 5);
      // 提示后也提供一个登录按钮
    }
  }, [user]);

  const fetchActivities = async (userID) => {
    const data = await getActivity(userID); // 假设getActivity是异步的
    if (data && data.success) {
      setActivities(data.activities);
    } else {
      console.error(data.message || "Failed to fetch activities.");
    }
  };

  const handleJoinActivity = async (activityID) => {
    try {
      const response = await axios.post('https://api.campusblock.space/api/alumni/join-activity', {
        userID: user.userID,
        activityID,
      });

      if (response.data.success) {
        message.success(response.data.message);
        // 更新活动状态为已注册
        setActivities(activities.map(activity =>
          activity.ActivityID === activityID ? { ...activity, isRegistered: true } : activity
        ));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to join activity:', error);
      message.error('参加活动失败');
    }
  };

  const goToLogin = () => {
    navigate('/alumni');
  };

  const cardStyle = {
    width: '100%',
    textAlign: 'center',
    minHeight: '100%',
  };

  return (
    <>
      {!user || !user.userID ? (
        <Button type="primary" onClick={goToLogin} style={{ margin: '20px 0', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
          前往登录
        </Button>
      ) : (
        <Row gutter={[16, 16]} justify="start" align="stretch">
          {activities.length > 0 ? activities.map((activity) => (
            <Col key={activity.ActivityID} xs={24} sm={12} lg={8} xl={6}>
              <Card
                hoverable
                style={cardStyle}
                actions={[
                  <Button 
                    disabled={activity.isRegistered || activity.isClosed} 
                    onClick={() => handleJoinActivity(activity.ActivityID)}>
                    {activity.isRegistered ? '已参加' : activity.isClosed ? '已截止' : '参加活动'}
                  </Button>
                ]}
              >
                <Card.Meta
                  title={activity.Name}
                  description={
                    <>
                      <p>{activity.Description}</p>
                      <p>开始时间: {new Date(activity.StartTime).toLocaleString()}</p>
                      <p>结束时间: {new Date(activity.EndTime).toLocaleString()}</p>
                      <p>{activity.isClosed ? "已截止" : "进行中"}</p>
                    </>
                  }
                />
              </Card>
            </Col>
          )) : (
            <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
          )}
        </Row>
      )}
    </>
  );
};

export default ActivityPage;
