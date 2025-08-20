const BASE_URL = "https://open.er-api.com/v6/latest/";

// select elements
let amountInput = document.querySelector("input");
let fromCurr = document.querySelector(".select-container select");
let toCurr = document.querySelector(".select-container2 select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");

// event listener
btn.addEventListener("click", async (e) => {
  e.preventDefault(); // prevent form submit refresh

  let amount = amountInput.value;
  if (amount === "") {
    msg.innerText = "Please enter a valid amount!";
    return;
  }

  let from = fromCurr.value;
  let to = toCurr.value;

  try {
    // fetch API data
    let response = await fetch(`${BASE_URL}${from}`);
    let data = await response.json();

    // conversion
    let rate = data.rates[to];
    let finalAmount = (amount * rate).toFixed(2);

    msg.innerText = `${amount} ${from} = ${finalAmount} ${to}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate!";
    console.error(error);
  }
});

// function to update flag
function updateFlag(selectElement, imgElement) {
  let currency = selectElement.value;   // e.g. "USD"
  // take first 2 letters (country code)
  let countryCode = "";
  if (currency === "USD") countryCode = "US";
  if (currency === "INR") countryCode = "IN";
  if (currency === "EUR") countryCode = "EU";
  if (currency === "AUD") countryCode = "AU";

  imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// get elements
const fromImg = document.querySelector(".select-container img");
const toImg = document.querySelector(".select-container2 img");

// listen for change
fromCurr.addEventListener("change", () => {
  updateFlag(fromCurr, fromImg);
});

toCurr.addEventListener("change", () => {
  updateFlag(toCurr, toImg);
});

