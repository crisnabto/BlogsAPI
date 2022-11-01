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
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
});

const updatePost = async (id, { title, content }) => {
    const [qtdUpdated] = await BlogPost.update(
        { title, content },
        { where: { id } },
    );

    return qtdUpdated > 0;
};

module.exports = {
    createNewPost,
    showAllPosts,
    getPostById,
    updatePost,
};