const activityModel = require('../models/ActivityModel');
const BadgeModel = require('../models/BadgeModel');
const UserModel = require('../models/UserModel');
const db = require('../models/db');

// 创建活动
const createActivity = async (activityInfo) => {
  try {
    return await activityModel.createActivity(activityInfo);
  } catch (error) {
    console.error('Error in adminService.createActivity:', error);
    throw error;
  }
};

// 创建分发徽章

// 需要修改
const createAndDistributeBadges = async (activityID, badges) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction(); // 开始数据库事务

    let badgesDistribution = [];
    for (const badge of badges) {
      const { userID, badgeInfo } = badge;

      // TO-DO: 生成徽章图像 (这需要您的自定义逻辑或第三方服务)
      // const badgeImage = await generateBadgeImage(badgeInfo);

      // TO-DO: 上传图像至IPFS
      // const imageURI = await IPFSService.uploadToIPFS(badgeImage);

      // 注意：以下是测试用假数据
      const imageURI = 'http://localhost:3000/uploads/test.jpg';

      // TO-DO: 创建Metadata
      // const metadata = createMetadata(badgeInfo, imageURI);

      // TO-DO: 上传Metadata至IPFS
      // const metadataURI = await IPFSService.uploadToIPFS(metadata);

      // 注意：以下是测试用假数据
      const metadataURI = 'http://localhost:3000/uploads/test.json';

      // 在数据库中创建徽章记录
      const badgeRecord = {
        activityID,
        userID,
        title: badgeInfo.title,
        description: badgeInfo.description,
        metadataURI
      };
      const badgeID = await BadgeModel.createBadge(connection, badgeRecord);

      // 记录徽章分发信息
      badgesDistribution.push({
        badgeID,
        userID,
        name: await UserModel.getUserNameByID(connection, userID),
        badgeMetadataURI: metadataURI
      });
    }

    await connection.commit(); // 提交事务
    return { success: true, message: 'Badges created and distributed successfully', badgesDistribution };
  } catch (error) {
    await connection.rollback(); // 事务回滚
    throw error;
  } finally {
    connection.release(); // 释放连接
  }
};

module.exports = {
  createActivity,
  createAndDistributeBadges,
};
