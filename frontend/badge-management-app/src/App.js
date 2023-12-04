// App.js
import React from 'react';
import BadgeForm from './BadgeForm';
import AlumniSelector from './AlumniSelector';
import { Layout, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const handleBadgeCreate = (badgeData) => {
    console.log('Badge Created:', badgeData);
    // 这里可以调用API发送徽章数据
  };

  const handleAlumniSelect = (selectedAlumni) => {
    console.log('Selected Alumni:', selectedAlumni);
    // 这里可以处理校友选择逻辑
  };

  return (
    <Layout>
      <Header>
        <Title style={{ color: '#fff' }}>徽章管理系统</Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <BadgeForm onBadgeCreate={handleBadgeCreate} />
        <AlumniSelector onAlumniSelect={handleAlumniSelect} />
      </Content>
    </Layout>
  );
}

export default App;
