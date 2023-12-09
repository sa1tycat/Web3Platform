import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'antd';
import moment from 'moment'; // 用于格式化日期
import { getActivity } from '../../../API';


const ActivityPage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivity().then(activitiesArray => {
      setActivities(activitiesArray); // 使用返回的数组更新状态
    });
  }, []);

  return (
    <Row gutter={[16, 16]} justify="start">
      {activities.length > 0 ? activities.map((activity) => (
        <Col key={activity.ActivityID} xs={24} sm={12} lg={8} xl={6}>
          <Card
            hoverable
            style={{ width: 240, textAlign: 'center' }} // 设置卡片宽度和文本居中
            actions={[
              <Button key="edit" type="primary">编辑</Button>,
              <Button key="delete" type="danger">删除</Button>
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
      )) : <p>Loading activities...</p>} {/* 当活动数组为空时显示加载提示 */}
    </Row>
  );
};

export default ActivityPage;
