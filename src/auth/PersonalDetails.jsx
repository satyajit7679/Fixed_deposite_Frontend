import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const {state} = useLocation()
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const validateForm = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const aadhaarRegex = /^\d{12}$/;

    if (!phoneRegex.test(form.Nominee_phone)) {
      setError('Please enter a valid 10-digit phone number starting with 6-9.');
      return false;
    }
    if (!aadhaarRegex.test(form.Nominee_aadhaar)) {
      setError('Please enter a valid 12-digit Aadhaar number.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const addi = state.pan
      const paylod = {...addi, ...form}
      console.log(form, addi)
      // const res = await axios.post('http://localhost:3001/api/PersonalDetails', paylod,{
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      setSuccess('Details saved successfully!');
      navigate("/Payment", {state: paylod});
    } catch (err) {
      console.error(err);
      setError('Failed to save details. Please try again.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Enter Personal Details</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
              <input
                type="text"
                placeholder="Enter 12-digit Aadhaar"
                value={form.aadhaar}
                onChange={(e) => setForm({ ...form, aadhaar: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Name</label>
              <input
                type="text"
                placeholder="Nominee's full name"
                value={form.Nominee_name}
                onChange={(e) => setForm({ ...form, Nominee_name: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Phone</label>
              <input
                type="text"
                placeholder="Nominee's 10-digit phone"
                value={form.Nominee_phone}
                onChange={(e) => setForm({ ...form, Nominee_phone: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Aadhaar</label>
              <input
                type="text"
                placeholder="Nominee's 12-digit Aadhaar"
                value={form.Nominee_aadhaar}
                onChange={(e) => setForm({ ...form, Nominee_aadhaar: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="flex flex-col space-y-3 pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition duration-200"
            >
              Continue to Payment
            </button>

            <Button
              className="w-full py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition duration-200"
              color="gray"
              onClick={() => navigate("/PanValidation")}
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;