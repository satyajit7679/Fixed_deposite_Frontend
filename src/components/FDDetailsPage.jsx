import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";

export default function FDDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setdata] = useState({});

  useEffect(() => {
    if (state) {
      const { amount, interest_rate, tenures, maturity, bank_name } = state;
      setdata({ amount, interest_rate, tenures, maturity, bank_name });
    }
  }, [state]);

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Typography variant="h5" className="mb-4 text-gray-800">
          No FD data provided.
        </Typography>
        <Button 
          color="blue" 
          onClick={() => navigate("/")}
          className="px-6 py-3"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-blue-300 to-purple-300"
    
    style={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}
    
    >
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-8">
          <Typography 
            variant="h3" 
            className="mb-1 text-2xl font-bold text-gray-800 tracking-tight"
          >
            Fixed Deposit Summary
          </Typography>
          <Typography className="text-sm text-gray-800">
            Review your investment details
          </Typography>
        </div>

        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DetailCard label="Bank Name" value={data.bank_name} />
            <DetailCard label="Initial Amount" value={`₹${data.amount}`} />
            <DetailCard label="Interest Rate" value={`${data.interest_rate}%`} />
            <DetailCard label="Tenure" value={`${data.tenures} months`} />
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <DetailItem 
                label="Maturity Amount" 
                value={`₹${data.maturity?.toFixed(2)}`} 
                highlight
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Button
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            onClick={() => navigate("/PanValidation", { state: { data } })}
          >
            Continue to Investment
          </Button>
          <Button
            variant="outlined"
            size="lg"
            className="w-full border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors"
            onClick={() => navigate("/Home")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <Typography className="text-xs font-bold text-gray-600 tracking-wider">
        {label}
      </Typography>
      <Typography className="text-sm font-semibold text-gray-800 mt-1">
        {value}
      </Typography>
    </div>
  );
}

function DetailItem({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between items-center">
      <Typography className={`text-sm font-bold ${highlight ? 'text-gray-700' : 'text-gray-600'}`}>
        {label}
      </Typography>
      <Typography className={`text-base ${highlight ? 'font-bold text-blue-600' : 'font-semibold text-gray-900'}`}>
        {value}
      </Typography>
    </div>
  );
}