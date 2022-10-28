const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const checkData = (info) => {
    if (!info) return true;
};

const checkCategory = Joi.object({
    categoryIds: Joi.array().items(Joi.number().min(1).required()).required().messages({
        'array.empty': errorMessage,
        'string.empty': errorMessage,
    }),
});

const postValidate = (req, res, next) => {
    const { title, content } = req.body;
    try {
        if (checkData(title)) throw new Error(errorMessage);
        if (checkData(content)) throw new Error(errorMessage);
    } catch (error) {
        return res.status(400).json({ message: `${error.message}` });
    }

    next();
};

const postValidateCategory = (req, res, next) => {
    const { categoryIds } = req.body;
    try {
        if (!checkCategory.validate(categoryIds)) throw new Error(errorMessage);
    } catch (error) {
        return res.status(400).json({ message: `${error.message}` });
    }

    next();
};

module.exports = { postValidate, postValidateCategory };