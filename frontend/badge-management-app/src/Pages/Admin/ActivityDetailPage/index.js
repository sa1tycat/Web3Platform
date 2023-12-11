import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, List, Row, Col, message } from 'antd';
import moment from 'moment';
import BadgeForm from '../../../Components/Admin/PageContent/BadgeForm'; // 确保路径正确
import { fetchActivityDetails } from '../../../API/fetchActivityDetails'

const ActivityDetailPage = () => {
  const { activityID } = useParams();
  const navigate = useNavigate();
  const [activityInfo, setActivityInfo] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchActivityDetails(activityID).then(data => {
      setActivityInfo(data.activityInfo);
      setUsers(data.users);
    }); // 不需要额外的catch，因为错误已在函数内部处理
  }, [activityID]);

  const handleFormSubmit = async (jsonPayload) => {
    try {
      const response = await fetch('https://api.campusblock.space/api/admin/create-badges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonPayload)
      });

      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();

      if (data.success) {
        message.success('徽章信息提交成功');
      } else {
        message.error('提交失败: ' + data.message);
      }
    } catch (error) {
      message.error('提交出错: ' + error.message);
    }
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        {activityInfo ? (
          <Card title={activityInfo.Name}>
            <p>开始时间: {moment(activityInfo.StartTime).format('YYYY年MM月DD日 HH:mm')}</p>
            <p>结束时间: {moment(activityInfo.EndTime).format('YYYY年MM月DD日 HH:mm')}</p>
            <p>简介: {activityInfo.Description}</p>
            <List
              header={<div>参与者</div>}
              bordered
              dataSource={users}
              renderItem={user => (
                <List.Item>
                  {user.name} - {user.studentID}
                </List.Item>
              )}
            />
            <Button onClick={() => navigate(-1)}>返回</Button>
          </Card>
        ) : (
          <p>Loading activity details...</p>
        )}
      </Col>
      <Col span={12}>
        {activityInfo && users.length > 0 && (
          <BadgeForm activityInfo={activityInfo} users={users} onFormSubmit={handleFormSubmit} />
        )}
      </Col>
    </Row>
  );
};

export default ActivityDetailPage;