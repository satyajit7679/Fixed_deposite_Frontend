import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const PanValidation = () => {
  const [panNumber, setPanNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const [pan, setpan] = useState({});

  const handlePanChange = (e) => {
    setPanNumber(e.target.value.toUpperCase());
    setpan({
      amount: state.data.amount,
      bank_name: state.data.bank_name,
      interest_rate: state.data.interest_rate,
      maturity: state.data.maturity,
      tenures: state.data.tenures,
      panno: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/PanValidation`,
        { panNumber }
      );

      setSuccess(response.data.message);
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.error || "Something went wrong";

      if (status === 400) {
        setError(`Format Error: ${message}`);
      } else if (status === 401) {
        setError(`Authorization Error: ${message}`);
      } else {
        setError(message);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header with PAN-themed gradient */}
          <div
            className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(8, 65, 134, 0.9) 0%, rgba(33, 150, 243, 0.9) 100%)",
            }}
          >
            <h2 className="text-2xl font-bold text-white">
              PAN Card Verification
            </h2>
            <p className="text-blue-100 mt-1 text-sm">
              Enter your Permanent Account Number
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="panNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PAN Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    value={panNumber}
                    onChange={handlePanChange}
                    maxLength={10}
                    required
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition uppercase tracking-wider bg-white/95"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400 text-xs">PAN</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Format: 5 letters, 4 numbers, 1 letter
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md transform hover:scale-[1.01]"
              >
                Validate PAN
              </button>
            </form>

            {/* Feedback messages */}
            {success && (
              <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Continue Button */}
            {success === "PAN number is valid and matched" && (
              <Button
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md"
                onClick={() => {
                  setpan({
                    amount: state.data.amount,
                    bank_name: state.data.bank_name,
                    interest_rate: state.data.interest_rate,
                    maturity: state.data.maturity,
                    tenures: state.data.tenures,
                    panno: panNumber,
                  });
                  navigate("/PersonalDetails", { state: { pan } });
                }}
              >
                Continue Application
              </Button>
            )}

            <Button
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200"
              onClick={() => navigate("/Home")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanValidation;
