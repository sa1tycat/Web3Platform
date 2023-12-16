// ChatBox.js
import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import Message from './Message';
import { useApiKey } from '../api/ApiKeyProvider';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SendOutlined } from '@ant-design/icons';
import styles from '../styles/ChatBox.module.css';


const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [chatSession, setChatSession] = useState(null);
  const API_KEY = useApiKey();

  useEffect(() => {
    if (API_KEY) { // 确保API密钥已获取
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        generationConfig: {
          maxOutputTokens: 10000,
        },
      });
      setChatSession(chat);
    }
  }, [API_KEY]); // 添加API_KEY作为依赖项

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { author: 'user', text: input };
    setMessages(m => [...m, userMessage]);

    if (chatSession) {
      try {
        const result = await chatSession.sendMessage(input);
        const response = await result.response;
        const botText = await response.text();
        const botMessage = { author: 'bot', text: botText };
        setMessages(m => [...m, botMessage]);
      } catch (error) {
        setMessages(m => [...m, { author: 'bot', text: '注意：敏感词！' }]);
      }
    }

    setInput('');
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
