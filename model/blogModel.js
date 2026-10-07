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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });
  return Blog;
};
