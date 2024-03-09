const LoginModel = require('../models/LoginModel');

const requestLoginMessageService = async () => {
    const { loginID, msg, expiresIn } = await LoginModel.createLoginRequest();
    return { loginID, msg, expiresIn };
};

module.exports = {
    requestLoginMessageService,
};
