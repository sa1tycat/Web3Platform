import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'antd';
import moment from 'moment'; // 用于格式化日期
import { useNavigate } from 'react-router-dom';
import { getActivity } from '../../../API/getActivity';
import DeleteActivityButton from './DeleteActivityButton'

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getActivity().then(activitiesArray => {
      setActivities(activitiesArray); // 使用返回的数组更新状态
    });
  }, []);

  const handleNavigate = (activityId) => {
    // 使用activityId进行动态路由导航
    navigate(`/admin/activity/${activityId}`);
  };

  const handleDeleteSuccess = (activityId) => {
    // 过滤掉被删除的活动
    const filteredActivities = activities.filter(activity => activity.ActivityID !== activityId);
    setActivities(filteredActivities); // 更新状态
  };

  const cardStyle = {
    width: '100%',
    textAlign: 'center',
    minHeight: '100%', // 设置最小高度为100%
  };


  return (
    <Row gutter={[16, 16]} justify="start" align="stretch"> {/* 添加 align 属性 */}
      {activities.length > 0 ? activities.map((activity) => (
        <Col key={activity.ActivityID} xs={24} sm={12} lg={8} xl={6}>
          <Card
            hoverable
            style={cardStyle} // 应用自定义样式
            actions={[
              <Button key="edit" type="primary" onClick={() => handleNavigate(activity.ActivityID)}>编辑</Button>,
              <DeleteActivityButton key="delete" activityId={activity.ActivityID} onDeleteSuccess={handleDeleteSuccess} />
            ]}
          >
            <Card.Meta
              title={activity.Name}
              description={
                <>
                  <p>{activity.Description}</p>
                  <p>开始时间: {moment(activity.StartTime).format('YYYY年MM月DD日')}</p>
                  <p>结束时间: {moment(activity.EndTime).format('YYYY年MM月DD日')}</p>
                </>
              }
            />
          </Card>
        </Col>
      )) : <p>Loading activities...</p>}
    </Row>
  );
};

export default ActivityPage;