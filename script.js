/* GESTION DES FLECHES DU CAROUSEL */

let currentScrollPosition = 0;
let scrollAmount = 320;

const sCont = document.querySelector(".storys-container");
const hScroll = document.querySelector(".horizontal-scroll");
  
const btnScrollLeft = document.querySelector("#btn-scroll-left")
const btnScrollRight = document.querySelector("#btn-scroll-right")

btnScrollLeft.style.opacity = "0";



/*let maxScroll = -sCont.offsetWidth + hScroll.offsetWidth;*/


function scrollHorizontally(val){
  
  currentScrollPosition +=(val * scrollAmount);
  
  if(currentScrollPosition >= 0){
    currentScrollPosition = 0;
    btnScrollLeft.style.opacity = "0";   
  }else{
    btnScrollLeft.style.opacity = "1";
  }

  if(currentScrollPosition <= -620){
    btnScrollRight.style.display = "none";   
  }else{
    btnScrollRight.style.opacity = "1";
    btnScrollRight.style.display = "flex"; 
  }


  sCont.style.left = currentScrollPosition + "px";
}




/* LES FILMS LES MIEUX NOTÉS */


function myFetch (requete,sliderId){

fetch(requete)
.then(res => res.json())
.then(data => {
console.log(data.results);


// var i


let slider = document.getElementById(sliderId);
var index = slider.children.length;

for(let movie of data.results){ 
   slider.innerHTML+=`<img class="item" src="${movie.image_url}" data-id="${movie.id}" alt="film just stream it" data-index="${index}">` 
   index++

}

refreshSlider(slider);

$(".item").on("click",function(){
 var name = this.dataset.id;
 var prefixe = "http://localhost:8000/api/v1/titles/";
 let url = prefixe + name;
 console.log(url);


 fetch(url)
      .then(res => res.json())
      .then(data =>{

       document.getElementById("note-api").innerHTML= data.rated;
       //$("#note-api").text(data.rated); // innerHTML =
       $("#time").text(data.duration + " min");
       $("#date-api").text(data.date_published);
       $("#imdb-api").text(data.imdb_score);
       $("#pays-api").text(data.countries);
       $("#titre-api").text(data.title);
       $("#description-api").text(data.description);
       $("#realisateur-api").text("Réalisateur : " + data.directors);
       $("#genre-api").text("Genres : " + data.genres);
       $("#resultat-api").text("Résultats Box Office : " + data.worldwide_gross_income);
       $("#acteurs-api").text("Liste d'acteurs : " + data.actors);
       let cover = document.getElementById(cov)
       console.log(cover);
       var bcg = document.getElementById("imgPop");
       bcg.style.backgroundImage = "linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(24, 24, 24, 15)95.49%), url("+ data.image_url + ") "
       

       
      }  )

 //Ouvrir modale

 var modal = document.getElementById("myModal");
 
 modal.style.display = "block";

// cliquer pour fermer une modale
$(".close").on("click", function(){
  modal.style.display="none";
})


 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";   
   }
   };     
})   
});
};



myFetch('http://localhost:8000/api/v1/titles/?imdb_score_min=9', "slidertest", 5);
myFetch('http://localhost:8000/api/v1/titles/?imdb_score_min=9&page=2', "slidertest", 2);


myFetch('http://localhost:8000/api/v1/titles/?genre=Action', "slideraction");
myFetch('http://localhost:8000/api/v1/titles/?genre=Action&page=2', "slideraction");


myFetch('http://localhost:8000/api/v1/titles/?genre=Animation', "sliderdanimation");
myFetch('http://localhost:8000/api/v1/titles/?genre=Animation&page=2', "sliderdanimation");


myFetch('http://localhost:8000/api/v1/titles/?genre=Biography&page=2', "sliderbiography");
myFetch('http://localhost:8000/api/v1/titles/?genre=Biography&page=3', "sliderbiography");




function refreshSlider(slider){

  console.log(slider);
  console.log(slider.children);


  for(let item of slider.children){

    console.log(item.dataset);
    if(item.dataset.index<7){
      item.style.display="block";  
    }
    else{ item.style.display="none";
    }
  }

}  




