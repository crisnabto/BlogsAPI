const loginService = require('../services/login.service');

const validateToken = async (req, _res, next) => {
    const { authorization } = req.headers;
    loginService.validateToken(authorization);

    next();
};

module.exports = { validateToken };