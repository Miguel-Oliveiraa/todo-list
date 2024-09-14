const Membro = require("../models/Membro");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const membro = await Membro.findOne({ where: { email } });

    if (!membro) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, membro.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: membro.dataValues.id, email },
      process.env.jwtSecret,
      {
        expiresIn: process.env.jwtExpiration,
      }
    );

    return res.json({ token, id: membro.id });
  },

  async cadastrar(req, res) {
    const { email, nome, senha } = req.body;
    if (!email || !nome || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    if (nome.length < 5) {
      return res
        .status(400)
        .json({ error: "Nome precisa ter no mínimo 5 caracteres" });
    }

    if (senha.length < 3) {
      return res
        .status(400)
        .json({ error: "Senha precisa ter no mínimo 3 caracteres" });
    }

    const membroExistente = await Membro.findOne({ where: { email } });

    if (membroExistente) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    const uuid = uuidv4();

    const senha_criptografada = await bcrypt.hash(senha, 10);

    try {
      const membro = await Membro.create({
        id: uuid,
        email,
        nome,
        senha: senha_criptografada,
      });
      return res.json(membro);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao cadastrar membro" });
    }
  },

  async buscar(req, res) {
    try {
      const membros = await Membro.findAll();
      return res.json(membros);
    } catch (error) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }
  },

  async index(req, res) {
    const { usuario } = req;
    try {
      const membro = await Membro.findByPk(usuario.id);
      if (!membro) {
        return res.status(404).json({ error: "Membro não encontrado" });
      }
      return res.json(membro);
    } catch (error) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }
  },

  async deletar(req, res) {
    const { usuario } = req;
    const membro = await Membro.findByPk(usuario.id);

    if (!membro) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }

    try {
      await membro.destroy();
      return res.json({ message: "Membro deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar membro" });
    }
  },

  async atualizar(req, res) {
    const { usuario } = req;
    const { email, nome } = req.body;

    if (!email || !nome) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    if (nome.length < 5) {
      return res
        .status(400)
        .json({ error: "Nome precisa ter no mínimo 5 caracteres" });
    }

    // if (senha.length < 3) {
    //   return res
    //     .status(400)
    //     .json({ error: "Senha precisa ter no mínimo 3 caracteres" });
    // }

    const membro = await Membro.findByPk(usuario.id);

    if (!membro) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }

    // const senha_criptografada = await bcrypt.hash(senha, 10);

    try {
      await membro.update({
        email,
        nome,
      });
      return res.json({ message: "Membro atualizado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar membro" });
    }
  },
};
