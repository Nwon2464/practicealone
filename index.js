const express = require("express");
const app = express();
const passport = require("passport");
const passportSetup = require("./passport/passport");
const profileRouter = require("./routers/profileRouter");
const authRouter = require("./routers/authRouter");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieSession = require("cookie-session");

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO, () => {
  console.log("mongo connectedd!");
});

//router

app.use(
  cookieSession({
    name: "session",
    keys: ["abc"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());
//connecting to mongo

app.use("/auth", authRouter);

app.use("/profile", profileRouter);

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
app.listen(3000 || process.env.PORT, () => {
  console.log(`Listening ... on PORT ${process.env.PORT}`);
});
