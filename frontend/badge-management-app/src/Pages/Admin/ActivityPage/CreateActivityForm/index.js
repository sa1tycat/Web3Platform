import React from 'react';
import { Form, Input, Button, DatePicker, Card, message } from 'antd';
import axios from 'axios';

const CreateActivityForm = ({ onClose }) => {
    const [form] = Form.useForm();
  
    const onFinish = async (values) => {
        const activityInfo = {
          name: values.name,
          description: values.description,
          startTime: values.startTime.format('YYYY-MM-DD'), // 使用 moment 格式化日期
          endTime: values.endTime.format('YYYY-MM-DD'), // 使用 moment 格式化日期
        };
      
        try {
          const response = await axios.post('https://api.campusblock.space/api/admin/create-activity', { activityInfo });
          if (response.data.success) {
            message.success('活动创建成功！');
            form.resetFields(); // 重置表单字段
            // 如果您有状态或上下文管理活动列表，这里是更新活动列表的好地方
            // 比如：setActivities([...activities, response.data.activity])
            onClose(); // 假设 onClose 是一个 prop，用于关闭表单或清除创建活动的 UI
          } else {
            message.error(response.data.message || '创建活动失败！');
          }
        } catch (error) {
          console.error('创建活动失败：', error);
          message.error(error.response?.data?.message || '创建活动时发生错误！');
        }
      };
      
  
    return (
        <Card title="创建活动详情" bordered={false}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Form Items */}
            <Form.Item name="name" label="活动名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="活动描述" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="startTime" label="开始时间" rules={[{ required: true }]}>
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="endTime" label="结束时间" rules={[{ required: true }]}>
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">创建活动</Button>
            </Form.Item>
          </Form>
        </Card>
      );
  };
  
  export default CreateActivityForm;
  