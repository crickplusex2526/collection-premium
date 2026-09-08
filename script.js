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

  // Hidden iframe
  const iframe = document.createElement("iframe");
  iframe.name = "orderSubmitFrame";
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    status.textContent = "⏳ Order submit ho raha hai...";

    // Direct POST to Google Apps Script
    form.method = "POST";
    form.action = SCRIPT_URL;
    form.target = "orderSubmitFrame";

    // Submit
    form.submit();

    // Give Apps Script time to save the order
    setTimeout(function () {

      status.textContent =
        "✅ Order submitted successfully!";

      form.reset();

    }, 2500);

  });

});