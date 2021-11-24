const express = require("express");
const router = express.Router();

const multerUploader = require("../config/cloudinary");

// ********* require Book model in order to use it *********
const Cafe = require("../models/Cafes.model");
const Review = require("../models/Review.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/add-cafe", isLoggedIn, (req, res) => {
  res.render("users/add-cafe");
});

router.post("/add-cafe", multerUploader.single("imgUrl"), async (req, res) => {
  try {
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

    console.log(createdCafe);
    res.redirect("/cafes");
  } catch (error) {
    console.log(error);
    res.render("users/add-cafe");
  }
});

router.get("/", async (req, res) => {
  try {
    let listCafes = await Cafe.find();
    // console.log("cafes from db", listCafes);

    res.render("cafes/cafes", { listCafes });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.get("/cafe-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let cafe = await Cafe.findById(id).populate("beans");
    console.log("cafes from db",  cafe.image);

    let reviews = await Review.find({ cafeReviewed: id });
    res.render("cafes/cafe-details", { cafe, reviews });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.post("/cafe-review/:id", (req, res) => {
  const { id } = req.params;
  const { user, comment } = req.body;
  Review.create({ user, comment, cafeReviewed: id })
    .then((newReview) => {
      console.log("new review", newReview);
      res.redirect(`/cafes/cafe-details/${id}`);
    })
    .catch((err) => console.log(err));
});
router.get("/", async (req, res) => {
  try {
    let listCafes = await Cafe.find();
    // console.log("cafes from db", listCafes);

    res.render("cafes/cafes", { listCafes });
    console.log(listCafes);
  } catch (err) {
    (err) => console.log(err);
  }
});

module.exports = router;
