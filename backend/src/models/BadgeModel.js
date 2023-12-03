const db = require('./db');

// 创建徽章
const createBadge = async (connection, badgeData) => {
  const { activityID, userID, title, description, metadataURI } = badgeData;
  const [result] = await connection.query(
    'INSERT INTO Badges (ActivityID, Title, Description, MetadataURI) VALUES (?, ?, ?, ?)',
    [activityID, title, description, metadataURI]
  );

  // 绑定徽章和用户
  await connection.query(
    'INSERT INTO UserBadges (UserID, BadgeID) VALUES (?, ?)',
    [userID, result.insertId]
  );

  return result.insertId; // 返回新创建的徽章ID
};

module.exports = {
  createBadge,
};