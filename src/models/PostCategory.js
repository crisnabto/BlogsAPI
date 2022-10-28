module.exports = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
    postId: { type:DataTypes.INTEGER, primaryKey: true },
    categoryId: { type:DataTypes.INTEGER, primaryKey: true }
  }, 
  {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  });

  PostCategoryTable.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
          as: 'blog_posts',
          foreignKey: 'categoryId',
          otherKey: 'postId',
          through: PostCategoryTable,
      });
      models.BlogPost.belongsToMany(models.Category, {
          as: 'categories',
          foreignKey: 'postId',
          otherKey: 'categoryId',
          through: PostCategoryTable,
      })
  }

  return PostCategoryTable;
};