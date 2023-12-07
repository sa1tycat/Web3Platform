import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // 根据您的服务器地址进行修改
});

const adminService = {
  // 创建活动
  async createActivity(activityInfo) {
    try {
      const response = await apiClient.post('/createActivity', { activityInfo });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // 查看活动参与者
  async viewActivityParticipants(activityID) {
    try {
      const response = await apiClient.get(`/viewActivityParticipants`, { params: { activityID } });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // 创建徽章
  async createBadges(activityID, badges) {
    try {
      const response = await apiClient.post('/createBadges', { activityID, badges });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // 更新徽章 tokenID
  async updateBadgeTkID(badges) {
    try {
      const response = await apiClient.post('/updateBadgeTkID', { badges });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // 颁发徽章
  async distributeBadges(distributions) {
    try {
      const response = await apiClient.post('/distributeBadges', { distributions });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
};

export default adminService;
