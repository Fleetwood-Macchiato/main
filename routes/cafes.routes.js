const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Cafe = require("../models/Cafes.model");
const Review = require("../models/Review.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/add-cafe", isLoggedIn, (req, res) => {
  res.render("users/add-cafe");
});

router.post("/add-cafe", async (req, res) => {
  try {
    const { name, address, priceLevel, image, beans } = req.body;
    const createdCafe = await Cafe.create({
      name,
      address,
      priceLevel,
      image,
      beans,
    });

    console.log(createdCafe);
    res.redirect("/cafes");
  } catch (error) {
    console.log(error);
    res.render("users/add-cafe");
  }
});

router.get("/delete/:id",(req, res)=>{
  Cafe.findByIdAndDelete(req.params.id)
  .then(deletedCafe => res.redirect("/cafes"))
  .catch(error=> console.log(error))
})

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
    console.log("cafes from db", cafe);

    res.render("cafes/cafe-details", { cafe });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.post("/cafe-review/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, comment } = req.body;
    const review = await Review.create({ user, comment, cafeReviewed: id });
    console.log("new review", review);
    res.redirect(`/cafes/cafe-details/${id}`);
  } catch (err) {
    (err) => console.log(err);
  }
});

module.exports = router;
