const adminService = require('../services/adminService');

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

module.exports = {
  createActivity,
  createBadges,
};
