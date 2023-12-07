import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const { Sider } = Layout;

const Navbar = () => {
  return (
    <Sider width={200} style={{ background: '#fff' }}> {/* 确保 Sider 的宽度与 AdminLayout 的 marginLeft 匹配 */}
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Link to="/admin">首页</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/admin/activity">活动管理</Link>
        </Menu.Item>
        {/* 更多导航项 */}
      </Menu>
    </Sider>
  );
};

export default Navbar;
