const db = require('./db');

// 创建临时徽章（ tokenID 暂时为 NULL）
const createTempBagdge = async (badgeData) => {
try {
  const { activityID, title, description, imageURL, metadataURI } = badgeData;
  const [result] = await db.query(
    'INSERT INTO Badges (ActivityID, Title, Description, ImageURL, MetadataURI) VALUES (?, ?, ?, ?, ?)',
    [activityID, title, description, imageURL, metadataURI]
  );
  return result.insertId; // 返回新创建的临时徽章ID
} catch(error) {
  console.error('Error in BadgeModel.createTempBadge:', error);
  throw error;
}

  

  
}

// 创建徽章（这个函数暂时不用了）
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
  createTempBagdge,
};