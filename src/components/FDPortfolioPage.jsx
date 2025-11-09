import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiDownload, FiPrinter, FiFilter, FiSearch } from 'react-icons/fi';

const FDPortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [fdPortfolio,setfdPortfolio]=useState([])
  const token = localStorage.getItem('token');
  useEffect(()=>{
   async function datafetch(){
    const response = await axios.get('http://localhost:3001/api/fdPortfolioget', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setfdPortfolio(response.data.data)

   }
   datafetch();
  },[])
  // Sample FD data
  // const fdPortfolio = [
  //   {
  //     id: 'FD123456',
  //     bankName: 'State Bank of India',
  //     amount: 500000,
  //     interestRate: 7.1,
  //     tenure: '5 years',
  //     startDate: '2023-05-15',
  //     maturityDate: '2028-05-15',
  //     status: 'active',
  //     interestPayout: 'Quarterly',
  //     maturityAmount: 712000,
  //     logo: 'https://logo.clearbit.com/sbi.co.in'
  //   },
  //   {
  //     id: 'FD789012',
  //     bankName: 'HDFC Bank',
  //     amount: 300000,
  //     interestRate: 6.8,
  //     tenure: '3 years',
  //     startDate: '2023-02-10',
  //     maturityDate: '2026-02-10',
  //     status: 'active',
  //     interestPayout: 'Monthly',
  //     maturityAmount: 367200,
  //     logo: 'https://logo.clearbit.com/hdfcbank.com'
  //   },
  //   {
  //     id: 'FD345678',
  //     bankName: 'ICICI Bank',
  //     amount: 250000,
  //     interestRate: 6.5,
  //     tenure: '2 years',
  //     startDate: '2022-11-25',
  //     maturityDate: '2024-11-25',
  //     status: 'matured',
  //     interestPayout: 'Cumulative',
  //     maturityAmount: 283250,
  //     logo: 'https://logo.clearbit.com/icicibank.com'
  //   }
  // ];

  // Filter FDs based on search and status
  // const filteredFDs = fdPortfolio.filter(fd => {
  //   const matchesSearch = fd.bankName.toLowerCase().includes(searchTerm.toLowerCase()) || 
  //                        fd.id.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = filterStatus === 'all' || fd.status === filterStatus;
  //   return matchesSearch && matchesStatus;
  // });

  // Calculate portfolio summary
  const portfolioSummary = {
    totalInvested: fdPortfolio.reduce((sum, fd) => sum + Number(fd.amount), 0),
    activeInvestments: fdPortfolio.filter(fd => fd.status === 'active').reduce((sum, fd) => sum + Number(fd.amount), 0),
    totalMaturityValue: fdPortfolio.reduce((sum, fd) => sum + (fd.maturityAmount || 0), 0),
    activeCount: fdPortfolio.length,
    // maturedCount: fdPortfolio.filter(fd => fd.status === 'matured').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Fixed Deposit Portfolio</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm">Total Invested</h3>
            <p className="text-2xl font-semibold">₹{portfolioSummary.totalInvested.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm">Active Investments</h3>
            <p className="text-2xl font-semibold">₹{portfolioSummary.activeInvestments.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm">Total Maturity Value</h3>
            <p className="text-2xl font-semibold">₹{portfolioSummary.totalMaturityValue.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm">FD Count</h3>
            <p className="text-2xl font-semibold">
              {portfolioSummary.activeCount} 
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'portfolio' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            FD Portfolio
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('history')}
          >
            Transaction History
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search FDs..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="matured">Matured</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <FiDownload size={16} />
              Export
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <FiPrinter size={16} />
              Print
            </button>
          </div>
        </div>

        {/* FD Portfolio Table */}
        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FD Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenure</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Withdrawal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                {/* id: 'FD123456',
  //     bankName: 'State Bank of India',
  //     amount: 500000,
  //     interestRate: 7.1,
  //     tenure: '5 years',
  //     startDate: '2023-05-15',
  //     maturityDate: '2028-05-15',
  //     status: 'active',
  //     interestPayout: 'Quarterly',
  //     maturityAmount: 712000,
  //     logo: 'https://logo.clearbit.com/sbi.co.in' */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {fdPortfolio.map((fd) => (
                    <tr key={fd._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">{fd.bank_name}</div>
                            <div className="text-sm text-gray-500">FD ID: FD{fd._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">₹{fd.amount}</div>
                        <div className="text-sm text-gray-500">Maturity: ₹{fd.maturity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {fd.interest_rate}%
                        <div className="text-sm text-gray-500">{fd.interest_rate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{fd.tenures}</div>
                        <div className="text-sm text-gray-500">Matures on: {new Date(fd.createdAt).toLocaleDateString('en-IN')}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          fd.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                        }`}> Waiting
                          {/* {fd.status.charAt(0).toUpperCase() + fd.status.slice(1)} */}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Waiting</button>
                        
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Renew</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transaction History */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                      {fdPortfolio.map((fd) => (
                <tr key={`txn-${fd._id}`} className="hover:bg-gray-50">
                   <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">FD Opening</div>
        <div className="text-sm text-gray-500">FD ID: {fd._id}</div>
        {/* <div className="text-sm text-gray-500">User ID: {fd.user_id}</div> */}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">

          <div className="text-gray-900">{fd.bank_name}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        ₹{fd.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-900">{new Date(fd.startDate).toLocaleDateString('en-IN')}</div>
        <div className="text-sm text-gray-500">at {new Date(fd.startDate).toLocaleTimeString('en-IN')}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          fd.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
        }`}>
          Completed
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900">Download</button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {fdPortfolio.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <div className="mx-auto h-40 mb-4 flex items-center justify-center text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Fixed Deposits Found</h3>
            <p className="text-gray-500 mb-4">We couldnt find any FDs matching your criteria</p>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FDPortfolioPage;




