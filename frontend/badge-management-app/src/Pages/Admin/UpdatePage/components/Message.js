// Message.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Message.module.css';

const Message = ({ author, text }) => {
  const messageContainerClass = author === 'bot' ? styles.botContainer : styles.userContainer;
  const messageBubbleClass = author === 'bot' ? styles.botMessage : styles.userMessage;

  return (
    <div className={messageContainerClass}>
      <div className={messageBubbleClass}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
