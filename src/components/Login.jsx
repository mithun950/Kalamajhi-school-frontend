import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { loginWithEmail, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      await loginWithEmail(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-4 py-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl relative z-10 overflow-hidden border-4 border-orange-200 animate-fadeInUp">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Header Section with Gradient (Large Device) */}
          <div className="md:w-2/5 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 md:p-12 text-center md:flex md:flex-col md:justify-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-20 h-20 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-white rounded-full"></div>
            </div>
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome Back</h2>
              <p className="text-white/90 text-lg mb-6">আবার স্বাগতম</p>
              
              {/* Additional decorative content for large screens */}
              <div className="hidden md:block mt-8 space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="flex items-center gap-3 text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-bold text-lg">Secure Login</p>
                      <p className="text-sm text-white/80">Your credentials are safe</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="flex items-center gap-3 text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-bold text-lg">Quick Access</p>
                      <p className="text-sm text-white/80">Login in seconds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="md:w-3/5 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <label className=" mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full border-2 border-orange-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative animate-fadeInUp" style={{ animationDelay: '150ms' }}>
                <label className=" mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border-2 border-orange-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white shadow-sm hover:shadow-md pr-12"
                  required
                />
                <span
                  onClick={togglePassword}
                  className="absolute top-11 right-4 cursor-pointer select-none text-gray-500 hover:text-orange-600 transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </span>

                {/* Error message */}
                {error && (
                  <div className="mt-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-600 text-sm font-semibold">
                      Invalid password or Email
                    </p>
                  </div>
                )}

                {/* Forgot Password Link */}
                <p
                  onClick={() => navigate("/forget-password")}
                  className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent hover:from-amber-600 hover:to-yellow-600 transition-all mt-2 inline-block cursor-pointer"
                >
                  Forgot Password?
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mt-6 animate-fadeInUp"
                style={{ animationDelay: '200ms' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
              <p className="text-gray-500 text-sm font-semibold">Or login with</p>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
            </div>

            {/* Social Login Icons */}
            <div className="flex justify-center gap-6 text-3xl animate-fadeInUp" style={{ animationDelay: '250ms' }}>
              <FaGoogle
                onClick={handleGoogleLogin}
                className="cursor-pointer text-red-500 hover:scale-110 hover:rotate-12 transition-all duration-300"
              />
              <FaFacebook className="cursor-pointer text-blue-600 hover:scale-110 hover:rotate-12 transition-all duration-300" />
              <FaInstagram className="cursor-pointer text-pink-500 hover:scale-110 hover:rotate-12 transition-all duration-300" />
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              <p className="text-gray-700">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent hover:from-amber-600 hover:to-yellow-600 transition-all cursor-pointer"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;