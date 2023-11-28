const db = require('./db');

// 查看活动
const viewActivity = async (activityID) => {
  try {
    // 默认查询返回所有活动
    let query = 'SELECT * FROM Activities';
    let params = [];
    
    // 如果参数中有活动ID，则返回指定活动
    if (activityID) {
      query += ' WHERE ActivityID = ?';
      params.push(activityID);
    }

    const [activities] = await db.query(query, params);
    return activities;
  } catch (error) {
    console.error('Error in ActivityModel.viewActivity:', error);
    throw error;
  }
};

module.exports = {
  viewActivity,
};
