const loginService = require('../services/login.service');

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    const { error } = await loginService.validateToken(authorization);

    if (error) return res.status(401).json({ message: error });

    next();
};

const validateName = (userName) => {
    if (userName.length < 8) return true;
};

const validateEmail = (email) => {
    const pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (pattern.test(email)) {
        return true;
    }
    return false;
};

const validatePassword = (password) => {
    if (password.length < 6) return true;
};

const validateNewUserData = async (req, res, next) => {
    const { displayName, password } = req.body;
    console.log(displayName);
    const messagePassword = '"password" length must be at least 6 characters long';
    const messageName = '"displayName" length must be at least 8 characters long';
    try {
        if (validateName(displayName)) throw new Error(messageName);
        if (validatePassword(password)) throw new Error(messagePassword);
    } catch (error) {
        return res.status(400).json({ message: `${error.message}` });
    }

    next();
};

const validateNewUserEmail = async (req, res, next) => {
    const { email } = req.body;
    const invalidPattern = '"email" must be a valid email';
    try {
        if (!validateEmail(email)) throw new Error(invalidPattern);
    } catch (error) {
        return res.status(400).json({ message: `${error.message}` });
    }

    next();
};

module.exports = { 
    validateToken,
    validateNewUserData,
    validateNewUserEmail,
};