const userModel = require("../models/UserModel");

// 绑定DID到学号
const bindStudentId = async (DID, studentID) => {
  try {
    return await userModel.bindStudentId(DID, studentID);
  } catch (error) {
    console.error("Error in userService.bindStudentId:", error);
    throw error;
  }
};

// 查看获得徽章
const viewBadges = async (userID) => {
  try {
    return await userModel.viewBadges(userID);
  } catch (error) {
    console.error('Error in userService.viewBadges:', error);
    throw error;
  }
};

// 参加活动
const joinActivity = async (userID, activityID) => {
  try {
    return await userModel.joinActivity(userID, activityID);
  } catch (error) {
    console.error('Error in userService.joinActivity:', error);
    throw error;
  }
};


module.exports = {
  bindStudentId,
  viewBadges,
  joinActivity,
};
