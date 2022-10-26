module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      post_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      category_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    }, 
    {
      tableName: 'blog_posts',
    //   underscored: false,
      timestamps: false,
    });

    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            foreingKey: 'post_id',
            as: 'post_id',
            otherKey: 'category_id',
            through: PostCategory,
        });

        models.BlogPost.belongsToMany(models.Category, {
            foreingKey: 'category_id',
            as: 'category_id',
            otherKey: 'post_id',
            through: PostCategory,
        })
    }
  
    return PostCategory;
};