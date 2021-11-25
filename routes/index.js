const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page. */
router.get("/home", (req, res) => {
  let userLoggedIn;
  if (req.session.loggedInUser) userLoggedIn = true;
  else userLoggedIn = false;

  User.find().then((users) =>
    res.render("index", { title: "BarnaBrew", users, userLoggedIn })
  );
});

module.exports = router;
