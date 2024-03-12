import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import axios from 'axios';
import { message } from 'antd';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 确保MetaMask钱包可用
  if (!window.ethereum) {
    message.error('请安装MetaMask!');
    return;
  }

  // 初始化Web3
  const web3 = new Web3(window.ethereum);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // 请求用户授权连接MetaMask钱包
      const accounts = await web3.eth.requestAccounts();
      const account = accounts[0];
      console.log('用户账户:', account);

      // 请求登录消息
      const messageResponse = await axios.get('https://api.campusblock.space/api/auth/login/request-message');
      console.log('登录消息响应:', messageResponse.data);

      if (!messageResponse.data.success) {
        throw new Error(messageResponse.data.message || '获取登录消息失败');
      }

      const { loginID, msg } = messageResponse.data;

      // 用户使用MetaMask签名消息
      const signature = await web3.eth.personal.sign(msg, account, '');
      console.log('签名:', signature);

      // 向后端发送签名进行验证
      const verifyResponse = await axios.post('https://api.campusblock.space/api/auth/login/verify-signature', {
        loginID,
        signature,
        address: account,
      });

      console.log('验证签名响应:', verifyResponse.data);

      if (verifyResponse.data.success) {
        const { jwt } = verifyResponse.data;
        // 保存JWT
        localStorage.setItem('jwt', jwt);

        message.success('登录成功！');
        navigate('/home'); // 假设登录后要跳转到的路由为 /home
      } else {
        throw new Error(verifyResponse.data.message || '签名验证失败');
      }
    } catch (error) {
      console.error('登录失败:', error);
      message.error(error.message || '登录过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading || !window.ethereum}>
        {loading ? '登录中...' : '通过MetaMask登录'}
      </button>
    </div>
  );
}

export default Login;
