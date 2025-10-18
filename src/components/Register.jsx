import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });

  const { registerWithEmail, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, photo } = formData;
    if (!name || !email || !password || !photo) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      await registerWithEmail(email, password);

      const photoURL = URL.createObjectURL(photo);
      await updateUserProfile(name, photoURL);

      await fetch("https://kalamajhi-high-school-backend.vercel.app/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      toast.success("Registration successful!");
      navigate("/");

    } catch (error) {
      toast.error(error.message || "Registration failed.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      toast.success("Google Login successful!");
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Create Account</h2>
              <p className="text-white/90 text-lg mb-6">নতুন অ্যাকাউন্ট তৈরি করুন</p>
              
              {/* Additional decorative content for large screens */}
              <div className="hidden md:block mt-8 space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="flex items-center gap-3 text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-bold text-lg">Secure Registration</p>
                      <p className="text-sm text-white/80">Your data is protected</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="flex items-center gap-3 text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-bold text-lg">Quick & Easy</p>
                      <p className="text-sm text-white/80">Just a few steps</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="md:w-3/5 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <label className=" mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border-2 border-orange-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                  required
                />
              </div>

              {/* Photo Upload Field */}
              <div className="animate-fadeInUp" style={{ animationDelay: '150ms' }}>
                <label className=" mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Upload Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border-2 border-orange-200 px-3 py-2 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
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
              <div className="relative animate-fadeInUp" style={{ animationDelay: '250ms' }}>
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
                  className="absolute top-11 right-4 cursor-pointer text-gray-500 hover:text-orange-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mt-6 animate-fadeInUp"
                style={{ animationDelay: '300ms' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Register</span>
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
              <p className="text-gray-500 text-sm font-semibold">Or register with</p>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
            </div>

            {/* Google Register Button */}
            <div className="flex justify-center animate-fadeInUp" style={{ animationDelay: '350ms' }}>
              <FaGoogle
                className="cursor-pointer text-red-500 hover:scale-110 hover:rotate-12 transition-all duration-300 text-3xl"
                onClick={handleGoogleRegister}
              />
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              <p className="text-gray-700">
                Already have an account?{" "}
                <Link to="/login" className="font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent hover:from-amber-600 hover:to-yellow-600 transition-all">
                  Login
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

export default Register;