const LoginModel = require('../models/LoginModel');
const jwt = require('jsonwebtoken');
const cryptoUtils = require('../utils/cryptoUtils');
const UserModel = require('../models/UserModel');
const fs = require('fs');

const requestLoginMessageService = async () => {
    const { loginID, msg, expiresIn } = await LoginModel.createLoginRequest();
    return { loginID, msg, expiresIn };
};

// 生成JWT
const generateJWT =  (userID, name, studentID, DID, address) => {
  const keyPath = process.env.PRIVATE_KEY_PATH;
  const secretKey = fs.readFileSync(keyPath, 'utf8');
  const token = jwt.sign({ userID, name, studentID, DID, address }, secretKey, { expiresIn: '1h', algorithm: 'RS256' });
  return token;
};

// 验证签名
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
  token = generateJWT(user.UserID, user.Name, user.StudentID, user.DID, address);
  
  // 标记为已使用
  await LoginModel.markLoginAsUsed(loginID, userID);

  return { success: true, jwt: token, message: 'Signature verified successfully.' };
};

// 注册
const register = async (name, studentID, DID, address, signature) => {
  // 构造被签名的消息
  const msg = `${name}|${studentID}|${DID}|${address}`;

  const isValid = cryptoUtils.verifySignature(msg, signature, address);
  if (!isValid) {
    return { success: false, message: 'Signature verification failed.' };
  }

  const userExists = await UserModel.checkUserExists(studentID, DID, address);
  console.log("userEx:", userExists);
  if (userExists) {
    return { success: false, message: 'User has existed.' };
  }

  const userID = await UserModel.createUser(name, studentID, DID, address);
  const token = generateJWT(userID, name, studentID, DID, address);

  return { success: true, jwt: token, message: 'Registered successfully.' };
}

module.exports = {
    requestLoginMessageService,
    verifySignatureAndGenerateJWT,
    register,
};
