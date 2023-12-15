import axios from 'axios';

const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText';

// 根据你的API密钥替换这里的内容
const API_KEY = 'AIzaSyDMV64sjMvfY2GWK-WFh7RUUTcVO3Sfduo';

export const sendMessage = async (message) => {
    const data = {
        prompt: { text: message }
    };
    console.log('data', data);

    const headers = {
        'Content-Type': 'application/json',
        // 其他可能需要的头部
    };

    try {
        const response = await axios.post(`${API_ENDPOINT}?key=${API_KEY}`, data, { headers });
        // 假设返回的JSON结构如你所示，我们返回第一个候选的输出
        const output = response.data.candidates[0].output;
        return output;
    } catch (error) {
        console.error('发送消息到API时发生错误:', error);
        throw error;
    }
};
