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

const getAllUsers = async (req, res) => {
    const allUsers = await userService.getAllUsers();
    return res.status(200).json(allUsers);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const userById = await userService.getUserById(id);
    const { error } = userById;
    if (error) return res.status(404).json({ message: error });

    return res.status(200).json(userById);
};

const deleteSelf = async (req, res) => {
    const { email } = req.user;

    const userRequest = await userService.findByEmail(email);

    const userRequestId = userRequest.dataValues.id;

    const deleteUser = await userService.deleteSelf(userRequestId);
    if (deleteUser) return res.status(204).json();
};

module.exports = { createNewUser, getAllUsers, getUserById, deleteSelf };