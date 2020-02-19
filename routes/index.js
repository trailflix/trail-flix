const express = require('express');
const router  = express.Router();
const axios = require('axios')
const youtubeSearch = require('youtube-search')
const User = require('../models/User')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movie/:id', function (req, res) {

  axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=c9f84c134bb1d07c82ecf21fbb8de863`)
  .then(response => {
    var opts={
      maxResults:1,
      key: `${process.env.YT_API}`
    };
    let movie = response.data


    youtubeSearch(`${movie.title} trailer`, opts, function(err, results) {
      if(err) return console.log(err);
      let video = results[0]
      console.log({video,movie})
      res.render("movie-detail",{video,movie})
    })
    
  })

});








// router.get('/movies', (req, res, next) => {





router.post("/movies/addMovie", (req, res) => {
  let movie = req.body.movie.id;
  console.log(movie)
  User.findByIdAndUpdate(req.user._id, {$push: {favlist: movie}})
  .then(()=> res.json({ok:true}))
  .catch((err)=>res.json(err))
});

module.exports = router
