const passport = require("passport");
const User = require("../models/mongo");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.serializeUser((user, done) => {
  console.log(user);
  console.log("serilzalizse");
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log("deserialize");
  console.log(id);
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientId,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOne({
        googleId: profile.id,
      })
        .then((exist) => {
          if (exist) {
            console.log("From Mongo db if statement");
            done(null, exist);
          } else {
            new User({
              username: profile.displayName,
              googleId: profile.id,
       
            })
              .save()
              .then((newUser) => {
                console.log("From Mongo Db else statement", newUser);
                done(null, newUser);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  )
);
