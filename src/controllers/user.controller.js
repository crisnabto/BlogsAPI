const userService = require('../services/user.service');
const loginService = require('../services/login.service');

const createNewUser = async (req, res) => {
    const { email, password } = req.body;
    await userService.createNewUser(req.body);
    const token = await loginService.validateLogin({ email, password });

    return res.status(201).json({ token });
};

module.exports = { createNewUser };