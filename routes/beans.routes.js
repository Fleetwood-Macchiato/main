const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Bean = require("../models/Beans.model");

router.get("/beans", (req, res) => {
  Bean.find().then((beans) => res.render("beans", { beans }));
});

module.exports = router;
