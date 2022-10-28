require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
    });

    return token;
};

const validateToken = (token) => {
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET);
        const result = data;
        // console.log(result);

        return result;
    } catch (err) {
        return { error: 'Expired or invalid token' };
    }
};

module.exports = { createToken, validateToken };