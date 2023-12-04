const fs = require('fs');
const path = require('path');

exports.storeMetadata = async (metadata, fileName) => {
  // 定义文件的完整路径
  const fullPath = path.join(__dirname, '../../files/jsons/', fileName);

  try {
    fs.writeFileSync(fullPath, JSON.stringify(metadata));

    // 计算相对于项目根目录的路径
    const relativePath = path.relative(path.join(__dirname, '../../'), fullPath);
    return relativePath; // 返回相对路径
  } catch (error) {
    console.error('Error in storing metadata:', error);
    throw error;
  }
};
