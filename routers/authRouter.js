const router = require("express").Router();
const passport = require("passport");
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  console.log(req);
  res.redirect("/profile");
});

module.exports = router;
