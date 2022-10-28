const { BlogPost, User, Category } = require('../models');

const createNewPost = async (title, content, userId) => {
    const createPost = BlogPost.create({
    title,
    content,
    userId,
    updated: new Date(),
    published: new Date(),
});

    return createPost;
};

const showAllPosts = async () => BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: 'password' } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
});

const getPostById = async (id) => BlogPost.findOne({
        where: { id },
        include: [
            { model: User, as: 'user', attributes: { exclude: 'password' } },
            { model: Category, as: 'category', through: { exclude: 'id' } },
        ],
});

module.exports = {
    createNewPost,
    showAllPosts,
    getPostById,
};