// RESPONSIVE MENU

let menuBtn = document.querySelector(".icon-menu");
let cancelIcon = document.querySelector(".icon-cancel-circle");
let nav = document.querySelector(".responsive-nav");
nav.style.display = "none";
menuBtn.addEventListener("click", () => {
  nav.style.display = "flex";
});
cancelIcon.addEventListener("click", () => {
  nav.style.display = "none";
});