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
  const [error, setError] = useState("");  // <-- error state added

  const { loginWithEmail, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");  // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill all the fields.");  // Show error inside form
      return;
    }

    try {
      await loginWithEmail(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed.");  // Show error inside form
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <span
              onClick={togglePassword}
              className="absolute top-9 right-3 cursor-pointer select-none"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {/* Error message for password/login */}
            {error && (
              <p className="text-red-600 text-sm mt-1">
                Invalid password or Email
              </p>
            )}

            {/* Forget Password লিঙ্ক পাসওয়ার্ড ইনপুটের নিচে ছোট করে */}
            <p
              onClick={() => navigate("/forget-password")}
              className="text-sm text-blue-600 cursor-pointer mt-1 hover:underline"
            >
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-500 mb-2">Or login with</p>
          <div className="flex justify-center gap-6 text-xl">
            <FaGoogle
              onClick={handleGoogleLogin}
              className="cursor-pointer text-red-500 hover:scale-110 transition-transform"
            />
            <FaFacebook className="cursor-pointer text-blue-600 hover:scale-110 transition-transform" />
            <FaInstagram className="cursor-pointer text-pink-500 hover:scale-110 transition-transform" />
          </div>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
