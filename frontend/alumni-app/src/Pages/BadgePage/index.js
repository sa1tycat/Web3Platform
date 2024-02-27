import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import getBadges from '../../API/getBadges';
import UserIDModal from '../../Components/UserIDModal';

const BadgesPage = () => {
  const [badges, setBadges] = useState([]);
//   const [inputUserID, setInputUserID] = useState(''); // 用户输入的userID
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框的显示
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userID = searchParams.get('userID');

  useEffect(() => {
    if (!userID) {
      setIsModalVisible(true); // 如果没有userID，则显示模态框
    } else {
      fetchBadges(userID); // 如果有userID，则获取徽章数据
    }
  }, [userID]);

  const fetchBadges = (userID) => {
    getBadges(userID).then(data => {
      if (data && data.success) {
        setBadges(data.badges);
      } else {
        // 处理没有数据的情况
      }
    });
  };

  const handleModalOk = (inputUserID) => {
    setIsModalVisible(false);
    navigate(`/alumni/view-badges?userID=${inputUserID}`); // 使用输入的userID重定向
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const cardStyle = {
    width: '100%',
    textAlign: 'center',
    minHeight: '100%',
  };

  return (
    <>
      <UserIDModal
        isVisible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
      <Row gutter={[16, 16]} justify="start" align="stretch">
        {badges.length > 0 ? badges.map((badge) => (
          <Col key={badge.badgeID} xs={24} sm={12} lg={8} xl={6}>
            <Card
              hoverable
              style={cardStyle}
              cover={<img alt="badge" src={badge.imageURL} />}
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
        )}
      </Row>
    </>
  );
};

export default BadgesPage;
