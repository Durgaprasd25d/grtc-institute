import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useStudentContext } from "../context/StudentContext";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { state } = useStudentContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.loading && !state.student) {
      navigate("/login");
    } else if (!state.loading && state.student) {
      setLoading(false);
    }

    gsap.fromTo(
      ".profile-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, [state.student, state.loading, navigate]);

  const student = state.student;

  if (loading) return <Loader />;

  if (!student) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 p-8 bg-gray-50 flex-grow profile-container">
        
        {/* Left Panel - Student Information */}
        <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Information</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Registration No:</strong> {student.registrationNo}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Date of Admission:</strong> {new Date(student.dateOfAdmission).toLocaleDateString()}</p>
            <p><strong>Course Duration:</strong> {student.courseduration}</p>
            <p><strong>Date of Birth:</strong> {new Date(student.dob).toLocaleDateString()}</p>
            <p><strong>Mother's Name:</strong> {student.motherName}</p>
            <p><strong>Father's Name:</strong> {student.fatherName}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Grade:</strong> {student.grade}</p>
          </div>
        </div>

        {/* Right Panel - Profile Image, Assigned Exams, and Completed Exams */}
        <div className="md:w-1/2 flex flex-col gap-6">
          
          {/* Profile Image */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <img src={student.qrCode} alt="Profile" className="w-32 h-32 rounded-full border-4 border-gray-300" />
          </div>

          {/* Assigned Exams */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Exams</h2>
            <p><strong>Number of Assigned Exams:</strong> {student.hasAssignedExams.length}</p>
            {student.hasAssignedExams.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {student.hasAssignedExams.map((exam, index) => (
                  <li key={index} className="text-gray-600 pl-2 border-l-4 border-blue-500">
                    Exam ID: {exam}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No assigned exams.</p>
            )}
          </div>

          {/* Completed Exams */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex-grow overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Completed Exams</h2>
            {student.completedExams.length > 0 ? (
              <div className="max-h-64 overflow-y-auto">
                <ul className="space-y-4">
                  {student.completedExams.map((exam, index) => (
                    <li key={index} className="text-gray-600 bg-gray-100 p-4 rounded-lg shadow-sm">
                      <p><strong>Exam ID:</strong> {exam.exam}</p>
                      <p><strong>Questions Attended:</strong> {exam.attendedQuestions}</p>
                      <p><strong>Correct Answers:</strong> {exam.correctAnswers}</p>
                      <p><strong>Total Questions:</strong> {exam.totalQuestions}</p>
                      <p><strong>Score:</strong> {exam.percentge}%</p>
                      <hr className="my-2" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600 mt-2">No completed exams.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
