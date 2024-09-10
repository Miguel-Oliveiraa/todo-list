const express = require("express");
const MembroController = require("./controllers/MembroController");

const routes = express.Router();

routes.post("/membros", MembroController.store);

module.exports = routes;
