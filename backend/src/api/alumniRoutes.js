const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

// POST方法绑定DID到学号路由
router.post('/bind-student-id', alumniController.bindStudentId);

module.exports = router;
