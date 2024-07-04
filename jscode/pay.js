import KEYS from "../jscode/keys.js";

let offerCard1 = document.querySelector(".tarjeta1");
let offerCard2 = document.querySelector(".tarjeta2");
let offerCard3 = document.querySelector(".tarjeta3");
let cards = document.querySelectorAll(".card");
let moneyValor = (num) => `${num.slice(0, -2)}`;
const options = { headers: { Authorization: `Bearer ${KEYS.secret}` } };

let products, prices;
Promise.all([
  fetch("https://api.stripe.com/v1/products", options),
  fetch("https://api.stripe.com/v1/prices", options),
])
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((json) => {

    console.log(json);
    products = json[0].data;
    prices = json[1].data;



    let finallyProducts = products.slice();
    let finallyPrices = prices.slice();

    finallyProducts.splice(0, 2);
    finallyPrices.splice(0, 2);
 

    console.log(finallyProducts);
    console.log(finallyPrices);

             //T E S T S
    //packs's names
    /*let grandeItalia = products[0].name //Grande Italia
    console.log(grandeItalia)
    let grandItaliaPrice = prices[1].currency + ' ' + prices[1].unit_amount_decimal //Grande Italia price
    console.log(grandItaliaPrice)

   

    let outProducts = products.shift();
    let outPrices = prices.shift();

    console.log(products)
    console.log(prices) */



    finallyPrices.forEach((el, index) => {
      // I connected the arrays
      let productData = finallyProducts.filter((product) => product.id === el.product);

      if (productData.length > 0 && index < cards.length) {
        //here i'm call the information
        let nameData = productData[0].name;
        let imgToAdd = productData[0].images[0];
        let usd = el.currency.toUpperCase();
        let priceToAdd = moneyValor(el.unit_amount_decimal);

        //here i'll put the information
        let card = cards[index];
        card.setAttribute("data-price", el.id);
        let nameElement = card.querySelector(".country-name");
        let imgElement = card.querySelector(".country");
        let priceElement = card.querySelector(".cost");

        //take the information and put in the design place

        if (nameElement) {
          nameElement.innerHTML = nameData.toUpperCase();
        }

        if (imgElement) {
          imgElement.src = imgToAdd;
        }

        if (priceElement) {
          priceElement.innerHTML = `${usd} ${priceToAdd}`;
        }
      }
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

document.addEventListener("click", (e) => {
  if (e.target.matches(".card *")) {
    //* select all the .card´s childs
    let priceId = e.target.parentElement.getAttribute("data-price");

    console.log(priceId);

    Stripe(KEYS.public)
      .redirectToCheckout({
        lineItems: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment", //Use payment for a single payment. If u want that will be mensual you should use "suscribtion"
        successUrl: "http://127.0.0.1:5500/assets/sucess.html",  //We find this with window.location.href
        cancelUrl: "http://127.0.0.1:5500/assets/cancel.html",
      })
      .then((err) => {
        err = "Ocurrio un error:" + err;
      });
  }
});
