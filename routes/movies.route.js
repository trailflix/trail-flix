const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get('/', (req,res,next) =>{
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c9f84c134bb1d07c82ecf21fbb8de863&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2020-02-15&year=2020')
  .then(response =>{
   const jsonMovies = response.data.results 
   
   res.render('movies', {jsonMovies})
  })
  .catch((err) => `the error was: ${err}`)
  
})







module.exports = router;


