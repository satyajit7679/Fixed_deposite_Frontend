import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");

        // Debug logs
        console.log("=== FETCH USERS DEBUG ===");
        console.log("API URL:", apiUrl);
        console.log("Full URL:", `${apiUrl}/api/users`);
        console.log("Token exists:", !!token);

        if (!token) {
          console.error("No token found, redirecting to login");
          navigate("/login");
          return;
        }

        // Try different possible endpoints
        let response;
        const possibleEndpoints = [
          `${apiUrl}/users`,           // Without /api
          `${apiUrl}/api/users`,       // With /api
          `${apiUrl}/admin/users`,     // Admin route
          `${apiUrl}/api/admin/users`, // API admin route
        ];

        let lastError = null;
        
        for (const endpoint of possibleEndpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            response = await axios.get(endpoint, {
              headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              },
            });
            console.log(`✅ Success with endpoint: ${endpoint}`);
            break; // Success, exit loop
          } catch (err) {
            console.log(`❌ Failed with endpoint: ${endpoint}`, err.response?.status);
            lastError = err;
            continue; // Try next endpoint
          }
        }

        if (!response) {
          throw lastError || new Error("All endpoints failed");
        }

        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        // Handle different response formats from backend
        let usersData = [];
        
        if (response.data?.users && Array.isArray(response.data.users)) {
          // Format: { users: [...] }
          usersData = response.data.users;
          console.log("Format: { users: [...] }");
        } else if (Array.isArray(response.data)) {
          // Format: [...]
          usersData = response.data;
          console.log("Format: [...]");
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          // Format: { data: [...] }
          usersData = response.data.data;
          console.log("Format: { data: [...] }");
        } else {
          console.warn("Unexpected response format:", response.data);
          usersData = [];
        }

        console.log("Processed users count:", usersData.length);
        console.log("Users data:", usersData);
        
        setUsers(usersData);
        setLoading(false);

      } catch (error) {
        console.error("=== FETCH USERS ERROR ===");
        console.error("Error message:", error.message);
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        console.error("Request URL:", error.config?.url);
        
        const errorMessage = 
          error.response?.data?.message || 
          error.response?.data?.error ||
          error.message || 
          "Failed to fetch users";
        
        setError(errorMessage);
        setLoading(false);
        
        // Redirect to login if unauthorized
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Unauthorized - clearing storage and redirecting");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setTimeout(() => navigate("/login"), 2000);
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  const togglePasswordVisibility = (userId) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-xl text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto mt-10">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Error Loading Users</h3>
                <p className="mt-2 text-red-700">{error}</p>
                <div className="mt-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="mr-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Retry
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">User Management System</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Deposit (₹)
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="mt-2 text-gray-500 text-lg">No users found</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id || user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.email || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.phone || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <span className="text-sm font-semibold text-green-600">
                          ₹{user.totalDeposit || 0}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-mono text-gray-700">
                            {showPasswords[user._id || user.id] 
                              ? (user.password || "N/A") 
                              : "••••••••"}
                          </span>
                          <button
                            type="button"
                            className="text-blue-500 text-sm hover:text-blue-700 font-medium"
                            onClick={() => togglePasswordVisibility(user._id || user.id)}
                          >
                            {showPasswords[user._id || user.id] ? "Hide" : "Show"}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          View Transactions
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Transactions - {selectedUser.name}
              </h2>
              <button
                className="text-white hover:text-gray-200 transition-colors"
                onClick={() => setSelectedUser(null)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
              {(!selectedUser?.transactions || selectedUser.transactions.length === 0) ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-4 text-gray-500 text-lg">No transactions found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Amount (₹)
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedUser.transactions.map((txn, index) => (
                        <tr key={txn._id || txn.id || index} className="hover:bg-gray-50">
                          <td className="py-4 px-6 text-sm text-gray-700 font-mono">
                            {txn._id || txn.id || "N/A"}
                          </td>
                          <td className="py-4 px-6 text-sm font-semibold text-green-600">
                            ₹{txn.amount || 0}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {txn.date ? new Date(txn.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : "N/A"}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              txn.status === "completed" || txn.status === "success"
                                ? "bg-green-100 text-green-800" :
                              txn.status === "pending"
                                ? "bg-yellow-100 text-yellow-800" :
                              txn.status === "failed"
                                ? "bg-red-100 text-red-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {txn.status || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}