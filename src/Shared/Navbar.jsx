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
    { name: "About Us", path: "/about" },
    { name: "Classes", path: "/classes" },
    { name: "Teachers", path: "/teachers" },
    { name: "Notice Board", path: "/notices" },
    { name: "Admission", path: "/admission" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
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
      <nav className="bg-white shadow-md sticky backdrop:backdrop-blur-3xl top-0 z-50 py-4">
        <div className="w-11/12 mx-auto flex items-center justify-between py-3 relative">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-700">
            Kalamajhi High School
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`hover:text-blue-600 transition duration-300 relative ${
                    location.pathname === link.path
                      ? "text-blue-700 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-blue-700"
                      : ""
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
                className="ml-4 px-4 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 transition flex items-center gap-1"
              >
                Login <IoLogInOutline />
              </Link>
            ) : (
              <div className="relative" ref={profileRef}>
                {/* user photo or initial */}
                {user.photoURL ? (
                  <img
                    onClick={toggleProfileMenu}
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-700"
                    title={user.displayName}
                  />
                ) : (
                  <div
                    onClick={toggleProfileMenu}
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-700 flex items-center justify-center bg-blue-700 text-white font-semibold select-none"
                    title={user.displayName || "User"}
                  >
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-blue-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-blue-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-blue-100 flex items-center gap-2"
                    >
                      Logout <FiLogOut />
                    </button>
                  </div>
                )}
              </div>
            )}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu}>
              <FiX size={24} />
            </button>
          </div>
          <ul className="flex flex-col gap-3 px-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  onClick={toggleMenu}
                  className={`block py-1 border-b text-gray-700 relative ${
                    location.pathname === link.path
                      ? "font-semibold border-blue-700"
                      : ""
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
                className="mt-4 px-4 py-2 bg-blue-700 text-white text-center rounded hover:bg-blue-800 transition flex items-center justify-center gap-1"
              >
                Login <IoLogInOutline />
              </Link>
            ) : (
              <div className="mt-4 border rounded p-2 bg-white">
                <p className="font-semibold mb-2">
                  Hello, {user.displayName || "User"}
                </p>
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="block px-4 py-2 hover:bg-blue-100 rounded"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="block px-4 py-2 hover:bg-blue-100 rounded"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-blue-100 rounded cursor-pointer flex items-center gap-2"
                >
                  Logout <FiLogOut />
                </button>
              </div>
            )}
          </ul>
        </div>
      </nav>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Navbar;
