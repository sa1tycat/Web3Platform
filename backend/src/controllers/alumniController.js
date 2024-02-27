const userService = require("../services/userService");
const activityService = require("../services/activityService");

// 绑定DID到学号
const bindStudentId = async (req, res) => {
  try {
    const { DID, studentID } = req.body;
    const result = await userService.bindStudentId(DID, studentID);
    // console.log("result", result);
    if (result) {
      res.json({
        success: true,
        message: "Successfully bound DID to student ID",
      });
    } else {
      res.json({ success: false, message: "Failed to bind DID to student ID" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 查看获得徽章
const viewBadges = async (req, res) => {
  try {
    const { userID } = req.query;
    const badges = await userService.viewBadges(userID);

    if (badges) {
      res.json({ success: true, badges: badges, message: 'Badges retrieved successfully' });
    } else {
      res.json({ success: false, message: 'No badges found for this user' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// 查看活动
const viewActivities = async (req, res) => {
  try {
    const userID = req.query; // 获取userID
    const activities = await activityService.viewActivitiesWithStatus(userID);

    res.json({
      success: true,
      message: 'Activities fetched successfully',
      activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activities',
      error: error.message
    });
  }
};



// 参加活动
const joinActivity = async (req, res) => {
  try {
    const { userID, activityID } = req.body;
    const result = await userService.joinActivity(userID, activityID);

    if (result.success) {
      res.json({ success: true, message: 'Successfully registered for the activity' });
    } else {
      res.json({ success: false, message: result.message });  // 使用从服务层返回的消息
    }
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, message: 'You have already registered for this activity' });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};



module.exports = {
  bindStudentId,
  viewBadges,
  viewActivities,
  joinActivity,
};
