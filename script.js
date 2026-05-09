const currencyList = {
    "USD": "United States",
    "INR": "India",
    "EUR": "Eurozone",
    "GBP": "United Kingdom",
    "JPY": "Japan",
    "AUD": "Australia",
    "CAD": "Canada",
    "CHF": "Switzerland",
    "CNY": "China",
    "SGD": "Singapore",
    "NZD": "New Zealand",
    "AED": "UAE",
    "ZAR": "South Africa",
    "RUB": "Russia",
    "BRL": "Brazil",
    "HKD": "Hong Kong",
    "KRW": "South Korea",
    "THB": "Thailand"
};

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

// Populate dropdown with country + currency
for (let code in currencyList) {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.text = `${currencyList[code]} (${code})`;

    let option2 = document.createElement("option");
    option2.value = code;
    option2.text = `${currencyList[code]} (${code})`;

    fromCurrency.add(option1);
    toCurrency.add(option2);
}

// Default values
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Swap Button
document.getElementById("swap").addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});

// Convert Function
document.getElementById("convertBtn").addEventListener("click", convertCurrency);

async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let from = fromCurrency.value;
    let to = toCurrency.value;

    if (amount === "" || amount <= 0) {
        document.getElementById("result").innerText = "⚠ Enter valid amount";
        return;
    }

    try {
        let url = `https://open.er-api.com/v6/latest/${from}`;
        let response = await fetch(url);
        let data = await response.json();

        let rate = data.rates[to];
        let result = amount * rate;

        document.getElementById("result").innerText =
            `${amount} ${from} = ${result.toFixed(2)} ${to}`;

    } catch (error) {
        document.getElementById("result").innerText =
            "❌ Error fetching data";
    }
}