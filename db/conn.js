const Sequelize = require("sequelize");
const conn = new Sequelize("NodeBlog", "root", "mint", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = conn;
