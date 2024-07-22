const btn = document.querySelector(".btn");
const emailSent = document.querySelector(".email-sent");
const contacDiv = document.getElementById("contact");
const aceptBack = document.querySelector(".email-sent-ok");

let inputs = document.querySelectorAll("#input");
let waring = document.querySelector(".required");
let inputClean = '';



btn.addEventListener("click", () => {

    let inputFull = true;

    inputs.forEach(input => {
        const inputt = input.value.trim();
        if (inputt === '') {
            inputFull = false;
        }
    });

   
        if (!inputFull) {
            waring.innerHTML = "Por favor, completa todos los campos."
        } else  { 
            contacDiv.style.zIndex = -1;
            contacDiv.style.display = "none";
        
            setTimeout(() => {
                emailSent.style.display = "flex";
                emailSent.style.zIndex = 0;
            }, 600)

        }
})

aceptBack.addEventListener("click", () => {
    
    // Cleaning data
    inputs.forEach(input => {
        input.value = inputClean
    });

    // If waring is true, we remove it
    waring.style.display = "none";

    emailSent.style.zIndex = -1;
    emailSent.style.display = "none";
    
    setTimeout(() => {
        contacDiv.style.display = "flex";
        contacDiv.style.zIndex = 0;
    }, 600)

});




