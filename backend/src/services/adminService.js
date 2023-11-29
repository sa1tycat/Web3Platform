const activityModel = require('../models/ActivityModel');

// 创建活动
const createActivity = async (activityInfo) => {
  try {
    return await activityModel.createActivity(activityInfo);
  } catch (error) {
    console.error('Error in adminService.createActivity:', error);
    throw error;
  }
};

module.exports = {
  createActivity
};
