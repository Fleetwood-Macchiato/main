const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");

router.use(isLoggedIn);
/* GET users listing. */
router.get("/user-profile", function (req, res, next) {
  res.render("user/user-profile");
});

module.exports = router;
