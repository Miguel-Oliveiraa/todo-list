"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tarefas", {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(140),
        allowNull: true,
      },
      finalizada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      data_de_termino: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      prioridade: {
        type: Sequelize.ENUM("Baixa", "Média", "Alta"),
        allowNull: false,
      },
      membro_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: "membros",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tarefas");
  },
};
