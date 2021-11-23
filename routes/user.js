const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");

router.use(isLoggedIn);
/* GET users listing. */
router.get("/profile", function (req, res, next) {
    res.render("users/profile");
});

router.get("/favorites", async (req, res) => {
    try {
  
      res.render("users/favorites", {  });
    } catch (err) {
      (err) => console.log(err);
    }
  });

module.exports = router;
