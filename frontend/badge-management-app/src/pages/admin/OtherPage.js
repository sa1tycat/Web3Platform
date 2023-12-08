// src/pages/admin/HomePage.js
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const HomePage = () => {
  return (
    <>
      <Title level={2}>其他</Title>
      {/* 此处放置其它首页内容 */
      <div>后面再加</div>}
    </>
  );
};

export default HomePage;
