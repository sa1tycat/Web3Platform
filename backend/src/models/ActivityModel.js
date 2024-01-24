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

// 更新活动
const updateActivity = async (activityID, activityInfo) => {
  try {
    const { name, description, startTime, endTime } = activityInfo;
    const sql = `UPDATE Activities SET Name = ?, Description = ?, StartTime = ?, EndTime = ? WHERE ActivityID = ?`;
    await db.query(sql, [name, description, startTime, endTime, activityID]);
    return true;
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
};

// 根据 ID 查找活动
const findActivityByID = async (activityID) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM Activities WHERE ActivityID = ?',
      [activityID]
    );
    if (rows.length > 0) {
      return rows[0]; // 返回找到的活动信息
    } else {
      return null; // 如果没有找到活动，返回 null
    }
  } catch (error) {
    console.error('Error in ActivityModel.findActivityByID:', error);
    throw error;
  }
};

// 根据用户 ID 判断是否已报名参加活动
const isUserRegisteredForActivity = async (userID, activityID) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM UserActivities WHERE UserID = ? AND ActivityID = ?",
      [userID, activityID]
    );

    return rows.length > 0;
  } catch (error) {
    console.error("Error in isUserRegisteredForActivity:", error);
    throw error;
  }
};


module.exports = {
  viewActivity,
  createActivity,
  updateActivity,
  findActivityByID,
  isUserRegisteredForActivity,
};
