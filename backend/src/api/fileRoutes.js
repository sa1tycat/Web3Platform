const express = require('express');
const multer = require('multer'); // 使用 multer 处理文件上传
const router = express.Router();
const fileService = require('../services/fileService');

// 设置 multer 存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const baseDir = path.join(__dirname, '../../files/'); // 基础目录路径
    if (file.mimetype === 'application/json') {
      cb(null, path.join(baseDir, 'jsons/')); // JSON 文件存储路径
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(baseDir, 'images/')); // 图片文件存储路径
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json({ success: true, message: 'File uploaded successfully', filePath: req.file.path });
  } else {
    res.status(400).json({ success: false, message: 'No file uploaded' });
  }
});

module.exports = router;
