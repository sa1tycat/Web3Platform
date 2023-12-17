// api/chatService.js
const API_BASE_URL = 'https://cc.wengjin.top/api/chat';

const initializeChat = async () => {
  const response = await fetch(`${API_BASE_URL}/initialize`, { method: 'POST' });
  return response.ok;
};

const sendMessage = async (message) => {
  const response = await fetch(`${API_BASE_URL}/send-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message })
  });
  if (response.ok) {
    const data = await response.json();
    return data.reply;
  } else {
    throw new Error('Network response was not ok.');
  }
};

export { initializeChat, sendMessage };
