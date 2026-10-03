const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  HOST: dbConfig.HOST,
  dialect: dbConfig.dialect,
  USER: dbConfig.USER,
  PASSWORD: dbConfig.PASSWORD,
  DATABASE: dbConfig.DB,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(console.log("CONNECTED!"))
  .catch((err) => {
    console.error(err, "disconnected!");
  });

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.blogs = require("./blogModel")(Sequelize, DataTypes);

db.sequelize
  .sync({ alter: true })
  .then(console.log("migrated successfully!!!"));

module.exports = db;