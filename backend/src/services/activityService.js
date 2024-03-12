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

// 查看所有活动及状态
const viewActivitiesWithStatus = async (userID) => {
  try {
    // 获取所有活动
    const activities = await activityModel.viewActivity();

    // 检查用户是否已报名参加每个活动
    for (const activity of activities) {
      // 检查活动是否已结束
      activity.isClosed = new Date(activity.EndTime) < new Date();

      // 检查用户是否已报名
      const isRegistered = await activityModel.isUserRegisteredForActivity(userID, activity.ActivityID);
      activity.isRegistered = isRegistered;
    }
    console.log("userID: ", userID);
    // console.log("activities: ", activities);
    return activities;
  } catch (error) {
    console.error('Error in activityService.viewActivitiesWithStatus:', error);
    throw error;
  }
};

module.exports = {
  viewActivity,
  viewActivitiesWithStatus,
};
