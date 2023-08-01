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
      console.log(
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

router.post("/category/delete", (req, res) => {
  let idCategory = req.body.id;
  if (idCategory != undefined && !isNaN(idCategory)) {
    Category.destroy({
      where: {
        id: idCategory,
      },
    })
      .then(() => {
        res.redirect("/admin/category");
      })
      .catch((error) => {
        console.log(
          `Não foi possível excluir essa categoria por causa do error ${error}`
        );
      });
  }
});

router.get("/admin/category/edit/:id", (req, res) => {
  let idCategory = req.params.id;
  Category.findByPk(idCategory)
    .then((category) => {
      if (category != undefined && isNaN(category)) {
        res.render("admin/category/editCategory", {
          categoria: category,
        });
      } else {
        res.redirect("/admin/category");
      }
    })
    .catch((error) => {
      console.log(
        `Não foi possível encontrar o id da categoria para editar por causa do error ${error}`
      );
      res.redirect("/admin/category");
    });
});

router.post("/admin/category/update", (req, res) => {
  let editCategory = req.body.id;
  let editTitle = req.body.title;

  Category.update(
    {
      title: editTitle,
      slug: slugify(editTitle),
    },
    {
      where: {
        id: editCategory,
      },
    }
  )
    .then(() => {
      res.redirect("/admin/category");
    })
    .catch((error) => {
      console.log(
        `Não foi possíverl atualizar a categoria por causa do error ${error}`
      );
    });
});

module.exports = router;
