const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxjw7zhNEZD7tVPOvvePouvtU_dUDMlKno-rzQEA_ahI51PWYTp8JyY6W2T7XNAdcXJ4Q/exec";

const UPI_ID = "BHARATPE.9J0M0Y1G1S693577@unitype";

function selectProduct(code) {
  document.getElementById("productCode").value = code;

  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });
}

function payUPI() {
  const upiURL =
    "upi://pay?pa=" +
    encodeURIComponent(UPI_ID) +
    "&pn=" +
    encodeURIComponent("Premium Collection") +
    "&am=1049.65&cu=INR";

  window.location.href = upiURL;
}

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("orderForm");
  const status = document.getElementById("orderStatus");

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    status.textContent = "⏳ Order submit ho raha hai...";

    const formData = new FormData(form);

    const params = new URLSearchParams();

    formData.forEach(function(value, key) {
      params.append(key, value);
    });

    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: params
    })
    .then(function () {

      status.textContent =
        "✅ Order submitted successfully!";

      form.reset();

    })
    .catch(function (error) {

      console.error(error);

      status.textContent =
        "❌ Order submit nahi hua. Please try again.";

    });

  });

});