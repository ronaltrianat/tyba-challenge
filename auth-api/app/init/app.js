const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const authRouter = require("../modules/auth/routes/routes");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

authRouter(app);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
