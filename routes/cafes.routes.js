const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Cafe = require("../models/Cafes.model");

router.get("/add-cafe", (req, res) => {
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
    res.render("/add-cafe");
  }
});


router.get("/", async (req, res) => {
  try {
    let listCafes = await Cafe.find();
    console.log("cafes from db", listCafes);

    res.render("cafes/cafes", { listCafes });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.get("/cafe-details", async (req, res) => {
  try {
    let listCafes = await Cafe.find();
    console.log("cafes from db", listCafes);

    res.render("cafes/cafe-details", { listCafes });
  } catch (err) {
    (err) => console.log(err);
  }
});

//add cafes

module.exports = router;
