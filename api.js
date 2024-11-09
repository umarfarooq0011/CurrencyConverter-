// API endpoint
const API_URL =
  "https://v6.exchangerate-api.com/v6/c02826f0b3b7d4841f7ebf8f/latest/";

// Fetch exchange rate based on user selection
async function fetchExchangeRate(fromCurrency, toCurrency) {
  try {
    const response = await fetch(`${API_URL}${fromCurrency}`);
    const data = await response.json();

    // Check if the API returned a valid result
    if (data.result === "success") {
      return data.conversion_rates[toCurrency];
    } else {
      throw new Error("Error fetching conversion rates");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Handle form submission
document
  .getElementById("currency-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const amount = document.getElementById("amount").value;

    if (amount <= 0 || isNaN(amount)) {
      // SweetAlert for invalid input
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter a valid amount!",
      });
      return;
    }

    // Get the exchange rate
    const rate = await fetchExchangeRate(fromCurrency, toCurrency);

    if (rate) {
      const result = (amount * rate).toFixed(2);
      document.getElementById(
        "result"
      ).textContent = `Exchange rate: ${result} ${toCurrency}`;
    } else {
      // SweetAlert for API error
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: "Error retrieving the exchange rate!",
      });
    }
  });
  
