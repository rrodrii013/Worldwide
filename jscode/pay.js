import KEYS from "../jscode/keys.js";
const tours = document.getElementById("tours");
const card = document.querySelector('.card');
const fragment = document.createDocumentFragment();
const options = {headers: {Authorization: `Bearer ${KEYS.secret}`}}

let products, price;

Promise.all([
    fetch("https://api.stripe.com/v1/products", options),
    fetch("https://api.stripe.com/v1/prices", options)
])

.then(responses => Promise.all(responses.map(res => res.json())))
.then(json => console.log(json));