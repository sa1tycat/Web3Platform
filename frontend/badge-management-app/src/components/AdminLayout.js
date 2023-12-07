// src/components/AdminLayout.js
import React from 'react';
import { Layout } from 'antd';
import Navbar from './Admin/Navbar';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}> // 确保整个视图高度
      <Navbar />
      <Layout style={{ paddingLeft: 200, transition: 'all 0.2s' }}> // 调整内边距以适应Navbar
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: '24px 16px', // 添加上边距和侧边距
            minHeight: 280,
            overflow: 'initial', // 防止内容被截断
          }}
        >
          {children} // 这里将是页面内容
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
