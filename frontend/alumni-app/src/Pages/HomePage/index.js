import React from 'react';
import { useUser } from '../../contexts/UserContext'; // 确保路径正确
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useUser(); // 从上下文中获取用户信息
  const navigate = useNavigate();

  // 如果用户信息不存在或者name为空，提示用户登录
  React.useEffect(() => {
    if (!user || !user.name) {
      // 使用Ant Design的message组件显示提示信息
      message.warning('请先登录', 5);
      // 也可以选择在这里直接导航到登录页
      // navigate('/login');
    }
  }, [user, navigate]);

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div>
      {user && user.name ? (
        <h1>欢迎你，{user.name}</h1> // 显示欢迎信息和用户的名字
      ) : (
        <>
          <h1>欢迎来到我们的网站</h1> 
          <Button type="primary" onClick={goToLogin}>前往登录</Button>
        </>
      )}
    </div>
  );
};

export default HomePage;