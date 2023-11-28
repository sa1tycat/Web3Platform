const activityService = require('../services/activityService');

// 查看活动
const viewActivity = async (req, res) => {
  try {
    const activityID = req.query.activityID;
    const activities = await activityService.viewActivity(activityID);

    if (activities.length > 0) {
      res.json({ success: true, activity: activities, message: 'Activities retrieved successfully' });
    } else {
      res.json({ success: false, message: 'No activities found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  viewActivity,
};
