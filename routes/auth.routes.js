const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const User = require("../models/User.model");

router.get("/login", async (req, res) => {
  try {
    console.log("login");

    res.render("auth/login");
  } catch (err) {
    (err) => console.log(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    console.log("signup");

    res.render("auth/signup");
  } catch (err) {
    (err) => console.log(err);
  }
});

module.exports = router;
