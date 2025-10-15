import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { IoLogInOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About-Us", path: "/about" },
    { name: "Class-Routine", path: "/routines" },
    { name: "Student-List", path: "/students" },
    { name: "My-Result", path: "/results" },
    { name: "Teachers", path: "/teachers" },
    { name: "Notice-Board", path: "/notices" },
    { name: "Admission", path: "/admissions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact-Us", path: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setProfileOpen(!profileOpen);

  // Click outside profile dropdown closes it
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setProfileOpen(false);
      toast.success("Successfully logged out!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed! Please try again.");
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-white via-orange-50 to-white shadow-lg sticky top-0 z-50 border-b-2 border-orange-200">
        <div className="w-11/12 mx-auto flex items-center justify-between py-4 px-2 relative">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex-shrink-0"
          >
            Kalamajhi High School
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-4 xl:gap-6 font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`text-sm xl:text-base hover:text-orange-500 transition-all duration-300 relative py-2 ${
                    location.pathname === link.path
                      ? "text-orange-500 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:rounded-full"
                      : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Login or User Profile */}
            {!user ? (
              <Link
                to="/login"
                className="ml-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Login <IoLogInOutline className="text-lg" />
              </Link>
            ) : (
              <div className="relative ml-2" ref={profileRef}>
                {/* user photo or initial */}
                {user.photoURL ? (
                  <img
                    onClick={toggleProfileMenu}
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-11 h-11 rounded-full cursor-pointer border-3 border-orange-400 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 ring-2 ring-orange-200"
                    title={user.displayName}
                  />
                ) : (
                  <div
                    onClick={toggleProfileMenu}
                    className="w-11 h-11 rounded-full cursor-pointer border-2 border-orange-400 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold select-none shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
                    title={user.displayName || "User"}
                  >
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 font-semibold">
                      {user.displayName || "User"}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 hover:bg-orange-50 transition-colors duration-200 text-gray-700 hover:text-orange-600"
                    >
                      📊 Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 hover:bg-orange-50 transition-colors duration-200 text-gray-700 hover:text-orange-600"
                    >
                      👤 Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2 text-red-600 hover:text-red-700 border-t border-gray-200"
                    >
                      Logout <FiLogOut />
                    </button>
                  </div>
                )}
              </div>
            )}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-orange-100 transition-colors duration-300"
            >
              {isOpen ? (
                <FiX size={28} className="text-orange-600" />
              ) : (
                <FiMenu size={28} className="text-orange-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-gradient-to-b from-white to-orange-50 shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-5 border-b-2 border-orange-200 bg-white">
            <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Menu
            </span>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-orange-100 transition-colors duration-300"
            >
              <FiX size={24} className="text-orange-600" />
            </button>
          </div>
          <ul className="flex flex-col gap-1 px-4 py-4 max-h-[calc(100vh-180px)] overflow-y-auto">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  onClick={toggleMenu}
                  className={`block py-3 px-4 text-base font-semibold rounded-lg transition-all duration-300 ${
                    location.pathname === link.path
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {!user ? (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="mt-4 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-md font-semibold"
              >
                Login <IoLogInOutline className="text-xl" />
              </Link>
            ) : (
              <div className="mt-4 border-2 border-orange-200 rounded-xl p-4 bg-white shadow-md">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-orange-200">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-12 h-12 rounded-full border-2 border-orange-400"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg">
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}
                  <p className="font-bold text-gray-800">
                    {user.displayName || "User"}
                  </p>
                </div>
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="block px-4 py-2.5 hover:bg-orange-50 rounded-lg mb-1 transition-colors duration-200 text-gray-700 hover:text-orange-600 font-medium"
                >
                  📊 Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="block px-4 py-2.5 hover:bg-orange-50 rounded-lg mb-1 transition-colors duration-200 text-gray-700 hover:text-orange-600 font-medium"
                >
                  👤 Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-red-50 rounded-lg cursor-pointer flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors duration-200 mt-2 border-t border-orange-200 pt-3"
                >
                  Logout <FiLogOut />
                </button>
              </div>
            )}
          </ul>
        </div>

        {/* Overlay for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden backdrop-blur-sm"
            onClick={toggleMenu}
          ></div>
        )}
      </nav>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Navbar;