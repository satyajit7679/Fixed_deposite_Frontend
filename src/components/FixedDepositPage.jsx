import { useState } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import BankFDTable from "./BankFDTable";

const FixedDepositPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is a Fixed Deposit?",
      answer:
        "A Fixed Deposit (FD) is a type of savings account that provides a higher interest rate compared to a regular savings account.",
    },
    {
      question: "What are the benefits of an FD?",
      answer:
        "FDs offer security, fixed returns, flexible tenure, and higher interest rates than savings accounts.",
    },
    {
      question: "How is interest calculated?",
      answer:
        "Interest is calculated based on the principal amount, tenure, and the interest rate applicable at the time of deposit.",
    },
    {
      question: "Can I withdraw my FD before maturity?",
      answer:
        "Yes, but premature withdrawal may result in a penalty and reduced interest rates.",
    },
    {
      question: "Are Fixed Deposits taxable?",
      answer:
        "Yes, TDS (Tax Deducted at Source) is applicable on FD interest earnings exceeding a certain limit.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-200 to-indigo-200 min-h-screen w-full">
      <Header />
      <main className="pt-10"></main>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Fixed Deposits (FD)
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
            Secure your savings with high-interest fixed deposits
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-sm text-blue-100">Interest Rates</p>
              <p className="text-2xl font-bold">Up to 7.5%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-sm text-blue-100">Flexible Tenure</p>
              <p className="text-2xl font-bold">6 months - 10 years</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-sm text-blue-100">Safe Investment</p>
              <p className="text-2xl font-bold">100% Secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Interest Rate Section */}
        <section className="mb-12">
          
          <BankFDTable />
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <center><h2 className="text-3xl font-bold text-black mb-6">
            Frequently Asked Questions
          </h2></center>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white p-5 rounded-lg shadow-md border-l-4 ${
                  openFAQ === index 
                    ? 'border-blue-600 bg-blue-50' 
                    : ''
                } transition-all duration-300`}
              >
                <button
                  className="flex justify-between items-center w-full text-left text-gray-800 text-lg font-medium focus:outline-none"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="mr-4">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform ${
                      openFAQ === index ? "rotate-180 text-blue-600" : "text-blue-400"
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <p className="mt-3 text-gray-600 pl-2 border-l-2 border-blue-200 ml-1">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        
      </div>
    
      <Footer />
    </div>
  );
};

export default FixedDepositPage;