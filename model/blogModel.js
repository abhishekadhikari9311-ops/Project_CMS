module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("blog", {
    TitleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SubTitleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DescriptionName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ImageUrlPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Blog;
};