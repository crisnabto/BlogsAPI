const postService = require('../services/post.service');
const userService = require('../services/user.service');
const { PostCategory } = require('../models');
// const { User } = require('../models');
const { Category } = require('../models');
// const postCategoryService = require('../services/postCategory.service');

const createNewPost = async (req, res) => {
    const { email } = req.user;
    const { title, content, categoryIds } = req.body;

    const categories = categoryIds.map((id) => Category.findOne({
        where: { id },
    }));

    const done = await Promise.all(categories);

    if (done.some((i) => i === null)) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    } 

    const user = await userService.findByEmail(email);

    const userId = user.dataValues.id;

    const newPost = await postService.createNewPost(title, content, userId);

    const postId = newPost.dataValues.id;

    categoryIds.map((idCat) => PostCategory.create({ postId, categoryId: idCat }));

    return res.status(201).json(newPost);
};

const showAllPosts = async (req, res) => {
    const allPosts = await postService.showAllPosts();
    return res.status(200).json(allPosts);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const postById = await postService.getPostById(id);
    return res.status(200).json(postById);
};

module.exports = { createNewPost, showAllPosts, getPostById };