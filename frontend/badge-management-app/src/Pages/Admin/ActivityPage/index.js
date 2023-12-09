// import { Typography } from "antd";

// function ActivityPage() {
//     return (
//         <div>
//             <Typography.Title level={4}>ActivityPage</Typography.Title>
//         </div>
//     );
// }
// export default ActivityPage;
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import moment from 'moment'; // 用于格式化日期
import { getActivity } from '../../../API';


const ActivityPage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivity().then(activities => {
      setActivities(activities); // 这里 'activities' 已经是您需要的数组了
    }).catch(error => {
      // 错误处理
    });
  }, []);
  

  return (
    <Row gutter={[16, 16]}>
      {activities.map((activity) => (
        <Col key={activity.ActivityID} span={8}>
          <Card
            title={activity.Name}
            bordered={false}
            actions={[
              <Button key="edit" type="primary">编辑</Button>,
              <Button key="delete" type="danger">删除</Button>
            ]}
          >
            <p>{activity.Description}</p>
            <p>开始时间: {moment(activity.StartTime).format('YYYY年MM月DD日')}</p>
            <p>结束时间: {moment(activity.EndTime).format('YYYY年MM月DD日')}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ActivityPage;
