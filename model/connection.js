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

//importing blog model here

db.blogs = require("./blogModel")(sequelize, DataTypes);
db.users = require("./userModel")(sequelize, DataTypes);

//  relationships
db.users.hasMany(db.blogs);
db.blogs.belongsTo(db.users);

sequelize.sync({ alter: false }).then(() => {
  console.log("changes migrated successfully!");
});

module.exports = db;
