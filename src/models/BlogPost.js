module.exports = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type:DataTypes.INTEGER, foreingKey: true },
    updated: DataTypes.DATE,
    published: DataTypes.DATE
  }, 
  {
    tableName: 'blog_posts',
    createdAt: 'published',
    updatedAt: 'updated',
    underscored: true,
    timestamps: false,
  });

  BlogPostTable.associate = (models) => {
      BlogPostTable.belongsTo(models.User, {
          foreingKey: 'userId', as: 'user'
      })
  }

  return BlogPostTable;
};