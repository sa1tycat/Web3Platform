const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET方法获取登录验证消息
router.get('/login/request-message', authController.requestLoginMessage);

// POST方法验证用户签名
router.post('/login/verify-signature', authController.verifySignature);

module.exports = router;