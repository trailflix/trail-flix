
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


document.querySelector('#button').onclick = function () {
  
    let hiddenId = document.querySelector("#hiddenId").value
    let hiddenName = document.querySelector("#hiddenName").value
    let hiddenImage = document.querySelector("#hiddenImage").value
   



    let favMovie = {
      id: hiddenId,
      title:hiddenName,
      img:hiddenImage
    }
    axios.post('/movies/addMovie', favMovie)
    .then(()=>console.log(favMovie))

}

document.querySelector('#delete-film').onclick = function () {
  
  let hiddenprofileId = document.querySelector("#hiddenId").value
  

  axios.post('/movies/addMovie', {hiddenprofileId})
  .then(()=>console.log(hiddenprofileId))

}




  
    
  

