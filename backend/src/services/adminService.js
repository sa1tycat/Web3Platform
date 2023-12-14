const fileService = require('./fileService');
const ActivityModel = require('../models/ActivityModel');
const BadgeModel = require('../models/BadgeModel');
const UserModel = require('../models/UserModel');
const UserBadgeModel = require('../models/UserBadgeModel');
const db = require('../models/db');

// 创建活动
const createActivity = async (activityInfo) => {
  try {
    return await ActivityModel.createActivity(activityInfo);
  } catch (error) {
    console.error('Error in adminService.createActivity:', error);
    throw error;
  }
};

// 更新活动
const updateActivity = async (activityID, activityInfo) => {
  // 更新数据库中的活动信息
  await ActivityModel.updateActivity(activityID, activityInfo);
};

// 删除活动
const deleteActivity = async (activityID) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 检查是否有关联的徽章
    const [badgeRows] = await connection.query(
      'SELECT COUNT(*) AS count FROM Badges WHERE ActivityID = ?',
      [activityID]
    );
    if (badgeRows[0].count > 0) {
      await connection.rollback();
      return {
        success: false,
        message: 'Cannot delete activity with associated badges'
      };
    }

    // 删除活动和相关的用户活动记录
    await connection.query('DELETE FROM UserActivities WHERE ActivityID = ?', [activityID]);
    await connection.query('DELETE FROM Activities WHERE ActivityID = ?', [activityID]);

    await connection.commit();
    return {
      success: true,
      message: 'Activity deleted successfully'
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// 查看活动参与者
const getActivityParticipants = async (activityID) => {
  // 逻辑来获取特定活动的参与者
  const participants = await UserModel.findUsersByActivityID(activityID);
  return participants;
};

// 获取默认 Metadata
const getMetadata = async () => {
  const metadata = {
    title: "Default Title",
    description:
      "This is a default badge.",
    image: "https://api.campusblock.space/files/images/test.png",
    activity: "Default activity",
    attributes: [
      {
        trait_type: "Image",
        value: "Freshmen",
      },
      {
        trait_type: "Expression",
        value: "Neutral",
      },
      {
        trait_type: "Accessories",
        value: "Tie",
      },
      {
        trait_type: "Achievement",
        value: "Compass",
      },
      {
        trait_type: "Medal",
        value: "Innovator",
      },
      {
        trait_type: "Background",
        value: "Library",
      },
    ],
  };
  return metadata;
}

// 这个版本的是 findMetadata() 正确实现后使用的函数
// 修改 Metadata 字段
const modifyMetadata = (metadata, badgeInfo) => {
  metadata.title = badgeInfo.title;
  metadata.description = badgeInfo.description;
  return metadata;
};

// 根据属性获得对应图片存储名字
const getImageName = (attributes) => {
  let imageName = "";

  // 这个参数的具体顺序需要看图像生成的 layerConfigurations
  // TODO: 完善属性列表，最好可以实现自定义添加的功能
  const imageNames = {
    background:{
      "Bell Tower": "A",
      "Library": "B",
      "Playground": "C",
      "Concert Hall": "D",
      "Laboratory": "E",
      "Star Sky": "F",
      "Default": "B"
    },
    image: {
      "Freshman": "A",
      "Junior": "B",
      "Postgraduate": "C",
      "Senior": "D",
      "Sophomore": "E",
      "Default": "A"
    },
    expression: {
      "Excied": "A",
      "Laughing": "B",
      "Neutral": "C",
      "Smile": "D",
      "Thinking": "E",
      "Winking": "F",
      "Default": "C"
    },
    medal: {
      "Innovator": "A",
      "Volunteer": "B",
      "Default": "A"
    },
    accessories: {
      "Scarf": "A",
      "Tie": "B",
      "Default": "B"
    },
    achievement: {
      "Compass": "A",
      "Paper": "B",
      "Default": "B"
    },
  };

  // 按照imageNames中的顺序遍历
  for (const category in imageNames) {
    if (imageNames.hasOwnProperty(category)) {
      const attrValue = attributes[category];
      imageName += (imageNames[category][attrValue] || imageNames[category]["Default"]);
    }
  }

  imageName += ".png";
  console.log('imageName', imageName)
  return imageName;
};

const modedifyMetadataTest = (metadata, badgeInfo) => {
  metadata.title = badgeInfo.title;
  metadata.description = badgeInfo.description;
  metadata.image = "https://api.campusblock.space/files/images/tmp/" + getImageName(badgeInfo.attributes);
  // 将 metadata 中的 attributes 替换为 badgeInfo 中的 attributes
  metadata.attributes.forEach((attr) => {
    // 将 trait_type 的首字母小写并与 badgeInfo.attributes 中的键进行匹配
    let key =
      attr.trait_type.charAt(0).toLowerCase() + attr.trait_type.slice(1);
    if (badgeInfo.attributes[key]) {
      attr.value = badgeInfo.attributes[key];
    }
  });
  return metadata;
};

// 创建分发徽章
const createBadges = async (activityID, badges) => {
  let badgesCreation = [];
  try {
    for (const badge of badges) {
      console.log('badge', badge);
      // 获取默认 Metadata
      const defaultMetadata = await getMetadata();
      
      // 修改 Metadata 字段
      const modifiedMetadata = modedifyMetadataTest(defaultMetadata, badge.badgeInfo);
      
      // 插入活动名字字段
      const activity = await ActivityModel.findActivityByID(activityID); // 获得活动信息
      modifiedMetadata.activity = activity.Name; // 再活动字段插入活动名字
      console.log('modifiedMetadata', modifiedMetadata);

      // 上传到 IPFS
      // TODO: const metadataURI = await IPFSService.uploadToIPFS(metadata);
      
      // 测试实现，实际需要上传到 IPFS
      const timeStamp = Date.now();  // 时间戳
      const metadataFilePath = await fileService.storeMetadata(modifiedMetadata, 'metadata-' + badge.userID + '-' + activityID + '-' + timeStamp + '.json');
      console.log('metadataFilePath', metadataFilePath);
      const metadataURI = 'https://api.campusblock.space/' + metadataFilePath;

      // 数据库中临时记录徽章
      const badgeID = await BadgeModel.createTempBagdge({
        activityID,
        title: modifiedMetadata.title,
        description: modifiedMetadata.description,
        imageURL: modifiedMetadata.image,
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
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred while creating badges',
      error: error.message
    };
  }
};

// 更新徽章 tokenID 并记录用户获得徽章
const updateBadgeTkID = async (badges) => {
  try {
    let badgesUpdate = [];
    let allUpdated = true;

    for (const badge of badges) {
      const badgeUpdateResult = await BadgeModel.updateBadgeTkID(badge);
      const userBadgeRecordResult = await UserBadgeModel.createUserBadgeRecord(badge);

      badgesUpdate.push({
        badgeID: badge.badgeID,
        tokenUpdateSuccess: badgeUpdateResult.success,
        tokenUpdateMessage: badgeUpdateResult.message,
        userBadgeRecordSuccess: userBadgeRecordResult.success,
        userBadgeRecordMessage: userBadgeRecordResult.message
      });

      if (!badgeUpdateResult.success || !userBadgeRecordResult.success) {
        allUpdated = false;
      }
    }

    return {
      success: allUpdated,
      message: allUpdated ? 'Badges and user badge records updated successfully' : 'Some updates failed',
      badgesUpdate,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update badges and user badge records',
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
  updateActivity,
  deleteActivity,
  getActivityParticipants,
  createBadges,
  updateBadgeTkID,
  distributeBadges,
};
