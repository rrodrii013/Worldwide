import KEYS from "../jscode/keys.js";

let offerCard1 = document.querySelector(".tarjeta1");
let offerCard2 = document.querySelector(".tarjeta2");
let offerCard3 = document.querySelector(".tarjeta3");
let cards = document.querySelectorAll(".card");
let moneyValor = (num) => `${num.slice(0, -2)}`;
const options = { headers: { Authorization: `Bearer ${KEYS.secret}` } };

  // We'll save data here
let products = [];
let prices = [];


  // Stripe allow 10 calls to the server, bt we have to call more times
const fetchAllProducts = async () => {
  let hasMore = true;
  let startingAfter = null;

  while (hasMore) {
    const response = await fetch(`https://api.stripe.com/v1/products?limit=10${startingAfter ? `&starting_after=${startingAfter}` : ''}`, options);
    const data = await response.json();

    products = products.concat(data.data);
    hasMore = data.has_more;
    if (hasMore) {
      startingAfter = data.data[data.data.length - 1].id;
    }
  }
};

const fetchAllPrices = async () => {
  let hasMore = true;
  let startingAfter = null;

  while (hasMore) {
    const response = await fetch(`https://api.stripe.com/v1/prices?limit=10${startingAfter ? `&starting_after=${startingAfter}` : ''}`, options);
    const data = await response.json();

    prices = prices.concat(data.data);
    hasMore = data.has_more;
    if (hasMore) {
      startingAfter = data.data[data.data.length - 1].id;
    }
  }
};

const initialize = async () => {
  await Promise.all([fetchAllProducts(), fetchAllPrices()]);

  if (!products || !prices) {
    throw new Error("Missing data from API responses");
  }

  let finallyProducts = products.slice();
  let finallyPrices = prices.slice();

  finallyProducts.splice(0, 3);
  finallyPrices.splice(0, 3);

  finallyPrices.forEach((el, index) => {
    let productData = finallyProducts.filter((product) => product.id === el.product);

    if (productData.length > 0 && index < cards.length) {
      let nameData = productData[0].name;
      let imgToAdd = productData[0].images[0];
      let usd = el.currency.toUpperCase();
      let priceToAdd = moneyValor(el.unit_amount_decimal);

      let card = cards[index];
      card.setAttribute("data-price", el.id);
      let nameElement = card.querySelector(".country-name");
      let imgElement = card.querySelector(".country");
      let priceElement = card.querySelector(".cost");

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
};

initialize().catch((error) => console.error("Error fetching data:", error));

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