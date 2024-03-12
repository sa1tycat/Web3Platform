import React from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { message, Button } from 'antd';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginModule = ({ loading, setLoading }) => {
  const { login } = useUser();
  const navigate = useNavigate();
  const web3 = new Web3(window.ethereum);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const accounts = await web3.eth.requestAccounts();
      const account = accounts[0];

      const messageResponse = await axios.get('https://api.campusblock.space/api/auth/login/request-message');

      if (!messageResponse.data.success) {
        throw new Error(messageResponse.data.message || '获取登录消息失败');
      }

      const { loginID, msg } = messageResponse.data;
      const signature = await web3.eth.personal.sign(msg, account, '');

      const verifyResponse = await axios.post('https://api.campusblock.space/api/auth/login/verify-signature', {
        loginID,
        signature,
        address: account,
      });

      if (verifyResponse.data.success) {
        const jwtToken = verifyResponse.data.jwt;
        login(jwtToken);
        message.success('登录成功！');
        navigate('/alumni');
      } else {
        throw new Error(verifyResponse.data.message || '签名验证失败');
      }
    } catch (error) {
      message.error(error.message || '登录过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="primary" onClick={handleLogin} loading={loading} block>
  {loading ? '登录中...' : '通过MetaMask登录'}
</Button>
  );
};

export default LoginModule;
