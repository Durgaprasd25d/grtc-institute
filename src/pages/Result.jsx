  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { Header } from "../components/Header";
  import { Navbar } from "../components/Navbar";
  import { Footer } from "../components/Footer";
  import { gsap } from "gsap";
  import { motion } from "framer-motion";
  import jsPDF from "jspdf";
  import { useStudentContext } from "../context/StudentContext"; // Import the context

  const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    // Destructure state and logout to access student data and logout function correctly
    const { state, logout } = useStudentContext(); 
    console.log(state?.student?.registrationNo);

    useEffect(() => {
      const resultData = new URLSearchParams(location.search).get("data");
      const parsedResult = resultData
        ? JSON.parse(decodeURIComponent(resultData))
        : null;
      setResult(parsedResult);

      if (parsedResult) {
        gsap.fromTo(
          ".result-item",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.3, ease: "power3.out" }
        );
      }
    }, [location]);

    const downloadPDF = () => {
      const doc = new jsPDF();
  
      // Set PDF filename with registration number and exam name
      const registrationNo = state?.student?.registrationNo || "unknown";
      const examName = result?.examName || "exam"; // Define examName before usage
  
      doc.setFont("times", "normal");
      doc.setFontSize(16);
      doc.text("Gurukrupa Research and Training Centre", 20, 20);
      doc.setFontSize(12);
      doc.text(`Exam Name : ${examName}`, 20, 40); // Using examName here
      doc.text("Exam Results", 20, 50);
      doc.text(`Attended Questions: ${result?.attendedQuestions}`, 20, 60);
      doc.text(`Correct Answers: ${result?.correctAnswers}`, 20, 70);
      doc.text(`Total Questions: ${result?.totalQuestions}`, 20, 80);
      doc.text(`Percentage: ${result?.percentage}%`, 20, 90);
  
      const pdfFilename = `${registrationNo}_${examName}.pdf`;
      doc.save(pdfFilename);
  
      localStorage.removeItem("token"); 
      logout(); 
      navigate("/"); 
  };
  
  console.log(result)
    if (!result) {
      return <div>No result data found</div>;
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
        <div
          className="flex-grow p-8 bg-gradient-to-r from-teal-100 to-teal-50"
          id="result-content"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">
              Gurukrupa Research and Training Centre
            </h1>
            <h2 className="text-3xl font-semibold text-gray-700">Exam Results</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
              <p className="text-xl font-medium text-teal-700">
                Attended Questions:{" "}
                <span className="text-gray-800 font-semibold">
                  {result.attendedQuestions}
                </span>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
              <p className="text-xl font-medium text-teal-700">
                Correct Answers:{" "}
                <span className="text-gray-800 font-semibold">
                  {result.correctAnswers}
                </span>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
              <p className="text-xl font-medium text-teal-700">
                Total Questions:{" "}
                <span className="text-gray-800 font-semibold">
                  {result.totalQuestions}
                </span>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
              <p className="text-xl font-medium text-teal-700">
                Percentage:{" "}
                <span className="text-gray-800 font-semibold">
                  {result.percentage}%
                </span>
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={downloadPDF}
              className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white px-8 py-4 rounded-xl shadow-2xl hover:bg-teal-700 transition-all ease-in-out duration-300 transform hover:scale-105"
            >
              Download Result
            </button>
          </div>
        </div>
        <Footer />
      </motion.div>
    );
  };

  export default ResultPage;
