const authService = require("../services/authService");

// 登录消息请求处理
const requestLoginMessage = async (req, res) => {
  try {
    const { loginID, msg, expiresIn } =
      await authService.requestLoginMessageService();

    res.json({
      success: true,
      message: "Login message generated successfully.",
      loginID,
      msg,
      expiresIn,
    });
  } catch (error) {
    console.error("Error in requestLoginMessage:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating the login message.",
    });
  }
};

module.exports = {
  requestLoginMessage,
};
