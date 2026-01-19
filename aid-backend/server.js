// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ PAYPAL CONFIG
paypal.configure({
  mode: "sandbox", // use 'live' when you go real
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// 💳 DONATION ENDPOINT (PayPal)
app.post("/api/donate/paypal", (req, res) => {
  const { amount } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: { items: [{ name: "Donation", price: amount, currency: "USD", quantity: 1 }] },
        amount: { currency: "USD", total: amount },
        description: "AID NGO Donation",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.toString() });
    } else {
      const approvalUrl = payment.links.find(link => link.rel === "approval_url").href;
      res.json({ forwardLink: approvalUrl });
    }
  });
});

// 🏦 BANK TRANSFER ENDPOINT (Manual Info)
app.get("/api/donate/bank-details", (req, res) => {
  const { bank } = req.query;
  const banks = {
    "Premier Bank": {
      name: "AID NGO",
      account: "10023456789",
      branch: "Hargeisa Main Branch",
    },
    "Commercial Bank of Ethiopia": {
      name: "AID NGO",
      account: "013456789011",
      branch: "Addis Ababa",
    },
    "Shabelle Bank": {
      name: "AID NGO",
      account: "987654321",
      branch: "Hargeisa",
    },
    "Rays Microfinance": {
      name: "AID NGO",
      account: "55667788",
      branch: "Jigjiga",
    },
    "E-birr": {
      name: "AID NGO",
      number: "+252 61 234 5678",
    },
  };

  res.json(banks[bank] || { error: "Bank not found" });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
