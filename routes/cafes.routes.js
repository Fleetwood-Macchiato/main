const express = require("express");
const router = express.Router();

const multerUploader = require("../config/cloudinary");

// ********* require Book model in order to use it *********
const Cafe = require("../models/Cafes.model");
const Review = require("../models/Review.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/add-cafe", isLoggedIn, (req, res) => {
  let userLoggedIn;
  if (req.session.loggedInUser) userLoggedIn = true;
  else userLoggedIn = false;
  res.render("users/add-cafe", { userLoggedIn });
});

router.post("/add-cafe", multerUploader.single("imgUrl"), async (req, res) => {
  try {
    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;

    const { name, address, priceLevel, image, beans } = req.body;
    let imgUrl;
    if (req.file) {
      imgUrl = req.file.path;
    } else {
      imgUrl =
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1478&q=80";
    }

    const createdCafe = await Cafe.create({
      name,
      address,
      priceLevel,
      imgUrl,
      beans,
    });

    res.redirect("/cafes");
  } catch (error) {
    res.render("users/add-cafe", { userLoggedIn });
  }
});

router.get("/", async (req, res) => {
  try {
    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;

    let listCafes = await Cafe.find();
    res.render("cafes/cafes", { listCafes, userLoggedIn });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.get("/cafe-details/:id", async (req, res) => {
  try {
    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;

    const { id } = req.params;
    let cafe = await Cafe.findById(id).populate("beans");

    let reviews = await Review.find({ cafeReviewed: id });
    res.render("cafes/cafe-details", { cafe, reviews, userLoggedIn });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.post("/cafe-review/:id", (req, res) => {
  const { id } = req.params;
  const { user, comment } = req.body;
  Review.create({ user, comment, cafeReviewed: id })
    .then((newReview) => {
      res.redirect(`/cafes/cafe-details/${id}`);
    })
    .catch((err) => console.log(err));
});
router.get("/", async (req, res) => {
  try {
    let userLoggedIn;
    if (req.session.loggedInUser) userLoggedIn = true;
    else userLoggedIn = false;

    let listCafes = await Cafe.find();
    res.render("cafes/cafes", { listCafes, userLoggedIn });
  } catch (err) {
    (err) => console.log(err);
  }
});

module.exports = router;
