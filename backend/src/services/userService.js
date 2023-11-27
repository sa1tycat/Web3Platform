const userModel = require("../models/UserModel");

// 绑定 DID 到学号
const bindStudentId = async (DID, studentID) => {
  try {
    return await userModel.bindStudentId(DID, studentID);
  } catch (error) {
    console.error("Error in userService.bindStudentId:", error);
    throw error;
  }
};

module.exports = {
  bindStudentId,
};
