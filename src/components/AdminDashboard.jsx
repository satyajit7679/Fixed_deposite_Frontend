import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {

  Card,
 
} from "@material-tailwind/react";

import Footer from "../components/Footer";
import axios from "axios";


export default function Settings() {
   const [users, setUsers] = useState([]);
   const [contact, setcontact] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        console.log(response.data) // Adjust port if needed
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const fetchcontact = async () => {
      try {
        const response = await axios.get("http://localhost:3001/contact-data");
        // console.log(response.data.data) // Adjust port if needed
        setcontact(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    fetchcontact();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };



  const [activeTab, setActiveTab] = useState("basic-details");



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Container */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64">
            <Card className="p-6 shadow-lg rounded-xl bg-white">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200"></h2>
              <nav className="space-y-2">
                {[
                  { id: "basic-details", label: "User Information" },
                  { id: "reports", label: "user Message" },
                
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <Card className="p-8 shadow-lg rounded-xl bg-white">
              {/* Profile Information Section */}
              {activeTab === "basic-details" && (
                 <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard - User Management
      </h1>

      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
      >
        Logout
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Total Deposit (₹)</th>
              <th className="py-3 px-6 text-center">Password</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-4 px-6">{user.userid ? user.userid.name : 'NA'}</td>
                <td className="py-4 px-6">{user.userid ? user.userid.email : 'NA'}</td>
                <td className="py-4 px-6">{user.userid ? user.userid.phone : 'NA'}</td>
                <td className="py-4 px-6 text-center">
                  {user.amount || 0}
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="flex items-center">
                    {showPassword ? user.password : ""}
                    <button
                      type="button"
                      className="ml-2 text-blue-500 text-sm sm:text-base"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
                    onClick={() => setSelectedUser(user)}
                  >
                    View Transactions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Transactions for {selectedUser.name}
              </h2>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left">Transaction ID</th>
                    <th className="py-3 px-6 text-left">Amount (₹)</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedUser.transactions || []).map((txn) => (
                    <tr key={txn._id || txn.id} className="border-t">
                      <td className="py-4 px-6">{txn._id || txn.id}</td>
                      <td className="py-4 px-6">{txn.amount}</td>
                      <td className="py-4 px-6">{txn.date}</td>
                      <td className="py-4 px-6">{txn.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
              )}

              {/* Financial Reports Section */}
              {activeTab === "reports" && (
                <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard - User Management
      </h1>

      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
      >
        Logout
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contact.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.message || "N/A"}</td>
                
                <td className="py-4 px-6 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
                    onClick={() => setSelectedUser(user)}
                  >
                    Waiting
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Transactions for {selectedUser.name}
              </h2>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left">Transaction ID</th>
                    <th className="py-3 px-6 text-left">Amount (₹)</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedUser.transactions || []).map((txn) => (
                    <tr key={txn._id || txn.id} className="border-t">
                      <td className="py-4 px-6">{txn._id || txn.id}</td>
                      <td className="py-4 px-6">{txn.amount}</td>
                      <td className="py-4 px-6">{txn.date}</td>
                      <td className="py-4 px-6">{txn.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
              )}

              {/* Security Section */}
              {/* {activeTab === "change-password" && (
                <div>
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Security Settings</h1>
                    <p className="text-gray-600">Change your password to keep your account secure</p>
                  </div>
                  
                  <form className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <Input 
                        type="password" 
                        className="!border !border-gray-300 focus:!border-blue-500 !rounded-lg !py-3 !bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <Input 
                        type="password" 
                        className="!border !border-gray-300 focus:!border-blue-500 !rounded-lg !py-3 !bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <Input 
                        type="password" 
                        className="!border !border-gray-300 focus:!border-blue-500 !rounded-lg !py-3 !bg-gray-50"
                      />
                    </div>
                    <div className="pt-4">
                      <Button 
                        className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow text-white font-medium"
                      >
                        Update Password
                      </Button>
                    </div>
                  </form>
                </div>
              )} */}
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


