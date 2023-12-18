import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { BackwardOutlined } from '@ant-design/icons';
import styles from '../styles/AppHeader.module.css';

const { Title } = Typography;

const AppHeader = ({ onBack }) => {
  return (
    <div className={styles.header}>
      <Button onClick={onBack} className={styles.backButton}><BackwardOutlined /></Button>
      <Row justify="center" align="middle">
        <Col>
          <Title level={2} className={styles.fancyTitle}>Gemini_Ai</Title>
        </Col>
      </Row>
    </div>
  );
};

export default AppHeader;
