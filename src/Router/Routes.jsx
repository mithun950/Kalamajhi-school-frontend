// routes.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Login from "../components/login";
import Register from "../components/Register";
import ForgetPassword from "../Auth/ForgetPassword";
import Home from "../Pages/Home/Home";
import NoticeBoardTable from "../Pages/NoticeBoard/Noticeboard";
import Teachers from "../Pages/Teachers/Teachers";



import AdminHome from "../DashBoard/DashboardContent/AdminHome";
import ManageTeachers from "../DashBoard/DashboardContent/ManageTeachers";
import ManageStudents from "../DashBoard/DashboardContent/ManageStudents";
import ManageClasses from "../DashBoard/DashboardContent/ManageClasses";
import ManageNotices from "../DashBoard/DashboardContent/ManageNotices";
import UserHome from "../DashBoard/DashboardContent/UserHome";
import MyClasses from "../DashBoard/DashboardContent/MyClasses";
import MyProfile from "../DashBoard/DashboardContent/MyProfile";
import Dashboard from "../DashBoard/DashBorad";
import ManageMarquee from "../DashBoard/DashboardContent/ManageMarquee";
import ManageTestimonials from "../DashBoard/DashboardContent/ManageTestimonials";
import ManageOpinions from "../DashBoard/DashboardContent/ManageOpinions";
import ClassRoutine from "../DashBoard/DashboardContent/ManageRoutine";
import Routines from "../Pages/ClassRoutine/Routines";
import AdmissionForm from "../Pages/AddmissionForm/AdmisionForm";
import ManageAdmission from "../DashBoard/DashboardContent/ManageAdmission";
import MyResult from "../Layout/StudentResult/MyResult";
import ManageResults from "../DashBoard/DashboardContent/ManageResults";
import StudentList from "../Layout/Students/StudentsList";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, element: <Home /> },
      { path: "notices", element: <NoticeBoardTable /> },
      { path: "teachers", element: <Teachers /> },
      { path: "routines", element: <Routines></Routines> },
      { path: "admissions", element: <AdmissionForm></AdmissionForm>},
      {path: "results",element:<MyResult></MyResult>},
      {path: "students",element:<StudentList></StudentList>},
      // Dashboard as nested route
      {
    path: "/dashboard",
    element: <Dashboard />,  // change to false to test user menu
    children: [
      // Admin routes
      { path: "adminHome", element: <AdminHome /> },
      { path: "manageTeachers", element: <ManageTeachers /> },
      { path: "manageStudents", element: <ManageStudents /> },
      { path: "manageClasses", element: <ManageClasses /> },
      { path: "manageNotices", element: <ManageNotices /> },
      { path: "manageMarquee", element: <ManageMarquee /> },
      { path: "manageTestimonials", element: <ManageTestimonials /> },
      { path: "manageOpinions", element: <ManageOpinions /> },
      { path: "manageRoutines", element: <ClassRoutine></ClassRoutine> },
      { path: "manageAdmission", element: <ManageAdmission></ManageAdmission> },
      { path: "manageResults", element: <ManageResults></ManageResults> },

      // User routes
      { path: "userHome", element: <UserHome /> },
      { path: "myClasses", element: <MyClasses /> },
      { path: "myProfile", element: <MyProfile /> },
    ],
  },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget-password", element: <ForgetPassword /> },
]);

export default router;
