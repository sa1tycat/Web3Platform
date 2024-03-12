import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, message, Button } from 'antd';
import { useUser } from '../../contexts/UserContext'; // 确保路径正确
import getBadges from '../../API/getBadges'; // 确保路径正确
import { useNavigate } from 'react-router-dom';

const BadgesPage = () => {
  const [badges, setBadges] = useState([]);
  const { user } = useUser(); // 使用useUser获取用户信息
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.userID) {
      // 如果没有userID，提示用户去登录
      message.warning('请先登录', 5);
    } else {
      // 如果有userID，则获取徽章数据
      fetchBadges(user.userID);
    }
  }, [user]);

  const fetchBadges = (userID) => {
    getBadges(userID).then(data => {
      if (data && data.success) {
        setBadges(data.badges);
      } else {
        console.error(data.message || "Failed to fetch badges.");
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
        {badges.length > 0 ? badges.map((badge) => (
          <Col key={badge.badgeID} xs={24} sm={12} lg={8} xl={6}>
            <Card hoverable style={cardStyle} cover={<img alt="badge" src={badge.imageURL} />}>
              <Card.Meta title={badge.title} description={badge.description} />
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

export default BadgesPage;
