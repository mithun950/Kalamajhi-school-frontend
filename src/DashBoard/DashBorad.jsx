import React, { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import {


  FaUsers,
  FaBook,
  FaClipboardList,
  FaUserCircle,
  FaChild,
  FaOpera,
  FaHome,
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { FaUsersGear } from "react-icons/fa6";
import { TbMarquee } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const linkClass = ({ isActive }) =>
    `relative flex items-center justify-center md:justify-start space-x-2 px-2 py-1 rounded transition-colors duration-200 
    ${isActive ? "bg-white text-orange-500 font-bold" : "hover:bg-orange-300"}`;

  if (isAdminLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar - Large Device */}
      <div
        className={`bg-orange-400 p-4 text-black transition-all duration-300
          ${isMenuOpen ? "w-64" : "w-16"} 
          md:block hidden`}
      >
        {/* Toggle button (only for md and larger) */}
        <div className="hidden md:block">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mb-4 font-bold"
          >
            {isMenuOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>

        <ul className="space-y-4 font-semibold">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome" className={linkClass}>
                 <FaUsersGear size={20} />
                  {isMenuOpen && <span>Manage Users</span>}
                  {!isMenuOpen && (
                    <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                      Admin Home
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageTeachers" className={linkClass}>
                  <GiTeacher size={20} />
                  {isMenuOpen && <span>Manage Teachers</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageStudents" className={linkClass}>
                  <FaUsers size={20} />
                  {isMenuOpen && <span>Manage Students</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageRoutines" className={linkClass}>
                  <FaBook size={20} />
                  {isMenuOpen && <span>Manage Routines</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageResults" className={linkClass}>
                  <FaBook size={20} />
                  {isMenuOpen && <span>Manage Result</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageNotices" className={linkClass}>
                  <FaClipboardList size={20} />
                  {isMenuOpen && <span>Manage Notices</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageMarquee" className={linkClass}>
                  <TbMarquee size={20} />
                  {isMenuOpen && <span>Manage Marquee</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageTestimonials" className={linkClass}>
                  <FaChild size={20}/>
                  {isMenuOpen && <span>Manage Testimonials</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageOpinions" className={linkClass}>
                 <FaOpera size={20} />
                  {isMenuOpen && <span>Manage Opinions</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageAdmission" className={linkClass}>
                 <FaOpera size={20} />
                  {isMenuOpen && <span>Manage Admission</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageGallery" className={linkClass}>
                 <FaOpera size={20} />
                  {isMenuOpen && <span>Manage Gallery</span>}
                </NavLink>
              </li>
             
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className={linkClass}>
                  <FaHome size={20} />
                  {isMenuOpen && <span>User Home</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myClasses" className={linkClass}>
                  <FaBook size={20} />
                  {isMenuOpen && <span>My Classes</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProfile" className={linkClass}>
                  <FaUserCircle size={20} />
                  {isMenuOpen && <span>My Profile</span>}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Sidebar - Small Device */}
      <div className="bg-orange-400 p-4 text-black w-16 flex flex-col items-center md:hidden">
        <ul className="space-y-6">
          {isAdmin ? (
            <>
              <li className="group relative" title="Admin Home">
                <NavLink to="/dashboard/adminHome" className={linkClass}>
                   <FaUsersGear size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Manage Users
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Teachers">
                <NavLink to="/dashboard/manageTeachers" className={linkClass}>
                  <GiTeacher size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Manage Teachers
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Students">
                <NavLink to="/dashboard/manageStudents" className={linkClass}>
                  <FaUsers size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Manage Students
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Classes">
                <NavLink to="/dashboard/manageRoutines" className={linkClass}>
                  <FaBook size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Manage Routine
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Notices">
                <NavLink to="/dashboard/manageNotices" className={linkClass}>
                  <FaClipboardList size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Manage Notices
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Marquee">
                <NavLink to="/dashboard/manageMarquee" className={linkClass}>
                  <TbMarquee size={20}/>
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Manage Marquee
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Testimonials">
                <NavLink to="/dashboard/manageTestimonials" className={linkClass}>
                  <FaChild size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                   Manage Testimonials
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Testimonials">
                <NavLink to="/dashboard/manageOpinions" className={linkClass}>
                 <FaOpera size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                   Manage Opinions
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Admission">
                <NavLink to="/dashboard/manageAdmission" className={linkClass}>
                 <FaOpera size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                   Manage Admission
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="Manage Admission">
                <NavLink to="/dashboard/manageGallery" className={linkClass}>
                 <FaOpera size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                   Manage Gallery
                  </span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="group relative" title="User Home">
                <NavLink to="/dashboard/userHome" className={linkClass}>
                  <FaHome size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    User Home
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="My Classes">
                <NavLink to="/dashboard/myClasses" className={linkClass}>
                  <FaBook size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    My Classes
                  </span>
                </NavLink>
              </li>
              <li className="group relative" title="My Profile" >
                <NavLink to="/dashboard/myProfile" className={linkClass}>
                  <FaUserCircle size={20} />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    My Profile
                  </span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        {window.location.pathname === "/dashboard" && (
          <Navigate
            to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
          />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
