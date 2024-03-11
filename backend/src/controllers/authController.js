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

// 用户签名验证API的控制器方法
const verifySignature = async (req, res) => {
  try {
    const { loginID, signature, address } = req.body;
    const { success, jwt, message } = 
      await authService.verifySignatureAndGenerateJWT(loginID, signature, address);
    
    res.json({
      success,
      jwt,
      message,
    });
  } catch (error) {
    console.error('Error in verifySignature:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, studentID, DID, address, signature } = req.body;
    const { success, jwt, message } = 
      await authService.register(name, studentID, DID, address, signature);
    res.json({
      success,
      jwt,
      message,
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  requestLoginMessage,
  verifySignature,
  register,
};
