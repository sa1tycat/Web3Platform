const activityModel = require('../models/ActivityModel');

// 查看活动
const viewActivity = async (activityID) => {
  try {
    return await activityModel.viewActivity(activityID);
  } catch (error) {
    console.error('Error in activityService.viewActivity:', error);
    throw error;
  }
};

module.exports = {
  viewActivity
};
