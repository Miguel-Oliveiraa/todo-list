const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Membro = require("../models/Membro");

const connection = new Sequelize(dbConfig);

Membro.init(connection);

module.exports = connection;
