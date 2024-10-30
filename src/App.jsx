import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; // Import Toaster
import Verification from "./pages/Verification.jsx";
import Home from "./Home.jsx";
import Courses from "./pages/Courses.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import { StudentProvider } from './context/StudentContext';
import ProfilePage from "./pages/Profile.jsx";

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} /> {/* Place Toaster here */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/courses" element={<Courses />} /> 
          <Route path="/verification" element={<Verification />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
