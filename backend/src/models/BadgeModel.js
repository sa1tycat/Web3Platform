const db = require('./db');

// 创建临时徽章（ tokenID 暂时为 NULL）
const createTempBagdge = async (badgeData) => {
  try {
    const { activityID, title, description, imageURL, metadataURI } = badgeData;
    const [result] = await db.query(
      "INSERT INTO Badges (ActivityID, Title, Description, ImageURL, MetadataURI) VALUES (?, ?, ?, ?, ?)",
      [activityID, title, description, imageURL, metadataURI]
    );
    return result.insertId; // 返回新创建的临时徽章ID
  } catch (error) {
    console.error("Error in BadgeModel.createTempBadge:", error);
    throw error;
  }
};

// 更新徽章 TokenID
const updateBadgeTkID = async (badge) => {
  try {
    const { badgeID, tokenID } = badge;
    const [result] = await db.query(
      'UPDATE Badges SET TokenID = ? WHERE BadgeID = ?',
      [tokenID, badgeID]
    );

    // 检查是否有行受影响
    if (result.affectedRows === 0) {
      return { success: false, badgeID, message: "No badge found with the given ID" };
    }

    return { success: true, badgeID, message: "Badge updated successfully" };
  } catch (error) {
    console.error('Error in BadgeModel.updateBadgeTkID:', error);
    throw error;
  }
};

// 颁发徽章
const distributeBadge = async (distribution) => {
  try {
    const { userID, badgeID } = distribution;
    const [result] = await db.query(
      'INSERT INTO UserBadges (UserID, BadgeID) VALUES (?, ?)',
      [userID, badgeID]
    );

    // 检查是否有行受影响
    if (result.affectedRows === 0) {
      return { success: false, userID, badgeID, message: "No badge found with the given ID" };
    }

    return { success: true, userID, badgeID, message: "Badge distributed successfully" };
  } catch (error) {
    console.error('Error in BadgeModel.distributeBadge:', error);
    throw error;
  }
};

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
  updateBadgeTkID,
  distributeBadge,
};