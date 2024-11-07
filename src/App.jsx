import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Verification from "./pages/Verification.jsx";
import Home from "./Home.jsx";
import Courses from "./pages/Courses.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Students from "./pages/Students.jsx";
import Exams from "./pages/Exams.jsx";
import ExamDetail from "./pages/ExamDetail.jsx";
import Result from "./pages/Result.jsx";
import Director from "./pages/Director.jsx";
import Notice from "./pages/Notice.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
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
          <Route path="/students" element={<Students />} /> 
          <Route path="/exams" element={<Exams />} /> 
          <Route path="/verification" element={<Verification />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/exams/:id" element={<ExamDetail />} /> 
          <Route path="/result/:id" element={<Result />} /> 
          <Route path="/director" element={<Director />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
