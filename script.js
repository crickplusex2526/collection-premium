const NOTIFICATION_EMAIL = "yjsolanki2526@gmail.com";

const SHEET_ID = "1RTrg6S8MIWl6AcOd9E-bYc-FnsM4Nweh2fZBc66mURQ";

function doGet() {
  return ContentService
    .createTextOutput("Premium Collection Order API is running.");
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .openById(SHEET_ID)
      .getSheets()[0];

    const d = e.parameter || {};

    sheet.appendRow([
      new Date(),
      d.name || "",
      d.mobile || "",
      d.address || "",
      d.city || "",
      d.pincode || "",
      d.productCode || "",
      d.size || "",
      d.quantity || "",
      d.price || "",
      d.advance || "",
      d.paymentStatus || "",
      d.utr || ""
    ]);

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: "New Order - Premium Collection",
      body:
        "NEW ORDER RECEIVED\n\n" +
        "Name: " + (d.name || "") + "\n" +
        "Mobile: " + (d.mobile || "") + "\n" +
        "Address: " + (d.address || "") + "\n" +
        "City: " + (d.city || "") + "\n" +
        "Pincode: " + (d.pincode || "") + "\n" +
        "Product Code: " + (d.productCode || "") + "\n" +
        "Size: " + (d.size || "") + "\n" +
        "Quantity: " + (d.quantity || "") + "\n" +
        "Price: ₹" + (d.price || "") + "\n" +
        "Advance: ₹" + (d.advance || "") + "\n" +
        "Payment: " + (d.paymentStatus || "") + "\n" +
        "UTR: " + (d.utr || "")
    });

    return ContentService
      .createTextOutput("Order received successfully");

  } catch (error) {

    console.error(error);

    return ContentService
      .createTextOutput("ERROR: " + error.toString());
  }
}