const Tarefa = require("../models/Tarefa");
const Membro = require("../models/Membro");
const { v4: uuidv4 } = require("uuid");
const { deletar } = require("./MembroController");

module.exports = {
  async buscar(req, res) {
    const tarefas = await Tarefa.findAll();

    return res.json(tarefas);
  },

  async finalizar(req, res) {
    const { id } = req.params;

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    try {
      await tarefa.update({ finalizada: 1 });
      return res.json(tarefa);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao finalizar tarefa" });
    }
  },

  async criar(req, res) {
    const { usuario } = req;
    const { nome, descricao, prioridade } = req.body;
    const id = uuidv4();

    if (!nome) {
      return res.status(400).json({ error: "Preencha o campo de nome" });
    }

    const membro = await Membro.findByPk(usuario.id);

    if (!membro) {
      return res.status(404).json({ error: "Membro não encontrado" });
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
      return res.status(400).json({
        error: `O campo 'prioridade' deve ser um dos seguintes valores: 'Baixa', 'Média', 'Alta'. O valor fornecido foi '${prioridade}'.`,
      });
    }

    try {
      const tarefa = await Tarefa.create({
        id,
        nome,
        descricao,
        finalizada: 0,
        prioridade: !prioridade ? "Baixa" : prioridade,
        membro_id: usuario.id,
      });
      return res.json(tarefa);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao cadastrar tarefa" });
    }
  },

  async atualizar(req, res) {
    const { usuario } = req;
    const { id, nome, descricao, prioridade } = req.body;

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    if (tarefa.membro_id !== usuario.id) {
      return res
        .status(403)
        .json({ error: "Sem permissão para editar tarefa" });
    }

    if (nome && (nome.length < 5 || nome.length > 50)) {
      return res
        .status(400)
        .json({ error: "Nome precisa ter entre 5 e 50 caracteres" });
    }

    if (descricao && descricao.length > 140) {
      return res.status(400).json({ error: "Descrição muito longa" });
    }

    if (
      prioridade &&
      prioridade !== "Baixa" &&
      prioridade !== "Média" &&
      prioridade !== "Alta"
    ) {
      return res.status(400).json({
        error: `O campo 'prioridade' deve ser um dos seguintes valores: 'Baixa', 'Média', 'Alta'. O valor fornecido foi '${prioridade}'.`,
      });
    }

    try {
      await tarefa.update({
        nome: nome || tarefa.nome,
        descricao: descricao || tarefa.descricao,
        prioridade: prioridade || tarefa.prioridade,
      });
      return res.json(tarefa);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar tarefa" });
    }
  },

  async deletar(req, res) {
    const { usuario } = req;
    const { id } = req.params;

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    if (tarefa.membro_id !== usuario.id) {
      return res
        .status(403)
        .json({ error: "Sem permissão para deletar tarefa" });
    }

    try {
      await tarefa.destroy();
      return res.json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar tarefa" });
    }
  },
};
