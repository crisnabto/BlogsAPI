const userService = require('../services/user.service');

// const t = 'Seu `token` não consegue ser verificado a partir do segredo da variável de ambiente `JWT_SECRET`';
// const loginService = require('../services/login.service');

const createNewUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const alreadyUser = await userService.findByEmail(email);
    if (alreadyUser) return res.status(409).json({ message: 'User already registered' });

    const user = await userService.createNewUser({ displayName, email, password, image });
    // console.log(user);
    // const { newUser, token } = user;
    // console.log(token);

    // if (!newUser) return res.status(401).json({ message: t });

    return res.status(201).json({ token: user });
};

module.exports = { createNewUser };