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
    metadata.activity = activityModel.findActivityByID(activityID);
    // 修改 Metadata 字段
    modifyMetadata(metadata, badge.badgeInfo);
    // 上传到 IPFS
    // TODO: const metadataURI = await IPFSService.uploadToIPFS(metadata);
    
    // TODO: 实现文件存储服务
    // 下面是测试数据
    const metadataURI = "http://localhost:3000/files/test.json"
    
    // 记录徽章分发信息
    badgesCreation.push({
      userID: badge.userID,
      badgeMetadataURI: metadataURI
    });
  }
  return {
    success: true,
    message: 'Badges created successfully',
    badgesCreation
  };
};

module.exports = {
  createActivity,
  createBadges,
};
