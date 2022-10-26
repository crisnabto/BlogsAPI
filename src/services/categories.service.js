const { Category } = require('../models');

const createNewCategory = async (category) => {
    const newCategory = await Category.create(category);
    return newCategory;
};

const showAllCategories = async () => {
    const allCategories = await Category.findAll();
    return allCategories;
};

module.exports = { createNewCategory, showAllCategories };