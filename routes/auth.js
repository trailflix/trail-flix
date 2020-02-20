const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const axios = require("axios");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("login");
  }
}

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {

  res.render("auth/profile", { user: req.user });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('login')
  }
}

router.get("/movies", ensureAuthenticated, (req, res) => {
  axios
    .get(
      "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&release_date.gte=2020-07-15&year=2020"
    )
    .then(response => {
      let movies = response.data.results;
      res.render("auth/movies", { movies });
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  /* function token (){
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
  }; */

  const email = req.body.email;
  //const confirmationCode = token();

  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
      //confirmationCode
    });

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EPASSWORD}`
      }
    });

    transporter
      .sendMail({
        from: `${process.env.EMAIL}`,
        to: `<${email}>`,
        subject: "Awesome Subject",
        text: "Awesome Message",
        html: `<b>Welcome to trail-flix</b>` //http://localhost:3000/auth/confirm/${confirmationCode}
      })
      .then(info => console.log(info))
      .catch(error => console.log(error));

    newUser
      .save()
      .then(() => {
        res.redirect("/auth/movies");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

/* router.get("/confirm/:confirmCode", (req, res) => {
  User.findOneAndUpdate( {confirmationCode: req.params.confirmCode},{ status: 'Active'})
  .then(updatedUser => {
    res.render('auth/confirmation', {updatedUser});
  });
}); */

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});




module.exports = router;
