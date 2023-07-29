const Sequelize = require("sequelize");
const conn = require("../db/conn");

const Category = conn.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;
