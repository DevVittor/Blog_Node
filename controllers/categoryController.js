const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const slugify = require("slugify");

router.get("/admin/category", (req, res) => {
  Category.findAll({ order: [["id", "DESC"]] })
    .then((categories) => {
      res.render("admin/category/indexCategory", {
        title: "Category",
        categories: categories,
      });
    })
    .catch((error) => {
      console.logI(
        `Não foi possível procurar pelas colunas na tabela categories por causa do error ${error}`
      );
    });
});

router.get("/admin/category/new", (req, res) => {
  res.render("admin/category/new", {
    title: "Create Category",
  });
});

router.post("/admin/category/save", (req, res) => {
  let nameCategory = req.body.title;
  if (nameCategory != undefined) {
    Category.create({
      title: nameCategory,
      slug: slugify(nameCategory),
    })
      .then(() => {
        res.redirect("/admin/category");
      })
      .catch((error) => {
        console.log(`Não é possível salvar essa categoria pelo error ${error}`);
      });
  } else {
    res.redirect("/admin/category/new");
  }
});

module.exports = router;
