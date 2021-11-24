const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Cafe = require("../models/Cafes.model");

router.use(isLoggedIn);
/* GET users listing. */
router.get("/profile", async function (req, res, next) {
  const { _id } = req.session.loggedInUser;
  const userPopulated = await User.findById(_id).populate("favorites");

  res.render("users/profile", { userPopulated });
});

router.get("/favorites", async (req, res) => {
  try {
    const { _id } = req.session.loggedInUser;
    const userPopulated = await User.findById(_id).populate("favorites");
    console.log("user id", _id);

    console.log("user", userPopulated);

    res.render("users/favorites", { userPopulated });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.post("/favorites/:id", async (req, res) => {
  try {
    const cafeId = req.params.id;
    const { _id } = req.session.loggedInUser;
    const user = await User.findByIdAndUpdate(_id, {
      $push: { favorites: cafeId },
    });
    console.log(user);
    res.redirect("/users/favorites");
  } catch (err) {
    console.log(err);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.session.loggedInUser;
    const deletedCafe = await User.findByIdAndUpdate(_id, {
      $pull: { favorites: id },
    });
    console.log("deleted Cafe", deletedCafe);
    res.redirect("/cafes");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
