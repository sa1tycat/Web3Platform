// ActivityInfoCard.js
import React, { useEffect, useState } from 'react';
import { Descriptions, Divider, Card, List, Button, Modal, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { fetchActivityDetails } from '../../../../API/fetchActivityDetails';
import BadgeForm from '../BadgeForm'; // 
import handleMintBadges from '../handleMintBadges';

const ActivityInfoCard = ({ activityID, onBack }) => {
  const [activityInfo, setActivityInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [badges, setBadges] = useState([]); // 状态用于存储所有徽章数据
  // const [ setBadgeArray] = useState([]); // 状态用于存储badgeArray

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

      /* console.log('传回的data',data); */
      // if (data.success) {
      //   message.success('所有徽章信息提交成功');
      if (data.success && data.badgesCreation) {
        const badgeArray = generateBadgeArray(users, data.badgesCreation);
        /* console.log('生成的徽章数组',badgeArray); */
        // setBadgeArray(data.badgesCreation);
        handleMintBadges(badgeArray,data.badgesCreation);
      } else {
        message.error('提交失败: ' + data.message);
      }
    } catch (error) {
      message.error('提交出错: ' + error.message);
    }
  };

  const generateBadgeArray = (users, badgesCreation) => {
    return badgesCreation.map((badge) => {
      const user = users.find(u => u.userID === badge.userID);
      if (!user) {
        console.warn(`No user found for userID ${badge.userID}`);
        return null;
      }
      return {
        badgeID: badge.badgeID,
        recipient: user.address,
        metadataURI: badge.badgeMetadataURI,
      };
    }).filter(Boolean); // 过滤掉任何可能出现的null值
  };

  return (
    <>
      <Card
    title={<h2 style={{ margin: 0 }}>{activityInfo?.Name}</h2>}
    extra={
      <>
        <Button onClick={handleSubmitBadges} style={{ marginRight: 8 }}>生成所有徽章</Button>
        <Button onClick={onBack}>返回</Button>
      </>
    }
    style={{ width: '100%' }} // 移除了高度限制，让它自然流动
    bodyStyle={{ padding: '20px' }} // 增加内边距
  >
    <Descriptions layout="horizontal" bordered column={1}>
      <Descriptions.Item label="开始时间">{moment(activityInfo?.StartTime).format('YYYY年MM月DD日 HH:mm')}</Descriptions.Item>
      <Descriptions.Item label="结束时间">{moment(activityInfo?.EndTime).format('YYYY年MM月DD日 HH:mm')}</Descriptions.Item>
      <Descriptions.Item label="简介">{activityInfo?.Description}</Descriptions.Item>
    </Descriptions>
    <Divider orientation="left">参与者</Divider>
    <List
      itemLayout="horizontal"
      dataSource={users}
      renderItem={user => (
        <List.Item actions={[<Button icon={<EditOutlined />} onClick={() => showModal(user)}>编辑徽章</Button>]}>
          <List.Item.Meta
            title={user.name}
            description={`学号：${user.studentID}`}
          />
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
