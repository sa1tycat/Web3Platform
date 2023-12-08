// src/pages/admin/HomePage.js
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const HomePage = () => {
  return (
    <>
      <Title level={2}>首页</Title>
      {/* 此处放置其它首页内容 */
      <div>这里写首页的内容</div>}
    </>
  );
};

export default HomePage;
