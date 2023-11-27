const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

// 绑定 DID 到学号路由
router.post('/bind-student-id', alumniController.bindStudentId);

module.exports = router;
