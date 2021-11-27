const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page. */
router.get("/", (req, res) => {
  let userLoggedIn;
  if (req.session.loggedInUser) userLoggedIn = true;
  else userLoggedIn = false;

  User.find().then((users) =>
    res.render("index", { title: "BarnaBeans", users, userLoggedIn })
  );
});

module.exports = router;
