const Tarefa = require("../models/Tarefa");
const Membro = require("../models/Membro");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async index(req, res) {
    const tarefas = await Tarefa.findAll();

    return res.json(tarefas);
  },

  async finalizar(req, res) {
    const { id } = req.params;

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(400).json({ error: "Tarefa não encontrada" });
    }

    try {
      await tarefa.update({ finalizada: 1 });
      return res.json(tarefa);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao finalizar tarefa" });
    }
  },

  async store(req, res) {
    const { membro_id } = req.params;
    const { nome, descricao, prioridade } = req.body;
    const id = uuidv4();

    if (!nome) {
      return res.status(400).json({ error: "Preencha o campo de nome" });
    }

    const membro = await Membro.findByPk(membro_id);

    if (!membro) {
      return res.status(400).json({ error: "Membro não encontrado" });
    }

    if (nome.length < 5 || nome.length > 50) {
      return res
        .status(400)
        .json({ error: "Nome precisa ter entre 5 e 50 caracteres" });
    }

    if (descricao.length > 140) {
      return res.status(400).json({ error: "Descrição muito longa" });
    }

    if (
      prioridade &&
      prioridade !== "Baixa" &&
      prioridade !== "Média" &&
      prioridade !== "Alta"
    ) {
      return res.status(400).json({ error: "Prioridade inválida" });
    }

    try {
      const tarefa = await Tarefa.create({
        id,
        nome,
        descricao,
        finalizada: 0,
        prioridade: !prioridade ? "Baixa" : prioridade,
        membro_id,
      });
      return res.json(tarefa);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao cadastrar tarefa" });
    }
  },
};
