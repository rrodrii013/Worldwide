/*import KEYS from "../jscode/keys.js";

let cards = document.querySelectorAll('.card');
let name = document.querySelectorAll('.country-name');
let imgs = document.querySelectorAll(".country");
const templateTours = document.getElementById("tours-template");
const fragment = document.createDocumentFragment();
const options = {headers: {Authorization: `Bearer ${KEYS.secret}`}}

let products, prices;
Promise.all([
    fetch("https://api.stripe.com/v1/products", options),
    fetch("https://api.stripe.com/v1/prices", options)
])

.then(responses => Promise.all(responses.map(res => res.json())))
.then(json => {
    products = json[0].data
    prices = json[1].data
        prices.forEach((el, index) => {
            let productData = products.filter(product => product.id === el.product);
            let imgToAdd = productData[0].images[0];

                if(productData.length > 0 && index < cards.length && index < imgs.length) {
                cards.forEach((card, cardIndex) => {
                    if(cardIndex === index) {
                        let nameData = productData[0].name;
                        card.innerHTML = nameData.toUpperCase();
                        imgs.src = imgToAdd[index]
                    }

                })
          
            }
        })
})

.catch(error => console.log('Error:' + error))*/

import KEYS from "../jscode/keys.js";

let cards = document.querySelectorAll('.card');
const options = { headers: { Authorization: `Bearer ${KEYS.secret}` } };

let products, prices;
Promise.all([
    fetch("https://api.stripe.com/v1/products", options),
    fetch("https://api.stripe.com/v1/prices", options)
])
.then(responses => Promise.all(responses.map(res => res.json())))
.then(json => {
    products = json[0].data;
    prices = json[1].data;

    prices.forEach((el, index) => {
        let productData = products.filter(product => product.id === el.product);

        if (productData.length > 0 && index < cards.length) {
            let nameData = productData[0].name;
            let imgToAdd = productData[0].images[0];

            // Encuentra los elementos dentro de la tarjeta correspondiente
            let card = cards[index];
            let nameElement = card.querySelector('.country-name');
            let imgElement = card.querySelector('.country');

            // Actualiza el contenido del nombre y la imagen
            if (nameElement) {
                nameElement.innerHTML = nameData.toUpperCase();
            }

            if (imgElement) {
                imgElement.src = imgToAdd;
            }
        }
    });
})
.catch(error => console.error('Error fetching data:', error));

    /*card = ` <div class="card">
    <img src="" alt="">
    <h2 class="country-name">ESPAÑA</h2>
        <div class="footer-card">
            <img src="/images/ubicacion.png"> 
            <h2>Europa</h2>
            <img src="/images/calendario.png" alt="">
            <h2>7 días</h2>
            <div class="card-cost">
                <h2 class="cost"> USD 750</h2>
            </div>
        </div>
    </div>` */ 
