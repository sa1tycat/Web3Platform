// src/components/AdminLayout.js
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'; // 引入Outlet
import Navbar from './Admin/Navbar';

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout hasSider>
      <Navbar />
      <Layout>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Outlet /> {/* 这里将渲染子路由 */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
