const ethUtil = require("ethereumjs-util");

/**
 * 验证签名
 * @param {string} message - 签名的原始消息
 * @param {string} signature - 用户提供的签名
 * @param {string} address - 用户的以太坊地址
 * @returns {boolean} - 签名是否有效
 */
const verifySignature = (message, signature, address) => {
  console.log("message:", message);
  try {
    const messageBuffer = Buffer.from(message);
    const msgHash = ethUtil.hashPersonalMessage(messageBuffer);
    const signatureBuffer = ethUtil.toBuffer(signature);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const addressBuffer = ethUtil.publicToAddress(publicKey);
    const recoveredAddress = ethUtil.bufferToHex(addressBuffer);
    console.log("recov:", recoveredAddress);
    return address.toLowerCase() === recoveredAddress.toLowerCase();
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
};

module.exports = {
  verifySignature,
};
