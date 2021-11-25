const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const multerUploader = require("../config/cloudinary");


router.use(isLoggedIn);
/* GET users listing. */
router.get("/profile", async function (req, res, next) {
  const { _id } = req.session.loggedInUser;
  const userPopulated = await User.findById(_id).populate("favorites");
  res.render("users/profile", { userPopulated, userLoggedIn: true });
});

router.get("/favorites", async (req, res) => {
  try {
    const { _id } = req.session.loggedInUser;
    const userPopulated = await User.findById(_id).populate("favorites");
    res.render("users/favorites", { userPopulated, userLoggedIn: true });
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
    res.redirect("/cafes");
  } catch (err) {
    console.log(err);
  }
});
router
  .route("/edit/:id")
  .get((req, res) => {
    User.findById(req.params.id).then((user) => {
      res.render("users/edit-profile", user);
    });
  })
  .post( multerUploader.single("image"), (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    let image;
    if (req.file) {
      image = req.file.path;
    } else {
      image =
        "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
    }

    User.findByIdAndUpdate(userId, { username, email, image }).then((user) => {
      res.redirect(`/users/profile`);
    });
  });

module.exports = router;
