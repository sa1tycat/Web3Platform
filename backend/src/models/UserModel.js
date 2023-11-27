const db = require("./db");

// 绑定 DID 到学号
const bindStudentId = async (DID, studentID) => {
  try {
    const [result] = await db.query(
      "UPDATE Users SET DID = ? WHERE StudentID = ?",
      [DID, studentID]
    );
    // console.log("result", result);
    // console.log("result.affectedRows", result.affectedRows > 0);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error in UserModel.bindStudentId:", error);
    throw error;
  }
};

module.exports = {
  bindStudentId,
};
