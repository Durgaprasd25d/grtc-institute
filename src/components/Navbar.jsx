import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useStudentContext } from '../context/StudentContext';
import { CiUser, CiLogout } from "react-icons/ci";

const MotionLink = motion(RouterLink);

export const Navbar = () => {
  const { state, logout } = useStudentContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
    const links = document.querySelectorAll(".navbar-link");
    links.forEach((link, index) => {
      tl.fromTo(
        link,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        `-=${index * 0.1}`
      );
    });
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isMobileMenuOpen]);

  const routes = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Students", path: "/students" },
    { name: "Exams", path: "/exams" },
    { name: "Verification", path: "/verification" },
    { name: "Director", path: "/director" },
    { name: "Notice", path: "/notice" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-lg p-4 relative z-50">
      {/* Navbar Links (Desktop) */}
      <div className="hidden lg:flex space-x-8">
        {routes.map(({ name, path }) => (
          <MotionLink
            to={path}
            key={name}
            className="navbar-link text-gray-700 font-medium text-lg relative group"
            whileHover={{ scale: 1.1, color: "#115e59" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {name}
            <span className="absolute left-0 -bottom-1 h-1 w-full bg-gradient-to-r from-[#115e59] via-[#0f766e] to-[#0d9488] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </MotionLink>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(prev => !prev)}
        className="lg:hidden flex items-center justify-center p-2 text-gray-500 rounded-lg focus:outline-none hover:bg-gray-100"
        aria-controls="mobile-menu"
        aria-expanded={isMobileMenuOpen}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          {isMobileMenuOpen ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className="lg:hidden w-full bg-white shadow-md overflow-hidden"
        id="mobile-menu"
        ref={mobileMenuRef}
      >
        <div
          className={`flex flex-col space-y-4 px-6 py-4 transition-all duration-500 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          {routes.map(({ name, path }) => (
            <MotionLink
              to={path}
              key={name}
              className="navbar-link text-gray-700 font-medium text-lg"
              whileHover={{ scale: 1.1, color: "#1E40AF" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {name}
            </MotionLink>
          ))}
          {/* Student Profile Button for Mobile */}
          {state.student ? (
            <>
              <motion.button
                onClick={() => navigate('/profile')}
                className="flex items-center justify-center bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white py-2 px-6 rounded-full shadow-lg transition duration-200 text-lg"
              >
                <CiUser className="w-5 h-5 mr-2" /> Profile
              </motion.button>
              <motion.button
                onClick={() => {
                  logout(); 
                  navigate("/"); 
                }}
                className="flex items-center justify-center bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white py-2 px-6 rounded-full shadow-lg transition duration-200 text-lg"
              >
                <CiLogout className="w-5 h-5 mr-2" /> Logout
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white py-2 px-6 rounded-full shadow-lg transition duration-200 text-lg"
            >
              Student Login
            </motion.button>
          )}
        </div>
      </div>

      {/* Student Profile or Login Button (Desktop) */}
      <div className="hidden lg:flex lg:items-center">
        {state.student ? (
          <>
            <motion.button
              onClick={() => navigate('/profile')}
              className="flex items-center justify-center bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white py-2 px-6 rounded-full shadow-lg transition duration-200 text-lg mr-4"
            >
              <CiUser className="w-5 h-5 mr-2" /> Profile
            </motion.button>
            <motion.button
              onClick={() => {
                logout(); 
                navigate("/"); 
              }}
              className="flex items-center justify-center bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white py-2 px-6 rounded-full shadow-lg transition duration-200 text-lg"
            >
              <CiLogout className="w-5 h-5 mr-2" /> Logout
            </motion.button>
          </>
        ) : (
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white py-2 px-6 rounded-full shadow-lg transition duration-200 text-lg"
          >
            Student Login
          </motion.button>
        )}
      </div>
    </div>
  );
};
