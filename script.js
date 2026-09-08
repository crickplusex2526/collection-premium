const NOTIFICATION_EMAIL = "yjsolanki2526@gmail.com";

function doGet() {
  return ContentService
    .createTextOutput("Premium Collection Order API is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {

    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheets()[0];

    const d = e.parameter || {};

    const name = d.name || "";
    const mobile = d.mobile || "";
    const address = d.address || "";
    const city = d.city || "";
    const pincode = d.pincode || "";
    const productCode = d.productCode || "";
    const size = d.size || "";
    const quantity = d.quantity || "";
    const price = d.price || "2999";
    const advance = d.advance || "1049.65";
    const paymentStatus = d.paymentStatus || "";
    const utr = d.utr || "";

    // Save order in Google Sheet
    sheet.appendRow([
      new Date(),
      name,
      mobile,
      address,
      city,
      pincode,
      productCode,
      size,
      quantity,
      price,
      advance,
      paymentStatus,
      utr
    ]);

    // Send email notification
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: "🛍️ New Order - Premium Collection",

      body:
        "NEW ORDER RECEIVED\n\n" +

        "Name: " + name + "\n" +
        "Mobile: " + mobile + "\n" +
        "Address: " + address + "\n" +
        "City: " + city + "\n" +
        "Pincode: " + pincode + "\n\n" +

        "Product Code: " + productCode + "\n" +
        "Size: " + size + "\n" +
        "Quantity: " + quantity + "\n\n" +

        "Product Price: ₹" + price + "\n" +
        "Advance: ₹" + advance + "\n" +
        "Payment Option: " + paymentStatus + "\n" +
        "UTR / Transaction ID: " + utr + "\n\n" +

        "Please verify the payment before processing the order."
    });

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          message: "Order received successfully"
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}