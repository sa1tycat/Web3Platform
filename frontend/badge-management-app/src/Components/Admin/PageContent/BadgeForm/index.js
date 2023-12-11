import React from 'react';
import { Form, Input, Button } from 'antd';

const BadgeForm = ({ activityInfo, users, onFormSubmit }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // 构建您的JSON结构，包括activityID和badges数组
    const jsonPayload = {
      activityID: activityInfo.ActivityID,
      badges: users.map(user => ({
        userID: user.userID,
        badgeInfo: {
          title: values.title,
          description: values.description,
          attributes: {
            // 这里添加表单项以收集属性的值
          }
        }
      }))
    };

    // 执行提交操作
    onFormSubmit(jsonPayload);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="徽章标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="描述" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="description" label="描述" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      {/* 这里添加更多表单项以收集attributes的值 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">提交徽章信息</Button>
      </Form.Item>
    </Form>
  );
};

export default BadgeForm;