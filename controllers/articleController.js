const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/article", (req, res) => {
  res.send("Rota de Artigo");
});

router.post("/admin/article/new", (req, res) => {
  Category.findAll().then((category) => {
    res.render("admin/article/newArticle", {
      categories: category,
    });
  });
});

module.exports = router;
