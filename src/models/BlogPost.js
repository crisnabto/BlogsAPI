module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: {
        foreingKey: true,
        type: DataTypes.INTEGER,
      },
      published: DataTypes.DATE,
      updated: DataTypes.DATE
    }, 
    {
      tableName: 'blog_posts',
    //   underscored: false,
      timestamps: false,
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreingKey: 'user_id', as: 'user'
        })
    }
  
    return BlogPost;
};