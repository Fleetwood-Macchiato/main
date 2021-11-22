const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");

/* GET home page. */
router.get("/home", (req, res) => {
  User.find().then((users) =>
    res.render("index", { title: "Coffee Heaven", users })
  );
});

/* GET from API */
router.get("/api", (req, res) => {
  Api.getAll().then((entity) =>
    res.render("index", { title: "Coffee Heaven", users: entity })
  );
});

module.exports = router;
