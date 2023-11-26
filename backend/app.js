const express = require('express'); // 引入express模块
const app = express();
require('dotenv').config(); // 加载环境变量

app.use(express.json()); // 用于解析JSON格式的请求体
app.use(express.urlencoded({ extended: true })); // 用于解析表单格式的请求体

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 错误处理
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
