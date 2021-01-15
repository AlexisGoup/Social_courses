const Sequelize = require('sequelize');
const config    = require('../config/db.config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lessons   = require("./lessons.model")(db.sequelize, db.Sequelize);

module.exports = db;