const express = require('express');
const router = express.Router();
const axios = require('axios')
const youtubeSearch = require('youtube-search')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movie/:id', function (req, res) {

<<<<<<< HEAD
router.get('/movies', (req, res, next) => {
=======
  axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=c9f84c134bb1d07c82ecf21fbb8de863`)
  .then(response => {
    var opts={
      maxResults:1,
      key: `${process.env.YT_API}`
    };
    let movie = response.data

>>>>>>> f52b30531f5fb0641c4f8e372c77ef32f0783330

    youtubeSearch(`${movie.title} trailer`, opts, function(err, results) {
      if(err) return console.log(err);
      let video = results[0]
      res.render("youtubetest",video)
    })
<<<<<<< HEAD
});

=======
    // youtubeSearch(`${movie.title} trailer`, opts, fuction(err, results) {
    //     //if(err) return console.log(err)
    // // let video = result[0]
    // // res.render('youtubetest',video) //metan también movie {video,movie}
    // });
    //res.json(response.data);
  })

});


// router.get('/movies', (req, res, next) => {

//   axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2020-02-15&year=2020')
//     .then(response => {
//       let movies = response.data.results
//       res.render('movies', { movies })
//     })

// });
>>>>>>> f52b30531f5fb0641c4f8e372c77ef32f0783330

// router.get('/movies', (req,res,next) =>{

//     axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2020-02-15&year=2020')
//     .then(response =>{
//      let movies = response.data.results
//      res.render('movies',{movies})
//     })


// })

<<<<<<< HEAD

=======
>>>>>>> f52b30531f5fb0641c4f8e372c77ef32f0783330

module.exports = router
