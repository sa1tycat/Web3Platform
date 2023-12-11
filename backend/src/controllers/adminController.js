const adminService = require('../services/adminService');
const activityService = require('../services/activityService')

// 创建活动
const createActivity = async (req, res) => {
  try {
    const activityInfo = req.body.activityInfo;
    const result = await adminService.createActivity(activityInfo);

    if (result) {
      res.json({ success: true, activityID: result.insertId, message: 'Activity created successfully' });
    } else {
      res.json({ success: false, message: 'Failed to create activity' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// 更新活动
const updateActivity = async (req, res) => {
  try {
    const activityID = req.body.activityID;
    const activityInfo = req.body.activityInfo;
    await adminService.updateActivity(activityID, activityInfo);

    res.json({
      success: true,
      message: 'Activity updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 查看活动参与者
const viewActivity = async (req, res) => {
  try {
    const activityID = parseInt(req.query.activityID);
    const participants = await adminService.getActivityParticipants(activityID);
    const activityInfo = await activityService.viewActivity(activityID);
    res.json({
      success: true,
      activityInfo,
      users: participants,
      message: 'Activity retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 创建徽章
const createBadges = async (req, res) => {
  try {
    const { activityID, badges } = req.body;
    const result = await adminService.createBadges(activityID, badges);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 更新徽章 tokenID
const updateBadgeTkID = async (req, res) => {
  try {
    const { badges } = req.body;
    const result = await adminService.updateBadgeTkID(badges);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 颁发徽章
const distributeBadges = async (req, res) => {
  try {
    const { distributions } = req.body;
    const result = await adminService.distributeBadges(distributions);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createActivity,
  updateActivity,
  createBadges,
  viewActivity,
  updateBadgeTkID,
  distributeBadges,
};
