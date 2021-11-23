function isNotLoggedIn(req, res, next) {
  if (req.session.loggedInUser) {
    res.redirect("/private/profile");
  } else {
    next();
  }
}

module.exports = isNotLoggedIn;
