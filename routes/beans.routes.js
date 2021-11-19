const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Bean = require("../models/Beans.model");

router.get("/beans", async (req, res) => {
  try {
    let beanCafes = await Bean.find();
    console.log("beans from db", beanCafes);

    res.render("beans/beans", { beanCafes });
  } catch (err) {
    (err) => console.log(err);
  }
});

module.exports = router;
