import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader"; // Import the Loader component

const Login = () => {
  const { state, login } = useStudentContext();
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading state before the login attempt
    // This is already handled in the login function, no need to set here.

    const isSuccess = await login(registrationNo, password);

    if (isSuccess) {
      toast.success("Login Successful!");
      navigate("/");
    } else {
      toast.error("Login Failed. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-teal-800">
      <form
        className="bg-white rounded-lg shadow-md p-8 max-w-md w-full transform transition-all duration-500 hover:shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h1>
        <input
          type="text"
          value={registrationNo}
          onChange={(e) => setRegistrationNo(e.target.value)}
          placeholder="Registration Number"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={state.loading}
          className={`w-full py-3 font-semibold text-white rounded-lg transition duration-300 
            ${
              state.loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-br from-teal-400 to-teal-800 hover:bg-teal-800"
            }`}
        >
          {state.loading ? "Logging in..." : "Login"}
        </button>

        {state.error && (
          <p className="mt-4 text-red-500 text-center">{state.error}</p>
        )}
      </form>

      {/* Full-screen loader overlay */}
      {state.loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Login;
