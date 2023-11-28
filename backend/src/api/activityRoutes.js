const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// GET方法获得一个或者多个活动信息
router.get('/view', activityController.viewActivity);

module.exports = router;
