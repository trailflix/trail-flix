require("dotenv").config();
const express = require('express');
const router  = express.Router();
const axios = require('axios')

var youtubeSearch = require('youtube-search');
 





router.get('/', (req,res,next) =>{

  var opts = {
    maxResults: 1,
    key:  `${process.env.YT_API}`
  };
   
  youtubeSearch('sonic trailer', opts, function(err, results) {
    if(err) return console.log(err);
    let video = results[0]
    console.log("ESTE ES EL VIDEO")
    console.log(video)
    res.render("youtubetest",video)
  })



    // res.render('youtubetest')



})

module.exports = router;