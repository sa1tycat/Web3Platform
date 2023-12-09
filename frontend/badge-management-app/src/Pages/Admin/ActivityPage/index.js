import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import moment from 'moment'; // 用于格式化日期
// import 'antd/dist/antd.css'; // 确保Ant Design样式被导入

// 您直接定义的JSON数据中的活动数组
const activitiesData = [
    // ...这里是您的活动数据
    {
        "success": true,
        "activity": [
            {
                "ActivityID": 1,
                "Name": "测试活动",
                "Description": "test",
                "StartTime": "2023-11-10T16:00:00.000Z",
                "EndTime": "2023-12-11T16:00:00.000Z",
                "CreatedAt": "2023-11-28T01:06:07.000Z",
                "UpdatedAt": "2023-11-28T01:06:07.000Z"
            },
            {
                "ActivityID": 2,
                "Name": "测试活动2",
                "Description": "测试2",
                "StartTime": "2023-10-22T16:00:00.000Z",
                "EndTime": "2023-12-24T16:00:00.000Z",
                "CreatedAt": "2023-11-28T02:54:03.000Z",
                "UpdatedAt": "2023-11-28T02:54:23.000Z"
            },
            {
                "ActivityID": 3,
                "Name": "post上传测试活动",
                "Description": "test",
                "StartTime": "2023-11-09T16:00:00.000Z",
                "EndTime": "2023-12-11T16:00:00.000Z",
                "CreatedAt": "2023-11-29T00:57:43.000Z",
                "UpdatedAt": "2023-11-29T00:57:43.000Z"
            },
            {
                "ActivityID": 4,
                "Name": "书法大赛",
                "Description": "为了提高大家书写，特此举办书法大赛。",
                "StartTime": "2023-10-09T16:00:00.000Z",
                "EndTime": "2023-12-21T16:00:00.000Z",
                "CreatedAt": "2023-12-05T02:41:16.000Z",
                "UpdatedAt": "2023-12-05T02:41:16.000Z"
            }
        ],
        "message": "Activities retrieved successfully"
    }
];

const ActivityCards = () => {
  // 从JSON数据中提取activity数组
  const activities = activitiesData[0].activity;

  return (
    <Row gutter={[16, 16]} justify="start">
      {activities.map((activity) => (
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
      ))}
    </Row>
  );
};

export default ActivityCards;
