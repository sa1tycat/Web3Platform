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

// 创建活动
const createActivity = async (activityInfo) => {
  try {
    const result = await db.query(
      'INSERT INTO Activities (Name, Description, StartTime, EndTime) VALUES (?, ?, ?, ?)',
      [activityInfo.name, activityInfo.description, activityInfo.startTime, activityInfo.endTime]
    );

    return result;
  } catch (error) {
    console.error('Error in ActivityModel.createActivity:', error);
    throw error;
  }
};


module.exports = {
  viewActivity,
  createActivity,
};
