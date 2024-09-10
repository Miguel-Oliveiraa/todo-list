const { Model, DataTypes } = require("sequelize");

class Tarefa extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.STRING(36),
          primaryKey: true,
        },
        nome: DataTypes.STRING(50),
        descricao: DataTypes.STRING(140),
        finalizada: DataTypes.BOOLEAN,
        data_de_termino: DataTypes.DATE,
        prioridade: DataTypes.ENUM("Baixa", "Média", "Alta"),
        membro_id: DataTypes.STRING(36),
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Membro, { foreignKey: "membro_id", as: "membro" });
  }
}

module.exports = Tarefa;
