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
    res.redirect('login')
  }
}


router.get("/", (req, res) => {

  res.render("categories");
});


router.get("/action", ensureAuthenticated, (req, res) => {
  axios
    .get(

      "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=28&release_date.gte=2020-07-15&year=2020"
    )
    .then(response => {
      let moviesAction = response.data.results;
      res.render("action", { moviesAction });
    });
});

router.get("/drama", ensureAuthenticated, (req, res) => {
  axios
    .get(

      "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=18&release_date.gte=2020-07-15&year=2020"
    )
    .then(response => {
      let moviesDrama = response.data.results;
      res.render("drama", { moviesDrama });
    });
});

router.get("/comedy", ensureAuthenticated, (req, res) => {
  axios
    .get(

      "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=35&release_date.gte=2020-07-15&year=2020"
    )
    .then(response => {
      let moviesComedy = response.data.results;
      res.render("comedy", { moviesComedy });
    });
});

router.get("/terror", ensureAuthenticated, (req, res) => {
  axios
    .get(

      "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=27&release_date.gte=2020-07-15&year=2020"
    )
    .then(response => {
      let moviesTerror = response.data.results;
      res.render("terror", { moviesTerror });
    });
});

router.get("/romance", ensureAuthenticated, (req, res) => {
  axios
    .get(

      "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=10749&release_date.gte=2020-07-15&year=2020"
    )
    .then(response => {
      let moviesRomance = response.data.results;
      res.render("romance", { moviesRomance });
    });
});


router.get("/science_fiction", ensureAuthenticated, (req, res) => {
  axios
    .get(

      "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=878&release_date.gte=2020-07-15&year=2020"
    )
    .then(response => {
      let moviesScienceFiction = response.data.results;
      res.render("science_fiction", { moviesScienceFiction });
    });
});

module.exports = router



