import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../api/config"; // Adjust if needed
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const navigator = useNavigate();
  const { state } = useLocation();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/PersonalDetailsget`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = formData;
    const amount = state.amount;
    if (!name || !email || !amount) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const orderResponse = await axios.post(`${apiUrl}/create-order`, {
        amount: Number(amount) * 100, // Convert to paisa
      });

      if (orderResponse?.data?.data?.orderId) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
          alert("Razorpay SDK failed to load");
          setLoading(false);
          return;
        }
        const options = {
          key: "rzp_test_FnBeGoJAHlye2h",
          amount: Number(amount) * 100,
          currency: "INR",
          name,
          description: "Payment for services",
          order_id: orderResponse.data.data.orderId,
          prefill: {
            name,
            email,
          },
          handler: async function (response) {
            const token = localStorage.getItem("token"); // or wherever your JWT is stored

            try {
              await axios.post(
                `${apiUrl}/verify-payment`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  ...state, // Optional or get from input
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              toast("Payment successful and transaction saved!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              navigator("/FDPortfolio");
            } catch (error) {
              console.error("Verification error:", error);
              alert("Payment succeeded but saving transaction failed.");
            }
          },
          notes: {
            address: "Corporate Office",
          },
          theme: {
            color: "#1a73e8",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.title}>Secure Payment</h2>
        <p style={styles.subtitle}>Complete your transaction securely</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              readOnly
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              readOnly
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Amount (INR)</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount (INR)"
              value={state.amount}
              onChange={handleChange}
              required
              min="1"
              style={styles.input}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>

        <div style={styles.securityNote}>
          <div style={styles.securityBar}></div>
          <p style={styles.securityText}>
            Your payment is secured with 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
  },
  container: {
    maxWidth: "500px",
    width: "100%",
    margin: "0 auto",
    padding: "2.5rem",
    background: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
    borderRadius: "16px",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textAlign: "center",
    color: "#2d3748",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#4a5568",
    textAlign: "center",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9rem",
    color: "#4a5568",
    fontWeight: "500",
  },
  input: {
    padding: "0.9rem",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s",
    backgroundColor: "#f8fafc",
    color: "#1a202c",
  },
  button: {
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#3182ce",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s",
    marginTop: "1rem",
    boxShadow: "0 4px 6px rgba(49, 130, 206, 0.2)",
  },
  buttonDisabled: {
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#a0aec0",
    color: "#fff",
    cursor: "not-allowed",
    marginTop: "1rem",
  },
  securityNote: {
    marginTop: "1.5rem",
    textAlign: "center",
    paddingTop: "1rem",
    borderTop: "1px solid #e2e8f0",
  },
  securityBar: {
    height: "3px",
    background: "linear-gradient(90deg, #38a169, #3182ce)",
    borderRadius: "3px",
    marginBottom: "0.5rem",
  },
  securityText: {
    fontSize: "0.8rem",
    color: "#718096",
  },
};

export default Payment;
