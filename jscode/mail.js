const btn = document.querySelector(".btn");
const emailSent = document.querySelector(".email-sent");
const contacDiv = document.getElementById("contact");
const aceptBack = document.querySelector(".email-sent-ok");


btn.addEventListener("click", () => {
    contacDiv.style.zIndex = -1;
    contacDiv.style.display = "none";

    setTimeout(() => {
        emailSent.style.display = "flex";
        emailSent.style.zIndex = 0;
    }, 600)
})

aceptBack.addEventListener("click", () => {
    emailSent.style.zIndex = -1;
    emailSent.style.display = "none";
    
    setTimeout(() => {
        contacDiv.style.display = "flex";
        contacDiv.style.zIndex = 0;
    }, 600)

})

