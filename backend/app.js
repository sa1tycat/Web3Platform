const express = require('express'); // 引入express模块
const path = require('path');
const app = express();
const cors = require('cors');
const alumniRoutes = require('./src/api/alumniRoutes');
const activityRoutes = require('./src/api/activityRoutes');
const adminRoutes = require('./src/api/adminRoutes');
const fileRoutes = require('./src/api/fileRoutes');
require('dotenv').config(); // 加载环境变量

app.use(express.json()); // 用于解析JSON格式的请求体
app.use(express.urlencoded({ extended: true })); // 用于解析表单格式的请求体

// 使用默认的 CORS 配置，允许所有来源
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 添加文件上传路由
app.use('/api/files', fileRoutes);

// 静态文件托管
app.use('/files', express.static(path.join(__dirname, 'files')));

// 校友相关路由
app.use('/api/alumni', alumniRoutes);

// 活动相关路由
app.use('/api/activity', activityRoutes);

// 管理员相关路由
app.use('/api/admin', adminRoutes);

// 错误处理
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
