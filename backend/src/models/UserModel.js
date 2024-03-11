const db = require("./db");

// 根据ID查找用户
const getUserNameByID = async (connection, userID) => {
  const [rows] = await connection.query(
    "SELECT Name AS name FROM Users WHERE UserID = ?",
    [userID]
  );
  if (rows.length > 0) {
    return rows[0].Name; // 返回找到的用户姓名
  } else {
    return null; // 如果没有找到用户，返回null
  }
};

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
        b.BadgeID AS badgeID,
        b.Title AS title,
        b.Description AS description,
        b.ImageURL AS imageURL,
        b.MetadataURI AS metadataURI,
        b.CreatedAt AS createdAt,
        b.UpdatedAt AS updatedAt,
        b.TokenID AS tokenID,
        ub.AcquiredAt AS acquiredAt,
        b.ActivityID AS activityID,
        a.Name AS activityName,
        a.Description AS activityDescription
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
    console.error("Error in UserModel.viewBadges:", error);
    throw error;
  }
};

// 参加活动
const joinActivity = async (userID, activityID) => {
  try {
    // 先检查活动是否存在且未过截止日期
    const [activities] = await db.query(
      "SELECT EndTime FROM Activities WHERE ActivityID = ?",
      [activityID]
    );
    console.log("activities", activities);
    if (activities.length === 0 || new Date() > new Date(activities[0].EndTime)) {
      return { success: false, message: 'Activity is closed or does not exist' };
    }

    // 尝试报名活动
    await db.query(
      "INSERT INTO UserActivities (UserID, ActivityID) VALUES (?, ?)",
      [userID, activityID]
    );
    return { success: true, message: 'Successfully registered for the activity' };
  } catch (error) {
    console.error("Error in UserModel.joinActivity:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, message: 'You have already registered for this activity' };
    }
    throw error;
  }
};

// 根据活动 ID 查找用户
const findUsersByActivityID = async (activityID) => {
  const [users] = await db.query(
    "SELECT u.UserID AS userID, u.Name AS name, u.StudentID AS studentID, u.DID, u.Address AS address FROM Users u JOIN UserActivities ua ON u.UserID = ua.UserID WHERE ua.ActivityID = ?",
    [activityID]
  );
  return users;
};

// 新增根据address查询用户ID
const findUserByAddress = async (address) => {
  const [rows] = await db.query(`
    SELECT * FROM Users WHERE Address = ?
  `, [address]);
  return rows[0];
};

// 检查studentID、DID和address是否被注册
const checkUserExists = async (studentID, DID, address) => {
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM Users WHERE StudentID = ? OR DID = ? OR Address = ?`,
      [studentID, DID, address]
    );
    return rows[0].count > 0;
  } catch (error) {
    console.error('Error in checkUserExists:', error);
    throw error; // 抛出错误，以便上层处理
  }
};

// 创建用户
const createUser = async (name, studentID, DID, address) => {
  try {
    const [result] = await db.query(
      `INSERT INTO Users (Name, StudentID, DID, Address) VALUES (?, ?, ?, ?)`,
      [name, studentID, DID, address]
    );
    return result.insertId; // 返回新创建的用户ID
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error; // 抛出错误，以便上层处理
  }
};

module.exports = {
  getUserNameByID,
  bindStudentId,
  viewBadges,
  joinActivity,
  findUsersByActivityID,
  findUserByAddress,
  checkUserExists,
  createUser,
};
