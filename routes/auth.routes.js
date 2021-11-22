const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const saltRound = 5;
const bcrypt = require("bcrypt");

router
  .route("/signup")
  .get((req, res, next) => {
    res.render("auth/signup");
  })
  .post((req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password)
      res.render("auth/signup", { errorMessage: "All fields are required" });

    User.findOne({ username }).then((user) => {
      if (user)
        res.render("auth/signup", { errorMessage: "User already exists" });

      const salt = bcrypt.genSaltSync(saltRound);
      const hashPwd = bcrypt.hashSync(password, salt);

      User.create({ username, password: hashPwd, email })
        .then(() => res.redirect("/home"))
        .catch((error) =>
          res.render("auth/signup", { errorMessage: "The DB broke" })
        );
    });
  });

router
  .route("/login")
  .get((req, res, next) => {
    res.render("auth/login");
  })
  .post((req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
      res.render("auth/login", { errorMessage: "All fields are required" });

    User.findOne({ username })
      .then((user) => {
        if (!user)
          res.render("auth/login", { errorMessage: "User does not exist" });
        const isPwdCorrect = bcrypt.compareSync(password, user.password); // first password is one from the form. the second is the encrypted one from the database
        console.log(user);
        if (isPwdCorrect) res.redirect("/user-profile");
        else res.render("auth/login", { errorMessage: "User does not exist" });
      })
      .catch((err) => console.log(err));
  });

module.exports = router;
