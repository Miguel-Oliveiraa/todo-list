const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Membro = require("../models/Membro");
const Tarefa = require("../models/Tarefa");

const connection = new Sequelize(dbConfig);

Membro.init(connection);
Tarefa.init(connection);

Membro.associate(connection.models);
Tarefa.associate(connection.models);

module.exports = connection;
