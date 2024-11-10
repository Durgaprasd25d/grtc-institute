import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useStudentContext } from "../context/StudentContext";
import Loader from "../components/Loader";
import { GoPencil } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { jwtDecode } from 'jwt-decode';

const Exams = () => {
  const navigate = useNavigate();
  const { state } = useStudentContext();
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const token = state.token;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        navigate("/login");
        return;
      }
    }

    if (!state.loading && !state.student) {
      navigate("/login");
    } else if (state.student) {
      fetchExams();
    }
  }, [state.student, state.loading, navigate]);

  const fetchExams = async () => {
    try {
      const response = await fetch(
        "https://grtc-new-node-backend.onrender.com/api/exam/student",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const examData = await response.json();
      setExams(examData);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".exam-list-item",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, [loading]);

  const isExamAttended = (examId) => {
    if (state.student.completedExams && Array.isArray(state.student.completedExams)) {
      return state.student.completedExams.some((exam) => exam.exam.toString() === examId);
    }
    return false;
  };

  if (loading) return <Loader />;

  if (!state.student) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 text-gray-700">
        <Header />
        <Navbar />
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold">You are not logged in</h2>
          <p className="mt-4">Please log in to view the exams.</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Go to Login
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-gray-50"
    >
      <Header />
      <Navbar />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          type: "spring",
          stiffness: 120,
        }}
        className="flex items-center p-8 bg-gray-50 space-x-4"
      >
        {state.student.avatar ? (
          <img
            src={state.student.avatar}
            alt={`${state.student.name}'s Avatar`}
            className="w-10 h-10 rounded-full border-2 border-teal-400"
          />
        ) : (
          <div className="w-10 h-10 rounded-full border-2 border-teal-400 bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {state.student.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </motion.div>

      <div className="flex-grow p-8 bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Assigned Exams
        </h2>
        {exams.length > 0 ? (
          <div className="overflow-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="border-b bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white">
                  <th className="py-3 px-6 text-left font-semibold">
                    Exam Name
                  </th>
                  <th className="py-3 px-6 text-left font-semibold">
                    Description
                  </th>
                  <th className="py-3 px-6 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr
                    key={exam._id}
                    className="exam-list-item border-b hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-gray-800">{exam.title}</td>
                    <td className="py-3 px-6 text-gray-600">
                      {exam.description}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {isExamAttended(exam._id) ? (
                        <span className="text-gray-500 flex items-center justify-center">
                          <FaCheckCircle className="mr-1 text-teal-600" /> Already attempted
                        </span>
                      ) : (
                        <button
                          onClick={() => navigate(`/exams/${exam._id}`)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          <GoPencil size={20} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">
            No exams available at the moment.
          </p>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Exams;
