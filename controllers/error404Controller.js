const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
  res.render("layouts/error404", {
    title: "Error 404",
  });
});

module.exports = router;
