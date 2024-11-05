import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Verification from "./pages/Verification.jsx";
import Home from "./Home.jsx";
import Courses from "./pages/Courses.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Exams from "./pages/Exams.jsx";
import ExamDetail from "./pages/ExamDetail.jsx";
import { StudentProvider } from './context/StudentContext';
import ProfilePage from "./pages/Profile.jsx";

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/courses" element={<Courses />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/exams" element={<Exams />} /> 
          <Route path="/verification" element={<Verification />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/exams/:id" element={<ExamDetail />} /> 
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
