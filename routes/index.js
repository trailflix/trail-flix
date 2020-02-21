const express = require('express');
const router  = express.Router();
const axios = require('axios')
const youtubeSearch = require('youtube-search')
const User = require('../models/User')
/* GET home page */


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('login')
  }
};

router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/search', (req, res, next) => {
  res.render('search');
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

    res.render("movie-detail", {video, movie})
    
    
  })

})


})

  router.post("/search", ensureAuthenticated, (req, res) => {
    let film = req.body.query
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&language=en-US&query=" +
          film +
          "&page=1&include_adult=false"
      )
      .then(response => {
        console.log(response)
        let movies = response.data.results;
        res.render("search", {movies});
     //   console.log(jsondata);
      });
  });
})


router.post("/movies/addMovie", (req, res) => {
  console.log(req.body)
  let movie = req.body;
  
  User.findByIdAndUpdate(req.user._id, {$push: {favlist: movie}})
  .then(()=> res.json({ok:true}))
  .catch((err)=>res.json(err))

  
});

router.post('/delete/:id', (req,res) =>{
  console.log(req.body)
  User.findByIdAndUpdate(req.user._id, {$pull: {favlist: {id: req.body.id}}})
  .then(()=>{
    res.redirect("/auth/profile")
    .then(err => console.log(err))
  })
})

module.exports = router







