window.onload = function() {
  let addFavBtn = document.querySelector("#button");
  let deleteFavBtn = document.querySelectorAll(".btn-delete");

  if (addFavBtn) {
    addFavBtn.onclick = function() {
      let hiddenId = document.querySelector("#hiddenId").value;
      let hiddenName = document.querySelector("#hiddenName").value;
      let hiddenImage = document.querySelector("#hiddenImage").value;
      let favMovie = {
        id: hiddenId,
        title: hiddenName,
        img: hiddenImage
      };
      axios
        .post("/movies/addMovie", favMovie)
        .then(() => console.log(favMovie));
    };
  }

  if (deleteFavBtn) {
    deleteFavBtn.forEach(button => {
      button.addEventListener("click", function() {
        let idMovie = document.querySelector(".movie-id").value;
        console.log(idMovie);
        deleteMovie(idMovie);
      });
    });
  }


  function deleteMovie(id){
    axios.post(`/delete/${id}`,{id})
    .then(()=>console.log("ok"))
  }



}




