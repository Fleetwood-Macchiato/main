const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Cafe = require("../models/Cafes.model");

router.get("/", async (req, res) => {
  try {
    let cafeList = await Cafe.find();
    console.log("cafes from db", cafeList);

    res.render("cafes/cafes", { cafeList });
  } catch (err) {
    (err) => console.log(err);
  }
});

router.get("/cafe-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let cafe = await Cafe.findById(id);
    console.log("cafes from db", cafe);

    res.render("cafes/cafe-details", { cafe });
  } catch (err) {
    (err) => console.log(err);
  }
});

module.exports = router;
