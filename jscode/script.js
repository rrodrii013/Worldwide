//A P I OPINIONS

const OpinionUsers = async () => {
  try {
    const respuesta = await fetch(`https://randomuser.me/api/?results=8`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      const opiniones = datos.results;

      //Recorre cada tarjeta
      document.querySelectorAll(".opinion_card").forEach((tarjeta, index) => {
        //Obtiene los datos de la opinion correspondiente
        const opinion = opiniones[index];

        const img = tarjeta.querySelector(".pics_profile");
        const userName = tarjeta.querySelector(".user_name");

        img.src = opinion.picture.large;

        //Coloca cada nombre en la variable userName
        userName.textContent = `${opinion.name.first} ${opinion.name.last}`;
      });
    } else if (respuesta.status === 401) {
      console.log("401 Unauthorized");
    } else if (respuesta.status === 404) {
      console.log("404 Not Found");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

// Llamando la función al cargar la página
document.addEventListener("DOMContentLoaded", OpinionUsers);

//SCROLL FROM HOME TO CONTACT

let btnHome = document.querySelector(".btn-home");

function scrollWindow() {
  let contact = document.querySelector(".contactt");
  contact.scrollIntoView({ behavior: "smooth" });
}

btnHome.addEventListener("click", () => {
  scrollWindow();
});

//CRONOMETRO
let cronometro;
let crono = document.getElementById("crono");

function cronoRandom() {
  return Math.floor(Math.random() * 60);
}

const numeroAleatorio = cronoRandom();

function segundosRandom() {
  return Math.floor(Math.random() * 60);
}

const segundosAleatorio = segundosRandom();

let horas = numeroAleatorio;
let minutos = Math.trunc(numeroAleatorio / 2);
let segundos = segundosAleatorio;

function actualizaContador() {
  segundos--;

  if (segundos === 0) {
    segundos = 59;
    minutos--;
  }

  if (minutos === 0) {
    minutos = 59;
    horas--;
  }

  if (horas === 0 && minutos === 0 && segundos === 0) {
    clearInterval(cronometro);
    return;
  }

  crono.innerHTML =
    formatNum(horas) + ":" + formatNum(minutos) + ":" + formatNum(segundos);
}

function formatNum(num) {
  return num < 10 ? "0" + num : num;
}

crono.innerHTML =
  formatNum(horas) + ":" + formatNum(minutos) + ":" + formatNum(segundos);

function cronometroOn() {
  cronometro = setInterval(actualizaContador, 1000);
}
cronometroOn();



//CARRUSEL OPINIONES

document.addEventListener("DOMContentLoaded", function () {
  let btnNext = document.getElementById("btn_next");
  let opiniones = document.querySelectorAll(".opinion_card");
  let opinionesVisibles = 4; // Por defecto, 4 opiniones visibles
  let indiceActual = 0; // Índice inicial del carrusel

  // Detectar el tamaño de la pantalla
  function actualizarOpinionesVisibles() {
    if (window.matchMedia("(max-width: 467px)").matches) {
      opinionesVisibles = 1;
    } else {
      opinionesVisibles = 4;
    }
    mostrarOpiniones(); // Actualizar la visualización de opiniones
  }

  // Función para mostrar las opiniones del carrusel
  function mostrarOpiniones() {
    // Ocultar todas las opiniones
    opiniones.forEach(opinion => opinion.style.display = "none");

    // Mostrar el conjunto actual de opiniones
    for (let i = 0; i < opinionesVisibles; i++) {
      let indice = (indiceActual + i) % opiniones.length;
      opiniones[indice].style.display = "flex";
    }
  }

  // Inicializar mostrando las primeras opiniones
  actualizarOpinionesVisibles();

  btnNext.addEventListener("click", function () {
    // Incrementar el índice actual para avanzar una opinión
    indiceActual = (indiceActual + 1) % opiniones.length;

    // Mostrar las opiniones actualizadas
    mostrarOpiniones();
  });

  // Actualizar la cantidad de opiniones visibles cuando cambia el tamaño de la ventana
  window.addEventListener("resize", actualizarOpinionesVisibles);
});


//CARRUSEL VIAJES

let index = 0;
const viajes = document.querySelectorAll(".card");
const totalViajes = viajes.length;
let responsiveWindow = window.innerWidth;
let carrusel;
let carrusel767;

function carruselTop() {
  document.querySelector(".active").classList.remove("active");

  index = (index + 1) % totalViajes; // Vuelve a 0 después de la última tarjeta
  viajes[index].classList.add("active");

  const offset = -index * 470; // 450px width + 20px margin
  document.getElementById(
    "carrusel"
  ).style.transform = `translateX(${offset}px)`;
}

function startCarrusel() {
  carrusel = setInterval(carruselTop, 2000);
}

function stopCarrusel() {
  clearInterval(carrusel);
}

function resetCarruselPosition() {
  document.getElementById("carrusel").style.transform = "translateX(0)";
}

function handleResize() {
  responsiveWindow = window.innerWidth < 479;
  if (responsiveWindow) {
    startCarrusel();
  } else {
    stopCarrusel();
    resetCarruselPosition();
  }
}

window.addEventListener("resize", function () {
  stopCarrusel();
  handleResize();
});
