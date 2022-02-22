
// GESTION DES FLECHES DU SLIDER


let currentScrollPosition = 0;
let scrollAmount = 320;

const sCont = document.querySelector(".storys-container");
const hScroll = document.querySelector(".horizontal-scroll");
  
const btnScrollLeft = document.querySelectorAll(".btn-scroll-left")
const btnScrollRight = document.querySelectorAll(".btn-scroll-right")


for(let left of btnScrollLeft){

  left.addEventListener("click", function(e){

    let slider = e.target.closest(".horizontal-scroll").children[2];
    console.log(slider);

    let previewValue = parseInt(slider.style.left.split("px")[0]) || 0
    console.log(previewValue);
     
    slider.style.left =  Math.min(0,(previewValue +200)).toString() + "px";




  })


}

for(let right of btnScrollRight){

  right.addEventListener("click", function(e){

    let slider = e.target.closest(".horizontal-scroll").children[2];


    let previewValue = parseInt(slider.style.left.split("px")[0]) || 0
    console.log(previewValue);
  
    slider.style.left = Math.max(-600,(previewValue -200)).toString() + "px";



 





  })
}



// CONDITION D'AFFICHAGE DES FLECHES DANS LE SLIDER


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




// FONCTION POUR RÉCUPÉRER LES ÉLÉMENTS PAR PAGES ET LES AFFICHER DANS LES BONS SLIDERS


function myFetch (requete,sliderId){

fetch(requete)
.then(res => res.json())
.then(data => {
console.log(data.results);


// RÉCUPÉRER INDEX DES ÉLÉMENTS POUR LIMITER LE NB D'AFFICHAGE PAR SLIDE


let slider = document.getElementById(sliderId);
var index = slider.children.length;

for(let movie of data.results){ 
   slider.innerHTML+=`<img class="item" src="${movie.image_url}" data-id="${movie.id}" alt="film just stream it" data-index="${index}">` 
   index++

}

//RÉCUPÉRATION DES IMAGES ET ID'S POUR LES SLIDER AVEEC LA REQUÊTE API

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
       document.getElementById("date-api").innerHTML= data.date_published;
       document.getElementById("time").innerHTML= data.duration + " min";
       document.getElementById("imdb-api").innerHTML= data.imdb_score;
       document.getElementById("pays-api").innerHTML= data.countries;
       document.getElementById("titre-api").innerHTML= data.title;
       document.getElementById("description-api").innerHTML= data.description;
       document.getElementById("realisateur-api").innerHTML= "Réalisateur : " + data.directors;
       document.getElementById("genre-api").innerHTML= "Genres : " + data.genres;
       document.getElementById("resultat-api").innerHTML= "Résultats Box Office : " + data.worldwide_gross_income;
       document.getElementById("acteurs-api").innerHTML= "Liste d'acteurs : " + data.actors;
       


       let cover = document.getElementById(cov)
       console.log(cover);
       var bcg = document.getElementById("imgPop");
       bcg.style.backgroundImage = "linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(24, 24, 24, 15)95.49%), url("+ data.image_url + ") "
       

       
      }  )



 // OUVERTURE DE LA MODALE


 var modal = document.getElementById("myModal");
 
 modal.style.display = "block";





// CLIC POUR FERMER LA MODALE


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


// FONCTION POUR RÉCUPÉRER LES ÉLÉMENTS PAR PAGES ET LES AFFICHER DANS LES BONS SLIDERS


myFetch('http://localhost:8000/api/v1/titles/?imdb_score_min=9', "slidertest");
myFetch('http://localhost:8000/api/v1/titles/?imdb_score_min=9&page=2', "slidertest");


myFetch('http://localhost:8000/api/v1/titles/?genre=Action', "slideraction");
myFetch('http://localhost:8000/api/v1/titles/?genre=Action&page=2', "slideraction");


myFetch('http://localhost:8000/api/v1/titles/?genre=Animation', "sliderdanimation");
myFetch('http://localhost:8000/api/v1/titles/?genre=Animation&page=2', "sliderdanimation");


myFetch('http://localhost:8000/api/v1/titles/?genre=Biography&page=2', "sliderbiography");
myFetch('http://localhost:8000/api/v1/titles/?genre=Biography&page=3', "sliderbiography");




// DÉTERMINER LE NOMBRE DE FILM PAR SLIDER 


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




