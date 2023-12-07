// src/api/alumniService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // 请根据实际情况替换为您的后端服务地址
});
//下面对应alumniController.js
const alumniService = {
  async bindStudentId(DID, studentID) {
    try {
      const response = await apiClient.post('/bindStudentId', { DID, studentID });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
  
  async viewBadges(userID) {
    try {
      const response = await apiClient.get(`/viewBadges?userID=${userID}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
  
  async joinActivity(userID, activityID) {
    try {
      const response = await apiClient.post('/joinActivity', { userID, activityID });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
};

export default alumniService;
