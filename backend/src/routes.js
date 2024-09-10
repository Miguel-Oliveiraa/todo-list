const express = require("express");
const MembroController = require("./controllers/MembroController");
const TarefaController = require("./controllers/TarefaController");

const routes = express.Router();

routes.post("/membros", MembroController.cadastrar);

routes.get("/tarefas", TarefaController.buscar);
routes.put("/tarefas/:id/finalizar", TarefaController.finalizar);
routes.post("/membros/:membro_id/tarefas", TarefaController.criar);

module.exports = routes;
