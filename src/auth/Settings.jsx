import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  Tab,
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { apiUrl } from "../api/config";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("basic-details");
  const [userdata, setUserdate] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${apiUrl}/update-profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserdate(res.data.Udata);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Container */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64">
            <Card className="p-6 shadow-lg rounded-xl bg-white">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Account Settings</h2>
              <nav className="space-y-2">
                {[
                  { id: "basic-details", label: "Profile Information" },
                  { id: "reports", label: "Financial Reports" },
                  { id: "change-password", label: "Security" }
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
                <div>
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
                    <p className="text-gray-600">Update your personal details and contact information</p>
                  </div>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <Input 
                          defaultValue={userdata.name} 
                          className="!border !border-gray-300 focus:!border-blue-500 !rounded-lg !py-3 !bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Input 
                          type="email" 
                          defaultValue={userdata.email} 
                          className="!border !border-gray-300 focus:!border-blue-500 !rounded-lg !py-3 !bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <Input 
                          type="tel" 
                          defaultValue={userdata.phone} 
                          className="!border !border-gray-300 focus:!border-blue-500 !rounded-lg !py-3 !bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <Input 
                          type="date" 
                          defaultValue={userdata?.dob || ''} 
                          className="!border !border-gray-300 focus:!border-blue-500 !rounded-lg !py-3 !bg-gray-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <Textarea 
                        defaultValue={userdata.address} 
                        className="!border !border-gray-300 focus:!border-blue-500 !rounded-lg !bg-gray-50"
                        rows={4}
                      />
                    </div>
                    <div className="pt-4">
                      <Button 
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow text-white font-medium"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Financial Reports Section */}
              {activeTab === "reports" && (
                <div>
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
                    <p className="text-gray-600">Download your financial statements and documents</p>
                  </div>
                  
                  <div className="space-y-4">
                    {["Investment Summary", "Interest Statement", "Tax Report", "Maturity Calendar"].map((report) => (
                      <div
                        key={report}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="mb-3 md:mb-0">
                          <h3 className="text-lg font-semibold text-gray-800">{report}</h3>
                          <p className="text-gray-600 text-sm">Download your {report.toLowerCase()}</p>
                        </div>
                        <Button 
                          variant="outlined" 
                          color="blue"
                          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2 rounded-lg"
                        >
                          Download PDF
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeTab === "change-password" && (
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
              )}
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}