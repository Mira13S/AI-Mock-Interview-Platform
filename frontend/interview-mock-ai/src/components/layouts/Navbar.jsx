"use client"
import { useLocation } from 'react-router-dom';
import ProfileInfoCard from "../Cards/ProfileInfoCard"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axioInstance"; // adjust path if needed
import { API_PATHS } from "../../utils/apiPaths";


const Navbar = () => {
    const navigate = useNavigate();

const handleSessionsClick = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
    const sessions = res.data;
    if (sessions.length > 0) {
      navigate(`/interview-prep/${sessions[0]._id}`);
    } else {
      navigate("/sessions"); // or do nothing
    }
  } catch (error) {
    console.error("Error fetching sessions:", error);
    navigate("/sessions");
  }
};

    const location = useLocation();
   const currentPath = location.pathname;

  return (
    <div className="h-16 bg-white/95 border-b border-gray-200/60 backdrop-blur-md shadow-sm sticky top-0 z-30 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Enhanced Logo/Brand Section */}
          <Link
            to="/dashboard"
            className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
          >
            {/* Logo Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                Interview Prep AI
              </h2>
              <span className="text-xs text-gray-500 font-medium -mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                Smart Interview Practice
              </span>
            </div>
          </Link>

          {/* Navigation Center Section (Optional - can be expanded later) */}
          <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                        <Link
                            to="/dashboard"
                            className={`text-sm font-medium transition-all relative group ${
                            currentPath === "/dashboard"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            Dashboard
                            <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                                currentPath === "/dashboard" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                            ></span>
                        </Link>

                             <button
                            onClick={handleSessionsClick}
                            className={`text-sm font-medium transition-all relative group ${
                                currentPath.startsWith("/sessions") || currentPath.startsWith("/interview-prep")
                                ? "text-blue-600 font-semibold"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                            >
                            Sessions
                            <span
                                className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                                currentPath.startsWith("/sessions") || currentPath.startsWith("/interview-prep")
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                                }`}
                            ></span>
                            </button>

                 </nav>
                 </div>

          {/* Enhanced Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell (Optional) */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 group relative">
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-7A2.5 2.5 0 016.5 7H9"
                />
              </svg>
              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Card Container */}
            <div className="relative">
              <ProfileInfoCard />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </div>
  )
}

export default Navbar;
