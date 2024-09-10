const Membro = require("../models/Membro");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  async store(req, res) {
    const { email, nome, senha } = req.body;
    if (!email || !nome || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const membroExistente = await Membro.findOne({ where: { email } });

    if (membroExistente) {
      return res.status(400).json({ error: "Membro já cadastrado" });
    }

    const uuid = uuidv4();

    const senha_criptografada = await bcrypt.hash(senha, 10);

    const membro = await Membro.create({
      id: uuid,
      email,
      nome,
      senha: senha_criptografada,
    });

    return res.json(membro);
  },
};
