"use strict";

const { Sequelize } = require("sequelize");
const db = {};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
