// index.js
const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");

updateRate();

function updateRate() {
    fetch(
        `https://v6.exchangerate-api.com/v6/5f9d1c87f7250159c9c9b17d/latest/${currencyFirstEl.value}`
    )
        .then((res) => res.json())
        .then((data) => {
            const rate = data.conversion_rates[currencySecondEl.value];
            exchangeRateEl.innerText = `1 ${currencyFirstEl.value} = ${rate.toFixed(4)} ${currencySecondEl.value}`;
            worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
            
            // Enable the second input field only if conversion is successful
            if (!isNaN(worthSecondEl.value)) {
                worthSecondEl.removeAttribute('disabled');
            } else {
                worthSecondEl.setAttribute('disabled', 'true');
            }
        });
}

currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);



const currencyFirst = document.getElementById("currency-first");
const currencySecond = document.getElementById("currency-second");
const worthFirst = document.getElementById("worth-first");
const worthSecond = document.getElementById("worth-second");
const exchangeRateElement = document.getElementById("exchange-rate");

const exchangeRates = {
    USD: {
        INR: 73.5,
        JPY: 110.5,
        AUD: 1.33,
        CAD: 1.25,
        CHF: 0.91,
        CNY: 6.45,
        NZD: 1.45,
    },
    EUR: {
        INR: 88.3,
        JPY: 132.2,
        AUD: 1.56,
        CAD: 1.47,
        CHF: 1.08,
        CNY: 7.65,
        NZD: 1.71,
    },
    GBP: {
        INR: 102.7,
        JPY: 153.9,
        AUD: 1.79,
        CAD: 1.69,
        CHF: 1.24,
        CNY: 8.79,
        NZD: 1.97,
    },
    INR: {
        JPY: 1.5,
        AUD: 0.018,
        CAD: 0.018,
        CHF: 0.014,
        CNY: 0.11,
        NZD: 0.022,
    },
    JPY: {
        AUD: 0.011,
        CAD: 0.011,
        CHF: 0.008,
        CNY: 0.059,
        NZD: 0.013,
    },
    AUD: {
        CAD: 0.94,
        CHF: 0.69,
        CNY: 4.87,
        NZD: 1.09,
    },
    CAD: {
        CHF: 0.73,
        CNY: 5.17,
        NZD: 1.16,
    },
    CHF: {
        CNY: 7.24,
        NZD: 1.63,
    },
    CNY: {
        NZD: 0.22,
    },
    NZD: {},
};


function updateConversion() {
    const selectedCurrencyFirst = currencyFirst.value;
    const selectedCurrencySecond = currencySecond.value;

    if (exchangeRates[selectedCurrencyFirst] && exchangeRates[selectedCurrencyFirst][selectedCurrencySecond]) {
        const exchangeRate = exchangeRates[selectedCurrencyFirst][selectedCurrencySecond];
        const amount = parseFloat(worthFirst.value);
        worthSecond.value = (amount * exchangeRate).toFixed(2);
        exchangeRateElement.textContent = `1 ${selectedCurrencyFirst} = ${exchangeRate} ${selectedCurrencySecond}`;
    }
}

currencyFirst.addEventListener("change", updateConversion);
currencySecond.addEventListener("change", updateConversion);
worthFirst.addEventListener("input", updateConversion);

// Initial conversion
updateConversion();
