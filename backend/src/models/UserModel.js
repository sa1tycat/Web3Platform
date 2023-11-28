const db = require("./db");

// 绑定DID到学号
const bindStudentId = async (DID, studentID) => {
  try {
    const [result] = await db.query(
      "UPDATE Users SET DID = ? WHERE StudentID = ?",
      [DID, studentID]
    );
    // console.log("result", result);
    // console.log("result.affectedRows", result.affectedRows > 0);
    return result.affectedRows > 0; // 绑定成功返回true，否则返回false
  } catch (error) {
    console.error("Error in UserModel.bindStudentId:", error);
    throw error;
  }
};

// 查看获得徽章
const viewBadges = async (userID) => {
  try {
    const query = `
      SELECT 
        b.*, ub.AcquiredAt, a.Name AS ActivityName, a.Description AS ActivityDescription 
      FROM 
        UserBadges ub
        INNER JOIN Badges b ON ub.BadgeID = b.BadgeID
        LEFT JOIN Activities a ON b.ActivityID = a.ActivityID
      WHERE 
        ub.UserID = ?
    `;

    const [badges] = await db.query(query, [userID]);
    return badges;
  } catch (error) {
    console.error('Error in UserModel.viewBadges:', error);
    throw error;
  }
};

// 参加活动
const joinActivity = async (userID, activityID) => {
  try {
    const [result] = await db.query(
      'INSERT INTO UserActivities (UserID, ActivityID) VALUES (?, ?)',
      [userID, activityID]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error in UserModel.joinActivity:', error);
    throw error;
  }
};

module.exports = {
  bindStudentId,
  viewBadges,
  joinActivity,
};
