const { Model, DataTypes } = require("sequelize");

class Membro extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.STRING(36),
          primaryKey: true,
        },
        email: DataTypes.STRING,
        nome: DataTypes.STRING,
        senha: DataTypes.STRING(60),
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Tarefa, { foreignKey: "membro_id", as: "tarefas" });
  }
}

module.exports = Membro;
