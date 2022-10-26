const User = require('../models/User');

const createNewUser = async (data) => {
    const { displayName, email, password, image } = data;
    User.create({ displayName, email, password, image });
};

module.exports = { createNewUser };