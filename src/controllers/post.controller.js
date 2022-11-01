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
    if (!postById) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(postById);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const findPostById = await postService.getPostById(id);
    const { userId } = findPostById;

    const userRequest = await userService.findByEmail(email);

    const userRequestId = userRequest.dataValues.id;

    if (userId === userRequestId) {
        const isUpdated = await postService.updatePost(id, req.body);
        if (isUpdated) {
            const getUpdatedPost = await postService.getPostById(id);
            return res.status(200).json(getUpdatedPost);
        }
    }
    return res.status(401).json({ message: 'Unauthorized user' });
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;

    const findPostById = await postService.getPostById(id);
    if (!findPostById) return res.status(404).json({ message: 'Post does not exist' });
    const { userId } = findPostById;

    const userRequest = await userService.findByEmail(email);

    const userRequestId = userRequest.dataValues.id;

    if (userId === userRequestId) {
        const isRemoved = await postService.deletePost(id);
        if (isRemoved) return res.status(204).json();
    }
    return res.status(401).json({ message: 'Unauthorized user' });
};

module.exports = { createNewPost, showAllPosts, getPostById, updatePost, deletePost };