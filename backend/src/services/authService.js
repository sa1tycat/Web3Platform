const LoginModel = require('../models/LoginModel');
const jwt = require('jsonwebtoken');
const cryptoUtils = require('../utils/cryptoUtils');
const UserModel = require('../models/UserModel');
const fs = require('fs');

const requestLoginMessageService = async () => {
    const { loginID, msg, expiresIn } = await LoginModel.createLoginRequest();
    return { loginID, msg, expiresIn };
};

/**
 * 验证签名并生成JWT
 * @param {string} loginID - 登录请求的ID
 * @param {string} signature - 用户的签名
 * @param {string} userAddress - 用户的以太坊地址
 * @returns {Promise<{success: boolean, jwt?: string, message: string}>}
 */
const verifySignatureAndGenerateJWT = async (loginID, signature, address) => {
  // 先从数据库中查找对应的登录请求和消息（Model层已经验证是否过期）
  const loginRequest = await LoginModel.findLoginRequestById(loginID);

  if (!loginRequest) {
      return { success: false, message: 'Login request not found.' };
  }

  console.log("loginReq: ", loginRequest);
  // 验证签名是否有效
  const isValid = cryptoUtils.verifySignature(loginRequest.Message, signature, address);

  if (!isValid) {
      return { success: false, message: 'Signature verification failed.' };
  }

  // 查找用户ID
  const user = await UserModel.findUserByAddress(address);
  const userID = user.UserID;
  console.log("User: ", user);

  if (userID == null) {
    return { success: false, message: 'User with such address does not exist.' }
  }

  // 签名验证通过，生成JWT
  const keyPath = process.env.PRIVATE_KEY_PATH;
  const secretKey = fs.readFileSync(keyPath, 'utf8');
  const token = jwt.sign({ userID, name: user.Name, studentID: user.StudentID, DID: user.DID, address }, secretKey, { expiresIn: '1h', algorithm: 'RS256' });
  
  // 标记为已使用
  await LoginModel.markLoginAsUsed(loginID, userID);

  return { success: true, jwt: token, message: 'Signature verified successfully.' };
};


module.exports = {
    requestLoginMessageService,
    verifySignatureAndGenerateJWT,
};
