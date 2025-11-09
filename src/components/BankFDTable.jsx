import React from "react";

const banksData = {
  publicSector: [
    {
      bank: "State Bank of India",
      highestRate: 7.25,
      oneYear: 6.8,
      threeYear: 6.75,
      fiveYear: 6.5,
    },
    {
      bank: "Punjab National Bank",
      highestRate: 7.25,
      oneYear: 6.8,
      threeYear: 7.0,
      fiveYear: 6.5,
    },
    {
      bank: "Bank of Baroda",
      highestRate: 7.3,
      oneYear: 6.85,
      threeYear: 7.15,
      fiveYear: 6.8,
    },
    {
      bank: "Bank of India",
      highestRate: 7.3,
      oneYear: 6.8,
      threeYear: 6.5,
      fiveYear: 6.0,
    },
    {
      bank: "Canara Bank",
      highestRate: 7.4,
      oneYear: 6.85,
      threeYear: 7.4,
      fiveYear: 6.7,
    },
    {
      bank: "Central Bank of India",
      highestRate: 7.5,
      oneYear: 6.85,
      threeYear: 7.0,
      fiveYear: 6.75,
    },
    {
      bank: "Indian Bank",
      highestRate: 7.3,
      oneYear: 6.1,
      threeYear: 6.25,
      fiveYear: 6.25,
    },
    {
      bank: "Indian Overseas Bank",
      highestRate: 7.3,
      oneYear: 7.1,
      threeYear: 6.5,
      fiveYear: 6.5,
    },
    {
      bank: "UCO Bank",
      highestRate: 7.3,
      oneYear: 6.5,
      threeYear: 6.3,
      fiveYear: 6.2,
    },
    {
      bank: "Union Bank of India",
      highestRate: 7.3,
      oneYear: 6.8,
      threeYear: 6.7,
      fiveYear: 6.5,
    },
  ],
  privateSector: [
    {
      bank: "Axis Bank",
      highestRate: 7.25,
      oneYear: 6.7,
      threeYear: 7.1,
      fiveYear: 7.0,
    },
    {
      bank: "HDFC Bank",
      highestRate: 7.4,
      oneYear: 6.6,
      threeYear: 7.0,
      fiveYear: 7.0,
    },
    {
      bank: "ICICI Bank",
      highestRate: 7.25,
      oneYear: 6.7,
      threeYear: 7.0,
      fiveYear: 7.0,
    },
    {
      bank: "IndusInd Bank",
      highestRate: 7.75,
      oneYear: 7.75,
      threeYear: 7.25,
      fiveYear: 7.25,
    },
    {
      bank: "DBS Bank",
      highestRate: 7.5,
      oneYear: 7.0,
      threeYear: 6.5,
      fiveYear: 6.5,
    },
    {
      bank: "Federal Bank",
      highestRate: 7.5,
      oneYear: 7.0,
      threeYear: 7.1,
      fiveYear: 7.1,
    },
    {
      bank: "IDBI Bank",
      highestRate: 7.4,
      oneYear: 6.8,
      threeYear: 6.5,
      fiveYear: 6.5,
    },
    {
      bank: "Kotak Mahindra Bank",
      highestRate: 7.4,
      oneYear: 7.1,
      threeYear: 7.0,
      fiveYear: 6.2,
    },
    {
      bank: "RBL Bank",
      highestRate: 8.0,
      oneYear: 7.5,
      threeYear: 7.5,
      fiveYear: 7.1,
    },
    {
      bank: "SBM Bank India",
      highestRate: 8.25,
      oneYear: 7.05,
      threeYear: 7.3,
      fiveYear: 7.75,
    },
    {
      bank: "Yes Bank",
      highestRate: 8.0,
      oneYear: 7.75,
      threeYear: 7.25,
      fiveYear: 7.25,
    },
  ],
  smallFinanceBanks: [
    {
      bank: "AU Small Finance Bank",
      highestRate: 8.1,
      oneYear: 7.25,
      threeYear: 7.5,
      fiveYear: 7.25,
    },
    {
      bank: "Equitas Small Finance Bank",
      highestRate: 8.25,
      oneYear: 8.1,
      threeYear: 8.0,
      fiveYear: 7.25,
    },
    {
      bank: "Jana Small Finance Bank",
      highestRate: 8.25,
      oneYear: 8.25,
      threeYear: 8.25,
      fiveYear: 8.2,
    },
    {
      bank: "North East Small Finance Bank",
      highestRate: 9.0,
      oneYear: 7.0,
      threeYear: 9.0,
      fiveYear: 8.0,
    },
    {
      bank: "Ujjivan Small Finance Bank",
      highestRate: 8.25,
      oneYear: 8.25,
      threeYear: 7.2,
      fiveYear: 6.5,
    },
  ],
};

const FDTable = ({ title, data }) => {
  // Determine color scheme based on bank type
  let headerBgColor, headerTextColor, rowHoverColor;
  
  if (title.includes("Public")) {
    headerBgColor = "bg-blue-300";
    headerTextColor = "text-white";
    rowHoverColor = "hover:bg-blue-50";
  } else if (title.includes("Private")) {
    headerBgColor = "bg-purple-300";
    headerTextColor = "text-white";
    rowHoverColor = "hover:bg-purple-50";
  } else {
    headerBgColor = "bg-green-300";
    headerTextColor = "text-white";
    rowHoverColor = "hover:bg-green-50";
  }

  return (
    <div className={`p-6 rounded-xl shadow-lg mt-10 border border-gray-200 bg-white`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${headerTextColor} ${headerBgColor} py-3 px-4 rounded-t-lg`}>
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className={`${headerBgColor} ${headerTextColor}`}>
              <th className="p-3 text-left font-semibold">Bank</th>
              <th className="p-3 font-semibold">Highest Rate (%)</th>
              <th className="p-3 font-semibold">1-Year (%)</th>
              <th className="p-3 font-semibold">3-Year (%)</th>
              <th className="p-3 font-semibold">5-Year (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((bank, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-200 ${rowHoverColor} transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 font-medium text-gray-800">{bank.bank}</td>
                <td className="p-3 text-center font-bold text-blue-700">{bank.highestRate}</td>
                <td className="p-3 text-center">{bank.oneYear}</td>
                <td className="p-3 text-center">{bank.threeYear}</td>
                <td className="p-3 text-center">{bank.fiveYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BankFDTable = () => {
  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Fixed Deposit Interest Rates
      </h1>
      <p className="text-center text-black mb-8">
        Compare FD rates across different banks in India
      </p>
      
      <FDTable title="Public Sector Banks" data={banksData.publicSector} />
      <FDTable title="Private Sector Banks" data={banksData.privateSector} />
      <FDTable title="Small Finance Banks" data={banksData.smallFinanceBanks} />
      
      <div className="text-sm text-black text-center mt-8">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mt-1">Rates are subject to change. Please verify with the bank.</p>
      </div>
    </div>
  );
};

export default BankFDTable;