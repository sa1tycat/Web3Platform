// ChatBox.js
import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import Message from './Message';
import { SendOutlined } from '@ant-design/icons';
import styles from '../styles/ChatBox.module.css';
import { initializeChat, sendMessage } from '../api/chatService';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';


const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  useEffect(() => {
    // 初始化聊天会话
    const initChat = async () => {
      const initialized = await initializeChat();
      if (!initialized) {
        console.error('Chat initialization failed');
        // 处理初始化失败的情况，比如显示错误消息
      }
    };
    initChat();
  }, []);

  // 发送消息处理函数
  const handleSend = async () => {
    if (!input.trim()) return;
  
    // 添加用户消息到聊天列表
    const userMessage = { author: 'user', text: input };
    setMessages(messages => [...messages, userMessage]);
    setInput(''); // 清空输入框
  
    try {
      const reply = await sendMessage(input);
      // 添加机器人的答复到聊天列表
      const botMessage = { author: 'bot', text: reply };
      setMessages(messages => [...messages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // 在这里可以处理错误，比如显示一条错误消息
      setMessages(messages => [...messages, { author: 'bot', text: '通信错误，请稍后再试。' }]);
    }
  };
  return (
    <div className={styles.chatBox}>
      <AppHeader onBack={() => navigate(-1)} />
      <div className={styles.messageList}>
        {messages.map((msg, index) => (
          <Message key={index} author={msg.author} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputGroup}>
        <Input
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="输入消息"
        />
        <Button className={styles.sendButton} type="primary" onClick={handleSend}>
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
