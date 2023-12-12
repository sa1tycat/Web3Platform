// BadgeForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';

const BadgeForm = ({ activityInfo, user, onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // 构建单个用户的 badgeInfo
    const badgeInfo = {
      userID: user.userID,  // 确保 user 对象有 userID 字段
      badgeInfo: {
        title: values.title,
        description: values.description,
        attributes: {
          // 这里添加表单项以收集属性的值
        }
      }
    };

    onFormSubmit(badgeInfo); // 调用传入的 onFormSubmit 函数
    form.resetFields();      // 重置表单字段
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="徽章标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="描述" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      {/* 这里添加更多表单项以收集attributes的值 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">保存</Button>
      </Form.Item>
    </Form>
  );
};

export default BadgeForm;
