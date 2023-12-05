const fileService = require('./fileService');
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

// 查看活动参与者
const getActivityParticipants = async (activityID) => {
  // 逻辑来获取特定活动的参与者
  const participants = await UserModel.findUsersByActivityID(activityID);
  return participants;
};

// TODO: 实现 findMetadata 正确功能
// 注意：当前只是测试代码，实际应用中需要修改
const findMetadata = async (badge) => {
  const metadata = {
    title: "Programming Star",
    description:
      "This badge is for Zhang San winning the 1st prize in 2023 Programming Contest.",
    image: "http://localhost:3000/images/test.png",
    activity: "Programming Contest",
    attributes: [
      {
        trait_type: "Image",
        value: "Senior",
      },
      {
        trait_type: "Expression",
        value: "Smile",
      },
      {
        trait_type: "Accessories",
        value: "Headphones",
      },
      {
        trait_type: "Achievement",
        value: "Programming",
      },
      {
        trait_type: "Medal",
        value: "Innovator",
      },
      {
        trait_type: "Background",
        value: "Laboratory",
      },
    ],
  };
  return metadata;
}

const modifyMetadata = (metadata, badgeInfo) => {
  metadata.title = badgeInfo.title;
  metadata.description = badgeInfo.description;
  metadata.image = badgeInfo.image;
  metadata.attributes = badgeInfo.attributes;
};

// 创建分发徽章
const createBadges = async (activityID, badges) => {
  let badgesCreation = [];
  for (const badge of badges) {
    // 查找预生成的 Metadata
    const metadata = await findMetadata(badge.badgeInfo);
    // 插入活动名字字段
    const activity = await activityModel.findActivityByID(activityID); // 获得活动信息
    metadata.activity = activity.Name; // 再活动字段插入活动名字
    // 修改 Metadata 字段
    modifyMetadata(metadata, badge.badgeInfo);
    // 上传到 IPFS
    // TODO: const metadataURI = await IPFSService.uploadToIPFS(metadata);
    
    // 测试实现，实际需要上传到 IPFS
    const metadataFilePath = await fileService.storeMetadata(metadata, 'metadata-' + badge.userID + '.json');
    console.log('metadataFilePath', metadataFilePath);
    const metadataURI = 'http://localhost:3000/' + metadataFilePath;

    // 数据库中临时记录徽章
    const badgeID = await BadgeModel.createTempBagdge({
      activityID,
      title: badge.badgeInfo.title,
      description: badge.badgeInfo.description,
      imageURL: badge.badgeInfo.image,
      metadataURI
    });
    
    // 记录徽章分发信息
    badgesCreation.push({
      userID: badge.userID,
      badgeID,
      badgeMetadataURI: metadataURI
    });
  }
  return {
    success: true,
    message: 'Badges created successfully',
    badgesCreation
  };
};

// 更新徽章 tokenID
const updateBadgeTkID = async (badges) => {
  try {
    let badgesUpdate = [];
    let allUpdated = true; // 用于跟踪所有徽章是否都更新成功

    for (const badge of badges) {
      const result = await BadgeModel.updateBadgeTkID(badge);
      badgesUpdate.push(result);

      if (!result.success) {
        allUpdated = false; // 如果任何徽章更新失败，将此标志设为false
      }
    }

    return {
      success: allUpdated,
      message: allUpdated ? 'Badges updated successfully' : 'Some badges failed to update',
      badgesUpdate,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update badges',
      error: error.message,
    };
  }
};

// 颁发徽章
const distributeBadges = async (distributions) => {
  try {
    let badgesDistribution = [];
    let allDistributed = true; // 用于跟踪所有徽章是否都颁发成功

    for (const distribution of distributions) {
      const result = await BadgeModel.distributeBadge(distribution);
      badgesDistribution.push(result);

      if (!result.success) {
        allDistributed = false; // 如果任何徽章颁发失败，将此标志设为false
      }
    }

    return {
      success: allDistributed,
      message: allDistributed ? 'Badges distributed successfully' : 'Some badges failed to distribute',
      badgesDistribution,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to distribute badges',
      error: error.message,
    };
  }
}

module.exports = {
  createActivity,
  getActivityParticipants,
  createBadges,
  updateBadgeTkID,
  distributeBadges,
};
