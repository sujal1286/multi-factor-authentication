import React, { useState } from "react";
import { register, loginUser } from "../service/authApi";

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(username, password);
      setMessage(data.message);
      setError('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error.message);
      setMessage('');
      setError("Something went wrong during login");
      setUsername('');
      setPassword('');
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(username, password, confirmPassword);
      setIsRegister(false);
      setMessage(data.message);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.log(error.message);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setError("Something went wrong during registration");
    }
  };

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setMessage('');
  };

  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto border border-gray-200"
    >
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {isRegister ? "Register to get started" : "Login to continue"}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-gray-700 text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>

        {isRegister && (
          <div>
            <label className="text-gray-700 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Re-enter your password"
              required
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        {message && <p className="text-green-600 text-sm font-semibold">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-200"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={handleRegisterToggle}
            className="text-blue-600 hover:underline font-medium"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
