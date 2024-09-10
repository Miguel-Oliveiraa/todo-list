const express = require("express");
const MembroController = require("./controllers/MembroController");
const TarefaController = require("./controllers/TarefaController");
const verificarAutenticacao = require("./middleware/authMiddleware");

const routes = express.Router();

routes.post("/membros", MembroController.cadastrar);
routes.post("/login", MembroController.login);

routes.get("/tarefas", verificarAutenticacao, TarefaController.buscar);
routes.put(
  "/tarefas/:id/finalizar",
  verificarAutenticacao,
  TarefaController.finalizar
);
routes.post("/tarefas", verificarAutenticacao, TarefaController.criar);

module.exports = routes;
