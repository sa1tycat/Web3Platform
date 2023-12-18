// BadgeForm.js
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;

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
          image: values.image,
          expression: values.expression,
          accessories: values.accessories,
          achievement: values.achievement,
          medal: values.medal,
          background: values.background
        }
      }
    };

    console.log("badgeinfo: ",badgeInfo );
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
      <Form.Item name="image" label="形象 (Image)" rules={[{ required: true }]}>
        <Select>
          <Option value="Freshman">大一鸽子 (Freshman)</Option>
          <Option value="Sophomore">大二鸽子 (Sophomore)</Option>
          <Option value="Junior">大三鸽子 (Junior)</Option>
          <Option value="Senior">大四鸽子 (Senior)</Option>
          <Option value="Postgraduate">研究生鸽子 (Postgraduate)</Option>
        </Select>
      </Form.Item>
      <Form.Item name="expression" label="表情 (Expression)" rules={[{ required: true }]}>
        <Select>
          <Option value="Smile">微笑 (Smile)</Option>
          <Option value="Neutral">正常 (Neutral)</Option>
          <Option value="Laughing">大笑 (Laughing)</Option>
          <Option value="Winking">眨眼 (Winking)</Option>
          <Option value="Excited">兴奋 (Excited)</Option>
          <Option value="Thinking">思考 (Thinking)</Option>
          <Option value="Surprised">惊讶 (Surprised)</Option>
          <Option value="Cool with Sunglasses">带墨镜的酷炫 (Cool with Sunglasses)</Option>
          <Option value="Laughing to Tears">笑到流泪 (Laughing to Tears)</Option>
        </Select>
      </Form.Item>
      <Form.Item name="accessories" label="配件 (Accessories)" rules={[{ required: true }]}>
  <Select>
    <Option value="Headphones">耳机 (Headphones)</Option>
    <Option value="Travel Bag">旅行背包 (Travel Bag)</Option>
    <Option value="Baseball Cap">棒球帽 (Baseball Cap)</Option>
    <Option value="Beanie">针织帽 (Beanie)</Option>
    <Option value="Sun Hat">遮阳帽 (Sun Hat)</Option>
    <Option value="Top Hat">礼帽 (Top Hat)</Option>
    <Option value="Work Cap">工作帽 (Work Cap)</Option>
    <Option value="Birthday Hat">生日帽 (Birthday Hat)</Option>
    <Option value="Crown">皇冠 (Crown)</Option>
    <Option value="Scarf">围巾 (Scarf)</Option>
    <Option value="Tie">领带 (Tie)</Option>
    <Option value="Bowtie">领结 (Bowtie)</Option>
  </Select>
</Form.Item>
<Form.Item name="achievement" label="成就 (Achievement)" rules={[{ required: true }]}>
  <Select>
    <Option value="Academy">学术之帽 (Academy)</Option>
    <Option value="Paper">论文 (Paper)</Option>
    <Option value="Sports">运动鞋 (Sports)</Option>
    <Option value="Music">乐器 (Music)</Option>
    <Option value="Art">艺术调色板 (Art)</Option>
    <Option value="Compass">指南针 (Compass)</Option>
    <Option value="Programming">编程之键 (Programming)</Option>
    <Option value="Social">社交花 (Social)</Option>
  </Select>
</Form.Item>
<Form.Item name="medal" label="徽章或勋章 (Medal)" rules={[{ required: true }]}>
  <Select>
    <Option value="Volunteer">社区服务勋章 (Volunteer)</Option>
    <Option value="Leader">领导力勋章 (Leader)</Option>
    <Option value="Innovator">创新勋章 (Innovator)</Option>
    <Option value="Cultural Heritage">文化传承勋章 (Cultural Heritage)</Option>
    <Option value="Health Advocate">健康倡导者勋章 (Health Advocate)</Option>
    <Option value="Mental Health Advocate">心理健康倡导者勋章 (Mental Health Advocate)</Option>
  </Select>
</Form.Item>
<Form.Item name="background" label="背景 (Background)" rules={[{ required: true }]}>
  <Select>
    <Option value="Bell Tower">钟楼 (Bell Tower)</Option>
    <Option value="Library">图书馆 (Library)</Option>
    <Option value="Playground">操场 (Playground)</Option>
    <Option value="Concert Hall">音乐厅 (Concert Hall)</Option>
    <Option value="Studio">工作室 (Studio)</Option>
    <Option value="Laboratory">实验室 (Laboratory)</Option>
    <Option value="Community Center">社区中心 (Community Center)</Option>
    <Option value="Starry Night">夜晚星空 (Starry Night)</Option>
  </Select>
</Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">保存</Button>
      </Form.Item>
    </Form>
  );
};

export default BadgeForm;
