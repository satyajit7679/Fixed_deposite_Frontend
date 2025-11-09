import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { apiUrl } from "../api/config";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  TrendingUp, 
  Lock, 
  Calendar, 
  Coins 
} from "lucide-react";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import Chatbot from "../components/Chatbot";
import ReactApexChart from "react-apexcharts";

function Home() {
  const [da, setdata] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  
  const scrollRight = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 60,
        ease: "linear",
      },
    },
  };
  
  const cardVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Benefits data
  const benefits = [
    {
      icon: <Shield className="text-blue-500" size={24} />,
      title: "Safe & Secure",
      desc: "Your investment is protected"
    },
    {
      icon: <TrendingUp className="text-green-500" size={24} />,
      title: "Higher Returns",
      desc: "Better rates than savings accounts"
    },
    {
      icon: <Lock className="text-purple-500" size={24} />,
      title: "Guaranteed",
      desc: "Fixed returns regardless of market"
    },
    {
      icon: <Calendar className="text-orange-500" size={24} />,
      title: "Flexible Tenure",
      desc: "6 months to 10 years options"
    },
    {
      icon: <Coins className="text-yellow-500" size={24} />,
      title: "Easy Investment",
      desc: "Start with just ₹1,000"
    }
  ];

  const Banks = [
    // Public Sector Banks
    {
      id: 1,
      name: "State Bank of India",
      interest_rate: 7.25,
      logo: "https://upload.wikimedia.org/wikipedia/en/5/58/State_Bank_of_India_logo.svg",
      rates: [6.25,6.80,7.00,7.00,6.75],
      category: "public",
    },
    {
      id: 2,
      name: "Punjab National Bank",
      interest_rate: 7.25,
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Punjab_National_Bank.svg",
      rates: [6.25,6.80,7.00,7.00,6.50],
      category: "public",
    },
    {
      id: 3,
      name: "Bank of Baroda",
      interest_rate: 7.3,
      logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/BankOfBarodaLogo.svg",
      rates: [6,6.85,7.00,7.00,7.15],
      category: "public",
    },
    {
      id: 4,
      name: "Bank of India",
      interest_rate: 7.3,
      logo: "https://upload.wikimedia.org/wikipedia/en/8/80/Bank_of_India_logo.svg",
      rates: [5.75,7.05,6.75,6.75,6.50],
      category: "public",
    },
    {
      id: 5,
      name: "Canara Bank",
      interest_rate: 7.4,
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Canara_Bank_Logo.svg",
      rates: [6.15,6.85,6.25,7.30,7.40],
      category: "public",
    },
    {
      id: 6,
      name: "Central Bank of India",
      interest_rate: 7.5,
      logo: "https://cdn.brandfetch.io/idFKKxnbTJ/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      rates: [6.25,6.85,6.85,7.15,7.15],
      category: "public",
    },
    {
      id: 7,
      name: "Indian Bank",
      interest_rate: 7.3,
      logo: "https://upload.wikimedia.org/wikipedia/en/b/bc/Indian_Bank_logo.svg",
      rates: [7.30,6.10,6.70,6.70,6.25],
      category: "public",
    },
    {
      id: 8,
      name: "Indian Overseas Bank",
      interest_rate: 7.3,
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Indian_Overseas_Bank_Logo.svg",
      rates: [5.75,5.75,6.90,7.30,6.80],
      category: "public",
    },
    {
      id: 9,
      name: "UCO Bank",
      interest_rate: 7.3,
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/UCO_Bank.jpg",
      rates: [5.00,6.50,6.50,7.05,6.30],
      category: "public",
    },
    {
      id: 10,
      name: "Union Bank of India",
      interest_rate: 7.3,
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Union_Bank_of_India_Logo.svg",
      rates: [6,6.80,6.90,6.60,6.70],
      category: "public",
    },
    // Private Sector Banks
    {
      id: 11,
      name: "Axis Bank",
      interest_rate: 7.25,
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg",
      rates: [6.50,6.70,6.70,7.10,7.10],
      category: "private",
    },
    {
      id: 12,
      name: "HDFC Bank",
      interest_rate: 7.4,
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg",
      rates: [6.00,6.60,6.60,6.70,6.90],
      category: "private",
    },
    {
      id: 13,
      name: "ICICI Bank",
      interest_rate: 7.25,
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg",
      rates: [4.75,6.00,6.70,7.25,7.00],
      category: "private",
    },
    {
      id: 14,
      name: "IndusInd Bank",
      interest_rate: 7.75,
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/IndusInd_Bank_SVG_Logo.svg",
      rates: [7.00,7.75,7.75,7.75,7.25],
      category: "private",
    },
    {
      id: 15,
      name: "DBS Bank",
      interest_rate: 7.5,
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b1/DBS_Bank_Logo_%28alternative%29.svg",
      rates: [5.00,6.00,7.00,7.50,7.25],
      category: "private",
    },
    {
      id: 16,
      name: "Federal Bank",
      interest_rate: 7.5,
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Federal_bank_India.svg",
      rates: [5.00,6.00,6.80,7.30,7.50],
      category: "private",
    },
    {
      id: 17,
      name: "IDBI Bank",
      interest_rate: 7.4,
      logo: "https://upload.wikimedia.org/wikipedia/en/4/41/IDBI_Logo.svg",
      rates: [6.50,6.80,6.80,6.80,6.50],
      category: "private",
    },
    // Small Finance Banks
    {
      id: 18,
      name: "AU Small Finance Bank",
      interest_rate: 8.1,
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Aubank.svg",
      rates: [6.50,7.00,7.25,7.50,7.50],
      category: "small_finance",
    },
    {
      id: 19,
      name: "Equitas Small Finance Bank",
      interest_rate: 8.25,
      logo: "https://www.equitasbank.com/strapi-dev/uploads/Group_2_cad9c29024.svg",
      rates: [6.00,7.20,7.90,7.75,7.50],
      category: "small_finance",
    },
    {
      id: 20,
      name: "Jana Small Finance Bank",
      interest_rate: 8.25,
      logo: "https://www.janabank.com/images/janalogo.png",
      rates: [7.00,7.50,7.50,8.10,8.25],
      category: "small_finance",
    },
    {
      id: 21,
      name: "Ujjivan Small Finance Bank",
      interest_rate: 8.25,
      logo: "https://upload.wikimedia.org/wikipedia/en/4/44/This_is_the_Ujjivan_Small_Finance_Bank_Official_Logo.svg",
      rates: [8.00,8.10,8.10,7.75,7.20],
      category: "small_finance",
    },
  ];

  const [state, setState] = useState({      
    series: [{
      name: "Rates",
      data: [1,2,3,4,5]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['6 Months', '12 Months', '18 Months', '24 Months','36 Months'],
      }
    },
  });

  const { register, handleSubmit, setValue } = useForm();
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const calculatorDataSubmit = (data) => {
    const dh = da.bank_na;
    const { amount, interest_rate, tenures } = data;
   
    if (!amount || !interest_rate || !tenures) return;

    const interest = (Number(amount) * Number(interest_rate) * Number(tenures/12)) / 100;
    const maturity = Number(amount) + interest;

    navigate("/fd-details", {
      state: {
        amount,
        interest_rate,
        tenures,
        maturity,
        bank_name: dh,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-200 to-indigo-200">
        <main className="pt-10">
          {/* Hero Section */}
          <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                    Grow Your Savings <br />with Fixed Deposits
                  </h1>
                  <p className="text-xl mb-8 text-blue-100">
                    Secure investments with guaranteed returns and higher interest rates
                  </p>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="https://img.freepik.com/free-vector/hand-holding-coin-stack-with-growth-chart_74855-5278.jpg" 
                    alt="Fixed Deposit Illustration"
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Why Choose Fixed Deposits?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all"
                    whileHover={{ y: -5, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Calculator and Chart Section */}
          <section className="px-4 py-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
              {/* Left Section */}
              <div className="flex justify-center">
                <Card className="w-full max-w-md bg-gradient-to-b from-gray-400 to-white shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out">
                  <CardBody>
                    <div id="chart">
                      <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="area"
                        height={350}
                      />
                    </div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Graph Review Check
                    </Typography>
                    <Typography className="text-gray-600">
                      📈 How your FD investment grows over each month/quarter
                    </Typography>
                  </CardBody>
                </Card>
              </div>

              {/* Right Section - Calculator */}
              <div className="flex flex-col items-center">
                <Card className="w-full max-w-md min-h-[500px] bg-gradient-to-b from-gray-400 to-white shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out">
                  <form onSubmit={handleSubmit(calculatorDataSubmit)}>
                    <CardBody>
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="mb-4 text-center font-bold"
                      >
                        Stock Calculator
                      </Typography>

                      {/* Amount Input */}
                      <div className="mb-3">
                        <Typography className="font-medium">
                          Enter Your Amount
                        </Typography>
                        <Input
                          label="Amount"
                          type="number"
                          {...register("amount", { required: true })}
                        />
                      </div>

                      {/* Tenure Selection */}
                      <div className="mb-3">
                        <Typography className="font-medium">
                          Choose Tenure
                        </Typography>
                        <select
                          className="w-full p-2 border rounded-lg text-gray-900 bg-gray-300"
                          {...register("tenures", { required: true })}
                        >
                          <option value="">Select Tenure</option>
                          <option value="6">6 Months</option>
                          <option value="12">12 Months</option>
                          <option value="24">36 Months</option>
                          <option value="24">24 Months</option>
                          <option value="24">36 Months</option>
                        </select>
                      </div>

                      {/* Bank Selection */}
                      <div className="mb-3">
                        <Typography className="font-medium">
                          Choose Your Bank
                        </Typography>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {Banks.slice(0, 4).map((bank) => (
                            <Button
                              key={bank.id}
                              size="sm"
                              variant="outlined"
                              onClick={() => {
                                setdata({bank_na:bank.name})
                                setState((prevState) => ({
                                  ...prevState,
                                  series: [
                                    {
                                      ...prevState.series[0],
                                      data: bank.rates,
                                    },
                                  ],
                                }));
                                setValue("interest_rate", bank.interest_rate);
                              }}
                              type="button"
                            >
                              <img src={bank.logo} alt="logo" className="h-6" />
                            </Button>
                          ))}
                          <Button
                            size="sm"
                            variant="outlined"
                            onClick={() => setShowPopup(true)}
                          >
                            More
                          </Button>
                        </div>
                        {/* Popup Modal */}
                        {showPopup && (
                          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                            <div className="bg-white p-4 shadow-lg rounded-lg border w-80 max-w-sm">
                              <h3 className="text-lg font-semibold mb-2 text-center">
                                Select a Bank
                              </h3>

                              {!selectedCategory ? (
                                <div className="flex flex-wrap gap-2 justify-center">
                                  <Button
                                    size="sm"
                                    variant="outlined"
                                    onClick={() => setSelectedCategory("public")}
                                  >
                                    Public
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outlined"
                                    onClick={() => setSelectedCategory("private")}
                                  >
                                    Private
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outlined"
                                    onClick={() =>
                                      setSelectedCategory("small_finance")
                                    }
                                  >
                                    Small Finance
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <div className="flex flex-wrap gap-2 justify-center">
                                    {Banks.filter(
                                      (bank) => bank.category === selectedCategory
                                    ).map((bank) => (
                                      <Button
                                        key={bank.id}
                                        size="sm"
                                        variant="outlined"
                                        onClick={() => {
                                          setdata({bank_na:bank.name})
                                          setValue(
                                            "interest_rate",
                                            bank.interest_rate
                                          );
                                          setValue("bank_name", bank.name);
                                          setState((prevState) => ({
                                            ...prevState,
                                            series: [
                                              {
                                                ...prevState.series[0],
                                                data: bank.rates,
                                              },
                                            ],
                                          }));
                                          setShowPopup(false);
                                          setSelectedCategory(null);
                                        }}
                                        type="button"
                                      >
                                        <img
                                          src={bank.logo}
                                          alt="logo"
                                          className="h-6 inline-block mr-2"
                                        />
                                        {bank.name}
                                      </Button>
                                    ))}
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="mt-3 w-full"
                                    onClick={() => setSelectedCategory(null)}
                                  >
                                    Back
                                  </Button>
                                </div>
                              )}

                              <Button
                                size="sm"
                                variant="ghost"
                                className="mt-3 w-full"
                                onClick={() => {
                                  setShowPopup(false);
                                  setSelectedCategory(null);
                                }}
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-center">
                      <Button type="submit">Calculate</Button>
                    </CardFooter>
                  </form>

                  {maturityAmount && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-center"
                      >
                        Maturity Amount: ₹{maturityAmount.toFixed(2)}
                      </Typography>
                    </div>
                  )}
                </Card>
              </div>
            </div>
            <Chatbot />
          </section>

          {/* Bank Comparison Section */}
          <section className="mt-12 px-4 w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              FD Interest Rate Comparison
            </h2>

            <div className="space-y-12">
              {/* Public Sector Banks */}
              <div className="overflow-hidden bg-gradient-to-r from-blue-100 via-white to-indigo-100 rounded-xl p-4">
                <h3 className="text-xl font-semibold mb-5 text-center text-gray-700">
                  Public Sector Banks
                </h3>
                <div className="relative w-full py-1">
                  <motion.div
                    className="flex gap-6 w-max px-2"
                    animate={scrollRight.animate}
                  >
                    {[...Array(2)].flatMap(() =>
                      Banks.filter((b) => b.category === "public").map(
                        (bank, i) => (
                          <motion.div
                            key={`${bank.id}-public-${i}`}
                            variants={cardVariants}
                            whileHover="hover"
                            className="p-3 border border-gray-200 rounded-lg shadow-lg w-40 text-center bg-white transform transition duration-300 hover:scale-105"
                          >
                            <img
                              src={bank.logo}
                              alt={bank.name}
                              className="h-10 mx-auto mb-2 object-contain"
                            />
                            <p className="font-medium text-gray-800">
                              {bank.name}
                            </p>
                            <p className="text-gray-700 font-semibold text-lg">
                              {bank.interest_rate}%
                            </p>
                          </motion.div>
                        )
                      )
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Private Sector Banks */}
              <div className="overflow-hidden bg-gradient-to-r from-blue-100 via-white to-indigo-100 rounded-xl p-4">
                <h3 className="text-xl font-semibold mb-5 text-center text-gray-700">
                  Private Sector Banks
                </h3>
                <div className="relative w-full py-1">
                  <motion.div
                    className="flex gap-6 w-max px-2"
                    animate={scrollRight.animate}
                  >
                    {[...Array(2)].flatMap(() =>
                      Banks.filter((b) => b.category === "private").map(
                        (bank, i) => (
                          <motion.div
                            key={`${bank.id}-private-${i}`}
                            variants={cardVariants}
                            whileHover="hover"
                            className="p-3 border border-gray-200 rounded-lg shadow-lg w-40 text-center bg-white transform transition duration-300 hover:scale-105"
                          >
                            <img
                              src={bank.logo}
                              alt={bank.name}
                              className="h-10 mx-auto mb-2 object-contain"
                            />
                            <p className="font-medium text-gray-800">
                              {bank.name}
                            </p>
                            <p className="text-gray-700 font-semibold text-lg">
                              {bank.interest_rate}%
                            </p>
                          </motion.div>
                        )
                      )
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Small Finance Banks */}
              <div className="overflow-hidden bg-gradient-to-r from-blue-100 via-white to-indigo-100 rounded-xl p-4">
                <h3 className="text-xl font-semibold mb-5 text-center text-gray-700">
                  Small Finance Banks
                </h3>
                <div className="relative w-full py-1">
                  <motion.div
                    className="flex gap-6 w-max px-2"
                    animate={scrollRight.animate}
                  >
                    {Banks.filter((b) => b.category === "small_finance")
                      .concat(
                        Banks.filter((b) => b.category === "small_finance")
                      )
                      .map((bank, i) => (
                        <motion.div
                          key={`${bank.id}-small-${i}`}
                          variants={cardVariants}
                          whileHover="hover"
                          className="p-3 border border-gray-200 rounded-lg shadow-lg w-40 text-center bg-white transform transition duration-300 hover:scale-105"
                        >
                          <img
                            src={bank.logo}
                            alt={bank.name}
                            className="h-10 mx-auto mb-2 object-contain"
                          />
                          <p className="font-medium text-gray-800">
                            {bank.name}
                          </p>
                          <p className="text-gray-700 font-semibold text-lg">
                            {bank.interest_rate}%
                          </p>
                        </motion.div>
                      ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;