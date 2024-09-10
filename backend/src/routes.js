const express = require("express");
const MembroController = require("./controllers/MembroController");
const TarefaController = require("./controllers/TarefaController");
const verificarAutenticacao = require("./middleware/authMiddleware");

const routes = express.Router();

routes.post("/cadastro", MembroController.cadastrar);
routes.post("/login", MembroController.login);

routes.get("/membros", verificarAutenticacao, MembroController.buscar);
routes.delete("/membros", verificarAutenticacao, MembroController.deletar);
routes.put("/membros", verificarAutenticacao, MembroController.atualizar);

routes.get("/tarefas", verificarAutenticacao, TarefaController.buscar);
routes.put(
  "/tarefas/:id/finalizar",
  verificarAutenticacao,
  TarefaController.finalizar
);
routes.post("/tarefas", verificarAutenticacao, TarefaController.criar);
routes.put("/tarefas", verificarAutenticacao, TarefaController.atualizar);
routes.delete("/tarefas/:id", verificarAutenticacao, TarefaController.deletar);

module.exports = routes;
