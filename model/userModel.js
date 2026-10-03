module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserPhotograph: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return User;
};