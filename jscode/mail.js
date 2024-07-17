const btn = document.querySelector(".btn");
const emailSent = document.querySelector(".email-sent");
const contacDiv = document.getElementById("contact");
const aceptBack = document.querySelector(".email-sent-ok");
const contactArticle = document.querySelector(".contactt");

btn.addEventListener("click", () => {
    emailSent.style.display = "flex";
    contacDiv.style.display = "none";
})

aceptBack.addEventListener("click", () => {
    emailSent.style.display = "none";
    contacDiv.style.display = "flex";
})