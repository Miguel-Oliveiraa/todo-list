const Membro = require("../models/Membro");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
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
};
