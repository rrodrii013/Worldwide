// RESPONSIVE MENU

let menuBtn = document.querySelector(".icon-menu");
let cancelIcon = document.querySelector(".icon-cancel-circle");
let nav = document.querySelector(".responsive-nav");
nav.style.display = "none";

menuBtn.addEventListener("click", () => {
if(nav.style.display == "none") {
  nav.style.display = "flex";
  }else {
    nav.style.display = "none";
  }
});

cancelIcon.addEventListener("click", () => {
  nav.style.display = "none";
});

document.addEventListener("click", function(event){
if(!nav.contains(event.target) && !menuBtn.contains(event.target) && !cancelIcon.contains(event.target)) {
  nav.style.display = "none";
} 
})