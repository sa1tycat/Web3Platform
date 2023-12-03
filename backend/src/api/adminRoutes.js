const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST方法创建一个活动
router.post('/create-activity', adminController.createActivity);

// 创建和颁发徽章
router.post('/create-distribute-badges', adminController.createAndDistributeBadges);

module.exports = router;
