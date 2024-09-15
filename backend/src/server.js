const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

require("./database");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(3333);
