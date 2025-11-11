import React from "react";
import { useState } from "react";
import { reset2FA, verify2FA } from "../service/authApi.js";

const TwoFAVerification = ({onVerifySuccess, onResetSuccess}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  
  
  
  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try{
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
    } catch(error){
      setOtp("");
      console.log(error.message);
      setError("Invalid OTP");
    }
  }
  
  const handleReset = async() => {
    try {
      const { data } = await reset2FA();
      onResetSuccess(data);
    } catch(error){
      console.log(error.message);
      setError(error.message);
    }
  }
  
  
  
  
  
  
  
  return (
    <form
      onSubmit={handleTokenVerification }
      className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto border border-gray-200"
    >
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
         Validate OTP
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Please enter the OTP to verify 2FA
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-gray-700 text-sm font-medium">OTP</label>
          <input
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your OTP"
            required
          />
        </div>

      
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}


        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-200 mb-3"
        >
          Verify OTP
        </button>
        <button
          type="Button"
          className="w-full bg-slate-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-200"
          onClick={handleReset}
        >
          Reset 2FA 
        </button>
      </div>
    </form>
  )
};

export default TwoFAVerification;