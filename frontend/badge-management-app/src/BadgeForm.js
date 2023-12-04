// BadgeForm.js
import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const BadgeForm = ({ onBadgeCreate }) => {
  const [badge, setBadge] = useState({ title: '', description: '', attribute: '' });

  const handleChange = (value, name) => {
    setBadge({ ...badge, [name]: value });
  };

  const handleSubmit = () => {
    onBadgeCreate(badge);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input onChange={(e) => handleChange(e.target.value, 'title')} />
      </Form.Item>
      <Form.Item label="描述" name="description" rules={[{ required: true }]}>
        <Input.TextArea onChange={(e) => handleChange(e.target.value, 'description')} />
      </Form.Item>
      <Form.Item label="属性" name="attribute" rules={[{ required: true }]}>
        <Select onChange={(value) => handleChange(value, 'attribute')}>
          <Option value="形象">形象</Option>
          <Option value="表情">表情</Option>
          <Option value="配件">配件</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          创建徽章
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BadgeForm;
