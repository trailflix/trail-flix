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
}

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
    //   youtubeSearch(`${movie.title} trailer`, opts, function(err, results) {
    //  if(err) return console.log(err);
    //   let video = results[0]
    //   console.log({video,movie})
      res.render("movie-detail", {/*video, */movie})
    
    
  })

})





router.post("/movies/addMovie", (req, res) => {
  console.log(req.body)
  let movie = req.body;
  
  User.findByIdAndUpdate(req.user._id, {$push: {favlist: movie}})
  .then(()=> res.json({ok:true}))
  .catch((err)=>res.json(err))

  
});

module.exports = router

router.post('/delete/:id', (req,res) =>{
  console.log(req.body)
  User.findByIdAndUpdate(req.user._id, {$pull: {favlist: {id: req.body.id}}})
  .then(()=>{
    res.redirect("/auth/profile")
    .then(err => console.log(err))
  })
})

/* router.delete("/auth/profile", (req, res) => {
  console.log('hago algo')
}) */


// router.get("/categories", (req, res) => {

//   res.render("categories");
// });

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('login')
//   }
// }


// router.get("/categories", (req, res) => {

//   res.render("categories");
// });


// router.get("/action", ensureAuthenticated, (req, res) => {
//   axios
//     .get(

//       "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=28&release_date.gte=2020-07-15&year=2020"
//     )
//     .then(response => {
//       let moviesAction = response.data.results;
//       res.render("action", { moviesAction });
//     });
// });

// router.get("/drama", ensureAuthenticated, (req, res) => {
//   axios
//     .get(

//       "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=18&release_date.gte=2020-07-15&year=2020"
//     )
//     .then(response => {
//       let moviesDrama = response.data.results;
//       res.render("drama", { moviesDrama });
//     });
// });

// router.get("/comedy", ensureAuthenticated, (req, res) => {
//   axios
//     .get(

//       "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=35&release_date.gte=2020-07-15&year=2020"
//     )
//     .then(response => {
//       let moviesComedy = response.data.results;
//       res.render("comedy", { moviesComedy });
//     });
// });

// router.get("/terror", ensureAuthenticated, (req, res) => {
//   axios
//     .get(

//       "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=27&release_date.gte=2020-07-15&year=2020"
//     )
//     .then(response => {
//       let moviesTerror = response.data.results;
//       res.render("terror", { moviesTerror });
//     });
// });

// router.get("/romance", ensureAuthenticated, (req, res) => {
//   axios
//     .get(

//       "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=10749&release_date.gte=2020-07-15&year=2020"
//     )
//     .then(response => {
//       let moviesRomance = response.data.results;
//       res.render("romance", { moviesRomance });
//     });
// });


// router.get("/science_fiction", ensureAuthenticated, (req, res) => {
//   axios
//     .get(

//       "https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&with_genres=878&release_date.gte=2020-07-15&year=2020"
//     )
//     .then(response => {
//       let moviesScienceFiction = response.data.results;
//       res.render("science_fiction", { moviesScienceFiction });
//     });
// });






