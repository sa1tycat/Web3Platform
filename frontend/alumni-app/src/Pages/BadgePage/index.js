import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { useSearchParams } from 'react-router-dom';
import  getBadges  from '../../API/getBadges'; // 假设这是获取徽章数据的API

const BadgesPage = () => {
  const [badges, setBadges] = useState([]);
  const [searchParams] = useSearchParams();
  const userID = searchParams.get('userID');

  useEffect(() => {
    if (userID) {
      getBadges(userID).then(data => {
        if (data && data.success) {
          setBadges(data.badges);
        } else {
          // 处理没有数据的情况
        }
      });
    }
  }, [userID]);

  const cardStyle = {
    width: '100%',
    textAlign: 'center',
    minHeight: '100%', // 设置最小高度为100%
  };

  return (
    <Row gutter={[16, 16]} justify="start" align="stretch"> {/* 保持样式一致性 */}
      {badges.length > 0 ? badges.map((badge) => (
        <Col key={badge.badgeID} xs={24} sm={12} lg={8} xl={6}>
          <Card
            hoverable
            style={cardStyle} // 应用自定义样式
            cover={<img alt="badge" src={badge.imageURL} />} // 显示图片
          >
            <Card.Meta
              title={badge.title}
              description={badge.description}
            />
          </Card>
        </Col>
      )) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          {/* 加载指示器或空状态提示 */}
        </div>
      )
      }
    </Row>
  );
};

export default BadgesPage;
