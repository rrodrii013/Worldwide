//A P I

const OpinionUsers = async () => {
    try {
        const respuesta = await fetch(`https://randomuser.me/api/?results=8`);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            const opiniones = datos.results;

            //Recorre cada tarjeta
            document.querySelectorAll('.opinion_card').forEach((tarjeta, index) => {

                //Obtiene los datos de la opinion correspondiente
                const opinion = opiniones[index];

                const img = tarjeta.querySelector('.pics_profile');
                const userName = tarjeta.querySelector('.user_name');

            
                img.src = opinion.picture.large;
                img.alt = 'Foto Usuario';

                //Coloca cada nombre en la variable userName
                userName.textContent = `${opinion.name.first} ${opinion.name.last}`
            
            })
        } else if (respuesta.status === 401) {
            console.log('401 Unauthorized');
        } else if (respuesta.status === 404) {
            console.log('404 Not Found');
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

// Llamando la función al cargar la página
document.addEventListener('DOMContentLoaded', OpinionUsers);





//CRONOMETRO 
let cronometro;
let crono = document.getElementById("crono");


function cronoRandom() {
   return Math.floor(Math.random() * 60)
}

const numeroAleatorio = cronoRandom(); 

function segundosRandom() {
    return Math.floor(Math.random() * 60)
}
 
const segundosAleatorio = segundosRandom(); 

let horas = numeroAleatorio;
let minutos = Math.trunc(numeroAleatorio / 2);
let segundos = segundosAleatorio ;


function actualizaContador() {


        segundos-- ;

        if (segundos === 0 ){
            segundos = 59 ;
            minutos --;
        }

        if ( minutos === 0 ){
            minutos = 59 ;
            horas--
        }

        if(horas === 0  && minutos === 0 && segundos === 0) {
            clearInterval(cronometro)
            return 
        }

     crono.innerHTML = formatNum(horas) + ':' + formatNum(minutos) + ':' + formatNum(segundos);

}

function formatNum(num) {
        return num < 10 ? '0' + num : num
}
  
crono.innerHTML = formatNum(horas) + ':' + formatNum(minutos) + ':' + formatNum(segundos);


function cronometroOn() {
        cronometro = setInterval(actualizaContador, 1000)
}
  cronometroOn()


  //CARRUSEL OPINIONES 


document.addEventListener('DOMContentLoaded', function() {
    let btnNext = document.getElementById("btn_next");
    let opiniones = document.querySelectorAll(".opinion_card");
    let opinionesVisibles = 4; // Queremos mostrar solo 4 opiniones por vez
    let indiceActual = 0; // Variable para llevar el seguimiento del índice actual del carrusel

// Ocultar todas las opiniones excepto las primeras opinionesVisibles
    for (let i = opinionesVisibles; i < opiniones.length; i++) {
        opiniones[i].style.display = 'none';
    }

    btnNext.addEventListener("click", function() {
    // Ocultar la primera opinión actual
        opiniones[indiceActual].style.display = 'none';

    // Incrementar el índice actual
       indiceActual++;

    // Si el índice actual supera el número de opiniones, lo reinicia a 0
        if (indiceActual >= opiniones.length) {
            indiceActual = 0;
        }

    // Mostrar la próxima opinión en el carrusel
        opiniones[(indiceActual + opinionesVisibles - 1) % opiniones.length].style.display = 'flex'; // Usando % aseguramos que el índice calculado esté dentro del rango válido
    });
});




