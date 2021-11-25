const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const saltRound = 5;
const bcrypt = require("bcrypt");
const multerUploader = require("../config/cloudinary");

router
  .route("/signup")
  .get((req, res, next) => {
    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;
    res.render("auth/signup", { userLoggedIn });
  })
  .post(multerUploader.single("image"), (req, res) => {
    const { username, password, email, favorites } = req.body;

    // Retrieving the image from the form using Cloudinary
    let image;
    if (req.file) {
      image = req.file.path;
    } else {
      image =
        "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
    }

    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;

    if (!username || !password)
      res.render("auth/signup", {
        errorMessage: "All fields are required",
        userLoggedIn,
      });

    User.findOne({ username }).then((user) => {
      if (user)
        res.render("auth/signup", {
          errorMessage: "User already exists",
          userLoggedIn,
        });

      const salt = bcrypt.genSaltSync(saltRound);
      const hashPwd = bcrypt.hashSync(password, salt);

      User.create({ username, password: hashPwd, email, favorites, image })
        .then((newUser) => {
          const { _id, username, email, favorites, image } = newUser;
          req.session.loggedInUser = {
            username,
            email,
            _id,
            favorites,
            image,
          };
          console.log("new user req session ", req.session.loggedInUser);
          res.redirect("/");
        })
        .catch((error) =>
          res.render("auth/signup", {
            errorMessage: "The DB broke",
            userLoggedIn,
          })
        );
    });
  });

router
  .route("/login")
  .get((req, res, next) => {
    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;
    res.render("auth/login", { userLoggedIn });
  })
  .post((req, res) => {
    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;

    const { username, password } = req.body;
    if (!username || !password)
      res.render("auth/login", {
        errorMessage: "All fields are required",
        userLoggedIn,
      });

    User.findOne({ username })
      .then((user) => {
        if (!user)
          res.render("auth/login", { errorMessage: "User does not exist" });
        const isPwdCorrect = bcrypt.compareSync(password, user.password); // first password is one from the form. the second is the encrypted one from the database
        if (isPwdCorrect) {
          req.session.loggedInUser = user;
          res.redirect("/users/profile");
        }
      })
      .catch((err) => console.log(err));
  });

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.redirect("/");
    else res.redirect("/auth/login");
  });
});

module.exports = router;
