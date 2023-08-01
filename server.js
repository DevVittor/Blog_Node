const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./db/conn");

//Habilitar o uso de Favicon
const favicon = require("serve-favicon");
const path = require("path");
//Migrations
const categoryController = require("./controllers/categoryController");
const indexController = require("./controllers/indexController");
const error404Controller = require("./controllers/error404Controller");

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
app.use(favicon(path.join(__dirname, "public", "favicon.png")));

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

/**
 * TODO: Isso serve para quando o usuário mandar um informação pelo formulário a gente possa pegar
 */
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * TODO: Habilita o uso de JSON nas rotas pelo clientes e ou na criação do que for necessário
 */
app.use(bodyParser.json());

app.use("/", indexController);
app.use("/", categoryController);
app.use("*", error404Controller);

const port = 8080;
app.listen(port, () => {
  try {
    console.log(`Servidor iniciado na porta ${port}`);
  } catch (error) {
    console.log(`Não foi possível iniciar o servidor devido ao error ${error}`);
  }
});
