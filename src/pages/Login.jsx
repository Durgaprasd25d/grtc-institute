import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password visibility toggle
import Loader from "../components/Loader"; // Import the Loader component

const Login = () => {
  const { state, login } = useStudentContext();
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await login(registrationNo, password);

    if (isSuccess) {
      toast.success("Login Successful!");
      navigate("/");
    } else {
      toast.error("Login Failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full">
        <div className="px-8 py-10">
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-2">Welcome Back</h1>
          <p className="text-center text-teal-500 mb-6">Log in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
              placeholder="Registration Number"
              required
              className="w-full px-4 py-3 rounded-xl border border-teal-300 placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-teal-700 bg-teal-50"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-xl border border-teal-300 placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-teal-700 bg-teal-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={state.loading}
              className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 ${
                state.loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              {state.loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {state.error && (
            <p className="mt-4 text-red-500 text-center">{state.error}</p>
          )}
        </div>
      </div>

      {state.loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Login;
