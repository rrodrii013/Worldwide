
import KEYS from "../jscode/keys.js";

let cards = document.querySelectorAll('.card');
let moneyValor = num => `${num.slice(0, -2)}`;
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

    console.log(prices);

    prices.forEach((el, index) => {
        // I connected the arrays
        let productData = products.filter(product => product.id === el.product);

        if (productData.length > 0 && index < cards.length) {

            //where i'm call the information
            let nameData = productData[0].name;
            let imgToAdd = productData[0].images[0];
            let usd = el.currency.toUpperCase();
            let priceToAdd = moneyValor(el.unit_amount_decimal); 
            
            //where i'll put the information
            let card = cards[index];
            let nameElement = card.querySelector(".country-name");
            let imgElement = card.querySelector(".country");
            let priceElement = card.querySelector(".cost");

            //take the information and put in the design place

            if(nameElement) {
                nameElement.innerHTML = nameData.toUpperCase();
            }

            if(imgElement) {
                imgElement.src = imgToAdd;
            }

            if(priceElement){
                priceElement.innerHTML = `${usd} ${priceToAdd}`
            }

        }
    })
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
