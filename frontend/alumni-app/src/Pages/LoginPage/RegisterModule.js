import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import Web3 from 'web3';
import axios from 'axios';

const RegisterModule = ({ loading, setLoading }) => {
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const web3 = new Web3(window.ethereum);

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleCancelRegister = () => {
    setIsRegisterModalVisible(false);
  };

  const handleRegister = async (values) => {
    setIsRegisterModalVisible(false);
    setLoading(true);
    try {
      const accounts = await web3.eth.requestAccounts();
      const account = accounts[0];
      const messageToSign = `${values.name}|${values.studentID}|${values.DID}|${account}`;
      const signature = await web3.eth.personal.sign(messageToSign, account, '');

      const response = await axios.post('https://api.campusblock.space/api/auth/register', {
        name: values.name,
        studentID: values.studentID,
        DID: values.DID,
        address: account,
        signature,
      });

      if (response.data.success) {
        message.success('注册成功！');
      } else {
        message.error('注册失败: ' + response.data.message);
      }
    } catch (error) {
      message.error(error.message || '注册过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showRegisterModal} disabled={loading || !window.ethereum} block>
  注册
</Button>

      <Modal title="注册" visible={isRegisterModalVisible} onCancel={handleCancelRegister} footer={null}>
        <Form onFinish={handleRegister}>
          <Form.Item name="name" rules={[{ required: true, message: '请输入姓名!' }]}>
            <Input placeholder="姓名" />
          </Form.Item>
          <Form.Item name="studentID" rules={[{ required: true, message: '请输入学号!' }]}>
            <Input placeholder="学号" />
          </Form.Item>
          <Form.Item name="DID" rules={[{ required: true, message: '请输入自定义DID!' }]}>
            <Input placeholder="自定义DID" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交注册
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterModule;
