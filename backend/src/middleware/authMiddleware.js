const jwt = require("jsonwebtoken");
require("dotenv").config();

function verificarAutenticacao(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      error: "Não autorizado",
      message: "Token de autenticação ausente.",
    });
  }

  try {
    const usuario = jwt.verify(token, process.env.jwtSecret);
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Não autorizado",
      message: "Token de autenticação inválido.",
    });
  }
}

module.exports = verificarAutenticacao;
