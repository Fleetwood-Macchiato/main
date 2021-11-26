const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Bean = require("../models/Beans.model");

router.get("/", async (req, res) => {
  let userLoggedIn;
  if (req.session.loggedInUser) userLoggedIn = true;
  else userLoggedIn = false;

  try {
    let beanList = await Bean.find();

    res.render("beans/beans", { beanList, userLoggedIn});
  } catch (err) {
    (err) => console.log(err);
  }
});

router.get("/bean-details/:id", async (req, res) => {
  try {
    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;

    const { id } = req.params;
    let bean = await Bean.findById(id).populate("cafe");

    res.render("beans/bean-details", { bean, userLoggedIn });
  } catch (err) {
    (err) => console.log(err);
  }
});

module.exports = router;
