const sequelize = require("sequelize");

const db = new sequelize("wida_tech", "root", "", {
  dialect: "mysql",
});

db.sync({});

module.exports = { db };
