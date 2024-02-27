import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserIDModal from '../../Components/UserIDModal';
import getActivity from '../../API/getActivity'; // 确保路径正确

const ActivityPage = () => {
  const [activities, setActivities] = useState([]); // 用于存储活动信息
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框的显示
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userID = searchParams.get('userID');

  useEffect(() => {
    // 页面加载时，如果没有 userID，则显示模态框
    if (!userID) {
      setIsModalVisible(true);
    } else {
      // 如果有 userID，则获取活动信息
      fetchActivities(userID);
    }
  }, [userID]);

  // 从后端获取活动信息
  const fetchActivities = (userID) => {
    console.log(`Fetching badges for userID: ${userID}`);
    getActivity(userID).then(data => {
      if (data && data.success) {
        setActivities(data.activities);
      } else {
        // 处理没有数据的情况
        console.error(data.message || "Failed to fetch activities.");
      }
    });
  };

  // 处理模态框的确认操作
  const handleModalOk = (inputUserID) => {
    setIsModalVisible(false);
    navigate(`/alumni/view-activities?userID=${inputUserID}`); // 重定向并附带用户输入的 userID
  };

  // 处理模态框的取消操作
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
        {activities.map((activity) => (
          <Col key={activity.ActivityID} xs={24} sm={12} lg={8} xl={6}>
            <Card
              hoverable
              style={cardStyle}
            >
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
        ))}
      </Row>
    </>
  );
};

export default ActivityPage;