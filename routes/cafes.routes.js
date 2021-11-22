const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Cafe = require("../models/Cafes.model");

router.get("/", async (req, res) => {
  try {
    let listCafes = await Cafe.find();
    console.log("cafes from db", listCafes);

    res.render("/cafes/cafes", { listCafes });
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

module.exports = router;
