const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

// POST方法绑定DID到学号路由
router.post('/bind-student-id', alumniController.bindStudentId);

// GET方法查看获得徽章路由
router.get('/view-badges', alumniController.viewBadges);

// POST方法查看活动路由
router.get('/view-activities', alumniController.viewActivities);

// POST方法参加活动路由
router.post('/join-activity', alumniController.joinActivity);

module.exports = router;
