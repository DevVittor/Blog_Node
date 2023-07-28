const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./db/conn");

conn
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado!");
  })
  .catch((error) => {
    console.log(
      `Não foi possível se conectar ao banco de dados devido ao error ${error}`
    );
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("inicio");
});

const port = 8080;
app.listen(port, () => {
  try {
    console.log(`Servidor iniciado na porta ${port}`);
  } catch (error) {
    console.log(`Não foi possível iniciar o servidor devido ao error ${error}`);
  }
});
