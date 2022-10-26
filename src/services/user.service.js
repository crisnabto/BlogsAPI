const { User } = require('../models');
const { createToken } = require('../utils/jwt.util');
// const loginService = require('./login.service');

const findByEmail = async (email) => {
    const alreadyUser = await User.findOne({ where: { email } });
    if (alreadyUser) return alreadyUser;
};

const createNewUser = async (data) => {
    await User.create(data);
    const token = createToken(data);
    return token;
    // const token = await loginService.validateLogin({ email, password });

    // const validToken = await loginService.validateToken(token);
    // console.log(validToken);
    // const { error } = validToken;
    // if (error) return { message: error };

    // if (validToken) {
    //     const newUser = await User.create(data);

    //     return { newUser, token };
    // }
};

module.exports = { createNewUser, findByEmail };