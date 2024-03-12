import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, message, Button } from 'antd';
import { useUser } from '../../contexts/UserContext'; // 确保路径正确
import getActivity from '../../API/getActivity'; // 确保路径正确
import { useNavigate } from 'react-router-dom';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const { user } = useUser(); // 使用 useUser 获取用户信息
  const navigate = useNavigate();

  useEffect(() => {
    // 页面加载时，检查是否存在 userID
    if (!user || !user.userID) {
      // 如果没有 userID，提示用户去登录，并提供一个登录按钮
      message.warning('请先登录', 5);
    } else {
      // 如果有 userID，则获取活动信息
      fetchActivities(user.userID);
    }
  }, [user]);

  const fetchActivities = (userID) => {
    getActivity(userID).then(data => {
      if (data && data.success) {
        setActivities(data.activities);
      } else {
        console.error(data.message || "Failed to fetch activities.");
      }
    });
  };

  const goToLogin = () => {
    // 导航到登录页面
    navigate('/alumni');
  };

  const cardStyle = {
    width: '100%',
    textAlign: 'center',
    minHeight: '100%',
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="start" align="stretch">
        {activities.length > 0 ? activities.map((activity) => (
          <Col key={activity.ActivityID} xs={24} sm={12} lg={8} xl={6}>
            <Card hoverable style={cardStyle}>
              <Card.Meta
                title={activity.Name}
                description={
                  <>
                    <p>{activity.Description}</p>
                    <p>开始时间: {new Date(activity.StartTime).toLocaleString()}</p>
                    <p>结束时间: {new Date(activity.EndTime).toLocaleString()}</p>
                    <p>{activity.isRegistered ? "已参加" : "未参加"}</p>
                    <p>{activity.isClosed ? "已截止" : "进行中"}</p>
                  </>
                }
              />
            </Card>
          </Col>
        )) : user && user.userID ? (
          <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
        ) : (
          <Button type="primary" onClick={goToLogin} style={{ display: 'block', margin: '20px auto' }}>
            前往登录
          </Button>
        )}
      </Row>
    </>
  );
};

export default ActivityPage;
