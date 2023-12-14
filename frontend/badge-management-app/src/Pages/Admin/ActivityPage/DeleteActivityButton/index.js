// DeleteActivityButton.jsx
import React from 'react';
import { Button, message } from 'antd';
import axios from 'axios';

const DeleteActivityButton = ({ activityId, onDeleteSuccess }) => {
  const handleDelete = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.delete('https://api.campusblock.space/api/admin/delete-activity', {
      data: { activityID: activityId },
      ...config
    })
    .then(response => {
      if (response.data.success) {
        message.success(response.data.message || '活动删除成功！');
        onDeleteSuccess(activityId); // 调用传入的回调函数
      } else {
        message.error(response.data.message || '活动删除失败！');
      }
    })
    .catch(error => {
      message.error('删除活动失败：' + (error.response?.data.message || error.message));
    });
  };

  return (
    <Button type="danger" onClick={handleDelete}>删除</Button>
  );
};

export default DeleteActivityButton;
