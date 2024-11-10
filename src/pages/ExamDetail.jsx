import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdAlarm } from "react-icons/md";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Loader from "../components/Loader";
import axios from "axios";
import { useStudentContext } from "../context/StudentContext";
import toast from "react-hot-toast";

const ExamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useStudentContext();

  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3540); // 59 minutes in seconds
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  useEffect(() => {
    if (!state.student) {
      navigate("/login");
    } else {
      fetchExamDetails();
    }
  }, [state.student, navigate]);

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(
        `https://grtc-new-node-backend.onrender.com/api/exam/${id}/studentId`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      );
      setExam(response.data);
    } catch (error) {
      console.error("Error fetching exam details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (examStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setTimeLeft(3540); // Reset timer to 59 minutes
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const payload = {
      answers: Object.keys(answers).map((questionId) => ({
        questionId,
        answer: answers[questionId],
      })),
    };

    try {
      const response = await axios.post(
        `https://grtc-new-node-backend.onrender.com/api/exam/${id}/attend`,
        payload,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      // Assuming response contains the result data with attendedQuestions, correctAnswers, etc.
      const resultData = {
        examName:exam.title,
        attendedQuestions: response.data.attendedQuestions,
        correctAnswers: response.data.correctAnswers,
        totalQuestions: response.data.totalQuestions,
        percentage:
          (response.data.correctAnswers / response.data.totalQuestions) * 100,
      };

      // Show success message
      toast.success("Exam submitted successfully!");
      // Navigate to the result page and pass the result data as a query parameter
      navigate(
        `/result/${id}?data=${encodeURIComponent(JSON.stringify(resultData))}`
      );
    } catch (error) {
      const errorMsg =
        error.response?.data?.errors?.[0]?.msg || "An unknown error occurred";
      toast.error(errorMsg); // Show the dynamic error message
    } finally {
      setSubmitted(false); // Reset submitted state after processing
    }
  };

  if (loading) return <Loader />;
  if (!exam) return <div>No exam details available.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Navbar />

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 relative">
          {!examStarted ? (
            <>
              <h1 className="text-3xl font-bold text-teal-600">{exam.title}</h1>
              <p className="mb-6 text-gray-700">
                Instructions: Please ensure you are ready to start the exam.
                Once you click "Start Test", the timer will begin, and you will
                be unable to leave this page or perform any actions that could
                lead to cheating.
              </p>
              <button
                onClick={handleStartExam}
                className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
              >
                Start Test
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-teal-600">
                  {exam.title}
                </h1>
                <div className="flex items-center space-x-2 text-gray-700">
                  <MdAlarm className="text-xl" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>
              <p className="mb-6 text-gray-700">{exam.description}</p>

              {exam.questions.map((question) => (
                <div
                  key={question._id}
                  className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                >
                  <h3 className="text-lg font-medium mb-2">
                    {question.questionText}
                  </h3>
                  {question.options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center mb-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option}
                        checked={answers[question._id] === option}
                        onChange={() =>
                          handleAnswerChange(question._id, option)
                        }
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className={`mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300 ${
                  submitted ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={submitted}
              >
                {submitted ? "Submitting..." : "Submit Exam"}
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExamDetails;
