import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Modal, message } from 'antd';
import axios from 'axios';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.campusblock.space/api/admin/view-users');
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          message.error('获取用户列表失败: ' + response.data.message);
        }
      } catch (error) {
        console.error('获取用户列表出错:', error);
        message.error('获取用户列表出错');
      }
    };

    fetchUsers();
  }, []);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Row gutter={16}>
        {users.map((user) => (
          <Col key={user.userID} span={8}>
            <Card
              hoverable
              style={{ marginBottom: 16 }}
              onClick={() => showModal(user)}
            >
              <Card.Meta title={user.name} description={`学号: ${user.studentID}`} />
            </Card>
          </Col>
        ))}
      </Row>
      {selectedUser && (
        <Modal
          title="用户详情"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <p>userID: {selectedUser.userID}</p>
          <p>姓名: {selectedUser.name}</p>
          <p>学号: {selectedUser.studentID}</p>
          <p>DID: {selectedUser.DID}</p>
          <p>地址: {selectedUser.address}</p>
        </Modal>
      )}
    </>
  );
};

export default UserListPage;
