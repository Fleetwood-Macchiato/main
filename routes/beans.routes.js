const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Bean = require("../models/Beans.model");

router.get("/beans", async (req, res) => {
  try {
    let beanList = await Bean.find();
    console.log("beans from db", beanList);

    res.render("beans/beans", { beanList });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.get("/bean-details", async (req, res) => {
  try {
    let beanList = await Bean.find();
    console.log("beans from db", beanList);

    res.render("beans/bean-details", { beanList });
  } catch (err) {
    (err) => console.log(err);
  }
});

module.exports = router;
