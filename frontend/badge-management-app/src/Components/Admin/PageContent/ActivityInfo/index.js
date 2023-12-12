// ActivityInfoCard.js
import React, { useEffect, useState } from 'react';
import { Card, List, Button, Modal, message } from 'antd';
import moment from 'moment';
import { fetchActivityDetails } from '../../../../API/fetchActivityDetails';
import BadgeForm from '../BadgeForm'; // 确保路径正确

const ActivityInfoCard = ({ activityID, onBack }) => {
  const [activityInfo, setActivityInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [badges, setBadges] = useState([]); // 状态用于存储所有徽章数据

  useEffect(() => {
    fetchActivityDetails(activityID).then(data => {
      setActivityInfo(data.activityInfo);
      setUsers(data.users);
    });
  }, [activityID]);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = (badgeInfo) => {
    setBadges(prevBadges => {
      const index = prevBadges.findIndex(b => b.userID === badgeInfo.userID);
      if (index !== -1) {
        // 更新现有徽章信息
        const newBadges = [...prevBadges];
        newBadges[index] = badgeInfo;
        return newBadges;
      } else {
        // 添加新徽章信息
        return [...prevBadges, badgeInfo];
      }
    });
    handleCancel(); // 关闭模态框
  };

  const handleSubmitBadges = async () => {
    try {
      const response = await fetch('https://api.campusblock.space/api/admin/create-badges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          activityID,
          badges // 从状态中获取的更新后的徽章数组
        })
      });

      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();

      if (data.success) {
        message.success('所有徽章信息提交成功');
      } else {
        message.error('提交失败: ' + data.message);
      }
    } catch (error) {
      message.error('提交出错: ' + error.message);
    }
  };

  return (
    <>
      <Card
        title={activityInfo?.Name}
        extra={
          <>
            <Button onClick={handleSubmitBadges} style={{ marginRight: 8 }}>生成所有徽章</Button>
            <Button onClick={onBack}>返回</Button>
          </>
        }
        style={{ width: '100%', height: '100vh' }} 
      >
        <p>开始时间: {moment(activityInfo?.StartTime).format('YYYY年MM月DD日 HH:mm')}</p>
        <p>结束时间: {moment(activityInfo?.EndTime).format('YYYY年MM月DD日 HH:mm')}</p>
        <p>简介: {activityInfo?.Description}</p>
        <List
          header={<div>参与者</div>}
          bordered
          dataSource={users}
          renderItem={user => (
            <List.Item actions={[<Button onClick={() => showModal(user)}>编辑徽章</Button>]}>
              {user.name} - {user.studentID}
            </List.Item>
          )}
        />
      </Card>
      <Modal
        title="编辑徽章"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedUser && (
          <BadgeForm 
            activityInfo={activityInfo}
            user={selectedUser}
            onFormSubmit={handleFormSubmit}
          />
        )}
      </Modal>
    </>
  );
};

export default ActivityInfoCard;
