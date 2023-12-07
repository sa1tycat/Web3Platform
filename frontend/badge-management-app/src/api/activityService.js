// src/api/activityService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // 根据您的服务器地址进行修改
});

const activityService = {
  async viewActivity(activityID) {
    try {
      const response = await apiClient.get('/viewActivity', { params: { activityID } });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
};

export default activityService;
