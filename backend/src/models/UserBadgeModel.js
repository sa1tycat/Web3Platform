const db = require('./db');

// 记录用户获得徽章
const createUserBadgeRecord = async (badge) => {
  try {
    const { badgeID, userID } = badge;
    const [result] = await db.query(
      'INSERT INTO UserBadges (BadgeID, UserID) VALUES (?, ?) ON DUPLICATE KEY UPDATE BadgeID = BadgeID',
      [badgeID, userID]
    );

    if (result.affectedRows === 0) {
      return { success: false, badgeID, userID, message: "Failed to create or update user badge record" };
    }

    return { success: true, badgeID, userID, message: "User badge record created or updated successfully" };
  } catch (error) {
    console.error('Error in UserBadgeModel.createUserBadgeRecord:', error);
    throw error;
  }
};

module.exports = { createUserBadgeRecord };
