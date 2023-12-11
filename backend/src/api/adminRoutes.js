const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// 创建一个活动
router.post('/create-activity', adminController.createActivity);

// 更新已存在的活动
router.put('/update-activity', adminController.updateActivity);

// 删除已存在的活动
router.delete('/delete-activity', adminController.deleteActivity);

// 获取特定活动的参与者列表
router.get('/view-activity', adminController.viewActivity);

// 创建徽章
router.post('/create-badges', adminController.createBadges);

// 更新徽章的Token ID
router.post('/update-badges-tokenID', adminController.updateBadgeTkID);


module.exports = router;
