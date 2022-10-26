const categoryService = require('../services/categories.service');

const createNewCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const newCategory = await categoryService.createNewCategory(name);

    return res.status(201).json(newCategory);
};

module.exports = { createNewCategory };