import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import Message from './Message';
// import Back from './Back';
import { sendMessage } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { SendOutlined, LeftOutlined } from '@ant-design/icons';
import styles from '../styles/ChatBox.module.css';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  let navigate = useNavigate();

  // 当新消息添加时滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息处理函数
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { author: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
        const botResponse = await sendMessage(input);
        const botMessage = { author: 'bot', text: botResponse };
        setMessages(m => [...m, botMessage]);
    } catch (error) {
        // 在这里处理错误，例如可以设置一个错误消息
        setMessages(m => [...m, { author: 'bot', text: '注意：敏感词和中文无法识别！' }]);
    }
};

return (
    <div className={styles.chatBox}>
      {/* <Back />; */}
      {/* 返回按钮 */}
        <Button className={styles.backButton} type="primary" onClick={() => navigate(-1)} >
          <LeftOutlined />
        </Button>  
      <div className={styles.messageList}>
        {messages.map((msg, index) => (
          <Message key={index} author={msg.author} text={msg.text} />
        ))}
        {/* 滚动到底部的锚点 */}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputGroup}>
      <Input
        className={styles.input}
        value={input}
        onChange={e => setInput(e.target.value)}
        onPressEnter={handleSend}
        placeholder="English plz~"
      />
      <Button className={styles.sendButton} type="primary" onClick={handleSend}>
        <SendOutlined />
      </Button>
    </div>
    </div>
  );
};

export default ChatBox;
