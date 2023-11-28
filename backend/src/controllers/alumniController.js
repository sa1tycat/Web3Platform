const userService = require("../services/userService");

// 绑定DID到学号
const bindStudentId = async (req, res) => {
  try {
    const { DID, studentID } = req.body;
    const result = await userService.bindStudentId(DID, studentID);
    // console.log("result", result);
    if (result) {
      res.json({
        success: true,
        message: "Successfully bound DID to student ID",
      });
    } else {
      res.json({ success: false, message: "Failed to bind DID to student ID" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  bindStudentId,
};
