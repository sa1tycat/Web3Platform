import React, { useState } from 'react';
import LoginModule from './LoginModule';
import RegisterModule from './RegisterModule';
import { Layout, Row, Col } from 'antd';


const { Content } = Layout;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Row justify="center" style={{ minHeight: '70vh' }}>
          <Col span={8} style={{ textAlign: 'center' }}>
            {/* 传递loading状态给子组件，用以控制按钮loading效果 */}
            <br /><br /> <br /><br /> <br /><br /> <br /><br /> 
            <LoginModule setLoading={setLoading} loading={loading} />
            <br /><br /> <br /><br /> <br /><br /> 
            <RegisterModule setLoading={setLoading} loading={loading} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginPage;