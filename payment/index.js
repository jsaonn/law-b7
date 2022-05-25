const express = require("express");
const logger = require("morgan");
const midtransClient = require("midtrans-client");

const app = express();
const port = 5000;
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-Qa_Kayv1_ARJSO4Y-KHSHO59",
});

app.use(express.json());
app.use(logger("dev"));

app.post("/payment/snap-token", (req, res) => {
  const {
    amount,
    customer_details: { first_name, last_name, email, phone },
  } = req.body;

  const params = {
    transaction_details: {
      order_id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5),
      gross_amount: amount,
    },
    customer_details: {
      first_name,
      last_name,
      email,
      phone,
    },
  };

  snap.createTransaction(params).then((transaction) => {
    res.json({
      token: transaction.token,
    });
  });
});

app.post("/payment/status-update", (req, res) => {
  const {
    order_id,
    transaction_status,
    fraud_status
  } = req.body;

  // TODO notify cart service for successful payment

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Payment Service listening on port ${port}`);
});
