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

    status.textContent = "⏳ Order submitting...";


    const iframe = document.createElement("iframe");

    iframe.name = "orderFrame";
    iframe.style.display = "none";

    document.body.appendChild(iframe);


    const tempForm = document.createElement("form");

    tempForm.method = "POST";
    tempForm.action = SCRIPT_URL;
    tempForm.target = "orderFrame";
    tempForm.style.display = "none";


    const formData = new FormData(form);


    formData.forEach(function (value, key) {

      const input = document.createElement("input");

      input.type = "hidden";
      input.name = key;
      input.value = value;

      tempForm.appendChild(input);

    });


    document.body.appendChild(tempForm);


    tempForm.submit();


    setTimeout(function () {

      status.textContent =
        "✅ Order submitted successfully!";

      form.reset();

      tempForm.remove();
      iframe.remove();

    }, 2500);

  });

});