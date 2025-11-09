import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <p className="text-center mt-10 text-blue-800">Loading profile...</p>;
  if (!user)
    return (
      <p className="text-center mt-10 text-red-600 font-medium">Failed to load profile.</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-blue-800 rounded-t-xl p-6 text-white">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="mt-2 opacity-90">Your personal banking information</p>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <img
                  src={
                    user.avatar ||
                    "https://i.pinimg.com/736x/09/24/a7/0924a7ef295741e916c8f42512bbe5bd.jpg"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Verified
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-blue-600 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 pb-2 border-b border-blue-100">
                  Personal Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-800">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium text-gray-800">
                      {user.dob
                        ? new Date(user.dob).toLocaleDateString()
                        : "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 pb-2 border-b border-blue-100">
                  Address Information
                </h3>
                <div>
                  <p className="text-sm text-gray-500">Residential Address</p>
                  <p className="font-medium text-gray-800">
                    {user.address || "Not Provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
            <p className="text-center text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;