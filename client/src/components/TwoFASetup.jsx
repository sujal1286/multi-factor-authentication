import React, { useState, useEffect } from "react";
import { setup2FA } from "../service/authApi";

const TwoFASetup = ({ onSetupComplete }) => {
  const [response, setResponse] = useState({});
  const [message, setMessage] = useState("");

  const fetchQRCode = async () => {
    try {
      const { data } = await setup2FA();
      setResponse(data);
    } catch (error) {
      console.log("QR Error:", error);
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  const copyClipBoard = async () => {
    if (response.secret) {
      navigator.clipboard.writeText(response.secret);
      setMessage("Copied to clipboard");
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Turn on Two-Factor Authentication
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Scan the QR code below with your authenticator app
        </p>
      </div>

      <div className="p-6">
        <div className="flex justify-center">
          {response.qrCode ? (
            <img
              src={response.qrCode}
              alt="2FA QR Code"
              className="mb-4 border rounded-md"
            />
          ) : (
            <p className="text-gray-500">Loading QR...</p>
          )}
        </div>

        <div className="mt-4">
          {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

          <input
            readOnly
            value={response.secret || ""}
            onClick={copyClipBoard}
            className="w-full border rounded text-gray-600 p-4 cursor-pointer"
          />
        </div>

        <button
          onClick={onSetupComplete}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
};

export default TwoFASetup;
