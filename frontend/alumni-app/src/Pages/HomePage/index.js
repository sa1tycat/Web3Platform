


import React from 'react';
import { useUser } from '../../contexts/UserContext'; // 确保路径正确
import { Typography, Card, Row, Col } from 'antd';

const { Title, Text } = Typography;

const HomePage = () => {
  const { user } = useUser(); // 从上下文中获取用户信息

  return (
    <div style={{ padding: '20px' }}>
      {user ? (
        <Row justify="center">
          <Col span={12}>
            <Card hoverable style={{ textAlign: 'center', borderRadius: '20px' }}>
              <Title level={2} style={{ color: '#1890ff' }}>欢迎你，{user.name}</Title>
              <p style={{ fontSize: '16px', fontStyle: 'italic' }}>学号: {user.studentID}</p >
              <Text strong>DID: {user.DID}</Text>
              <br />
              <Text copyable>{user.address}</Text>
            </Card>
          </Col>
        </Row>
      ) : (
        <Title level={3} style={{ textAlign: 'center' }}>请先登录</Title>
      )}
    </div>
  );
};

export default HomePage;