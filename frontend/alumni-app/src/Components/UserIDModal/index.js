// 文件: UserIDModal.js
import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const UserIDModal = ({ isVisible, onOk, onCancel }) => {
  const [inputUserID, setInputUserID] = useState('');

  const handleOk = () => {
    onOk(inputUserID);
  };

  return (
    <Modal
      title="Enter User ID"
      visible={isVisible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Input
        placeholder="User ID"
        value={inputUserID}
        onChange={(e) => setInputUserID(e.target.value)}
      />
    </Modal>
  );
};

export default UserIDModal;
