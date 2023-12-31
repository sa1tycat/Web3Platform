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
    const [result] = await db.query(
      "INSERT INTO UserActivities (UserID, ActivityID) VALUES (?, ?)",
      [userID, activityID]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error in UserModel.joinActivity:", error);
    throw error;
  }
};

// 根据活动 ID 查找用户
const findUsersByActivityID = async (activityID) => {
  // 临时增加了 Address 字段，后期应该改成通过 DID 智能合约查找
  const [users] = await db.query(
    "SELECT u.UserID AS userID, u.Name AS name, u.StudentID AS studentID, u.DID, u.Address AS address FROM Users u JOIN UserActivities ua ON u.UserID = ua.UserID WHERE ua.ActivityID = ?",
    [activityID]
  );
  return users;
};

module.exports = {
  getUserNameByID,
  bindStudentId,
  viewBadges,
  joinActivity,
  findUsersByActivityID,
};
