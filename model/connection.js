const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!");
  })
  .catch((err) => {
    console.error("db not connected!", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.sequelize = sequelize;

//importing  models here

db.blogs = require("./blogModel")(sequelize, DataTypes);
db.users = require("./userModel")(sequelize, DataTypes);
db.comments = require("./commentModel")(sequelize, DataTypes);

//  relationships
db.users.hasMany(db.blogs);
db.blogs.belongsTo(db.users);

db.users.hasMany(db.comments);
db.comments.belongsTo(db.users);

db.blogs.hasMany(db.comments);
db.comments.belongsTo(db.blogs);

sequelize.sync({ alter: false }).then(() => {
  console.log("changes migrated successfully!");
});

module.exports = db;
