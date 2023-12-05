const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST方法创建一个活动
router.post('/create-activity', adminController.createActivity);

// 获取特定活动的参与者列表
router.get('/view-activity-participants', adminController.viewActivityParticipants);

// 创建徽章
router.post('/create-badges', adminController.createBadges);

// 更新徽章的Token ID
router.post('/update-badges-tokenID', adminController.updateBadgeTkID);

module.exports = router;
