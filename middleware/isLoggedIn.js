function isLoggedIn(req, res, next) {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

module.exports = isLoggedIn;
