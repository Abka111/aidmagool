import { useEffect } from "react";

function DonationSection() {
  useEffect(() => {
    const form = document.querySelector("#donation-form");
    if (!form) return;

    const handleSubmit = async (e) => {
      e.preventDefault();

      const amount =
        document.querySelector("#custom-amount").value || 10;
      const paymentMethod =
        document.querySelector("#paymentMethod").value;

      if (paymentMethod === "paypal") {
        const res = await fetch("http://localhost:5000/api/donate/paypal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        window.location.href = data.forwardLink;
      }

      if (
        paymentMethod === "bank" ||
        paymentMethod === "Commercial Bank of Ethiopia" ||
        paymentMethod === "Shabelle Bank" ||
        paymentMethod === "Rays Microfinance" ||
        paymentMethod === "E-birr"
      ) {
        const res = await fetch(
          `http://localhost:5000/api/donate/bank-details?bank=${paymentMethod}`
        );
        const data = await res.json();

        const bankDiv = document.getElementById("bank-details");
        bankDiv.style.display = "block";
        bankDiv.innerHTML = `
          <p><strong>Bank Name:</strong> ${data.name}</p>
          <p><strong>Account:</strong> ${data.account || data.number}</p>
          <p><strong>Branch:</strong> ${data.branch || "—"}</p>
        `;
      }
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <section className="donation-section" id="donation-section">
      <div className="donation-content">
        <h2>Make a Difference Today</h2>
        <p>
          Your contribution helps us provide education, protection, and hope for
          vulnerable children and families. Every amount counts.
        </p>

        <form id="donation-form" className="donation-form">
          <div className="donation-amounts">
            <button type="button" className="amount-btn">
              $10
            </button>
            <button type="button" className="amount-btn">
              $25
            </button>
            <button type="button" className="amount-btn">
              $50
            </button>
            <button type="button" className="amount-btn">
              $100
            </button>
            <input
              type="number"
              id="custom-amount"
              placeholder="Custom Amount"
            />
          </div>

          <input
            type="text"
            id="full-name"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            required
          />

          <select id="paymentMethod" required>
            <option value="">Choose Payment Method</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
            <option value="Commercial Bank of Ethiopia">
              Commercial Bank of Ethiopia
            </option>
            <option value="Shabelle Bank">Shabelle Bank</option>
            <option value="Rays Microfinance">Rays Microfinance</option>
            <option value="E-birr">E-birr</option>
            <option value="card">Credit/Debit Card</option>
          </select>

          <button type="submit" className="donate-btn">
            Donate Now 💖
          </button>
        </form>

        <div
          id="bank-details"
          style={{
            display: "none",
            marginTop: "10px",
            color: "#333",
            fontWeight: "bold",
          }}
        ></div>
      </div>
    </section>
  );
}

export default DonationSection;
