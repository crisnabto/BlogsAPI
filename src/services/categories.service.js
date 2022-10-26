const Category = require('../models');

const createNewCategory = async (category) => {
    const newCategory = await Category.create(category);
    return newCategory;
};

module.exports = { createNewCategory };