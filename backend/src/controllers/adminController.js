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

module.exports = {
  createActivity,
};
