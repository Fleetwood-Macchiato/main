const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");

router.use(isLoggedIn);
/* GET users listing. */
router.get("/profile", function (req, res, next) {
    res.render("users/profile");
});


module.exports = router;
