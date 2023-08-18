import React, { useState } from 'react';
import logo from './bannerpicture.png'; // Update the path to your logo image

const SignIn = ({ handleSignIn,errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-white to-blue-400">
      <div className="bg-white p-8 rounded-xl shadow-xl w-1/3 transform transition duration-300 hover:scale-105">
        <img src={logo} alt="Company Logo" className="w-37 mx-auto mb-6" /> {/* Adjust the size and margin as needed */}
        <h1 className="text-2xl mb-4 text-center font-bold animate-fadeInDown">Sign In</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded shadow-sm transition duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded shadow-sm transition duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="button"
            onClick={(e) => handleSignIn(e, email, password)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
