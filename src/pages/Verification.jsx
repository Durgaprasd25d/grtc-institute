import React, { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header.jsx";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { gsap } from "gsap";
import imgs from "../assets/certi.avif"; // Certificate image
import img from "../assets/user.webp"; // Profile image
import { toast } from "react-hot-toast";

const Verification = () => {
  const verificationRef = useRef(null);
  const [isVerified, setIsVerified] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registrationNo, setRegistrationNo] = useState(''); // State for registration number input
  const containerRef = useRef(null);
  const certificateRef = useRef(null); // Ref for the certificate image

  useEffect(() => {
    gsap.fromTo(
      verificationRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const handleVerify = async () => {
    if (!registrationNo.trim()) {
      toast.error("Please enter a valid registration number");
      return;
    }

    try {
      setLoading(true);
      setStudentInfo(null); // Clear previous student info
      const response = await fetch(
        `https://grtcindia.in/grtc-server/api/studentReg/${registrationNo}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const studentData = await response.json();

      if (studentData.data) {
        setStudentInfo(studentData.data);
        setIsVerified(true);
        toast.success("Verification successful!");

        // Perform animations here
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
        );

        gsap.fromTo(
          certificateRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
        );
      } else {
        toast.error("No student available with this registration number");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleVerify(); // Call handleVerify when Enter key is pressed
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleVerify(); // Call the verify function
  };

  return (
    <div ref={verificationRef} className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-6">
        {!isVerified ? (
          <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg border border-gray-200 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">Verification</h2>
            <p className="text-gray-500 text-center mb-4">Please enter your Registration No below:</p>
            <form onSubmit={handleSubmit}> {/* Wrap input in a form for handling submission */}
              <input
                type="text"
                placeholder="Enter Registration No"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)} // Update registration number state
                onKeyPress={handleKeyPress}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-teal-400 focus:outline-none transition duration-200 shadow-md"
              />
              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className={`mt-4 w-full py-2 font-semibold text-white rounded-lg transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-br from-teal-400 to-teal-800 hover:bg-teal-800'}`}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>
            {loading && <p className="text-center text-teal-600">Loading...</p>}
          </div>
        ) : (
          <div
            ref={containerRef}
            className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-lg border border-gray-200 p-6 space-y-6 md:space-y-0 md:space-x-6 transition-transform transform hover:scale-105"
          >
            {/* Student Information Container */}
            <div className="flex-1 pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex flex-col space-y-3 text-gray-600">
                <p>
                  Name:{" "}
                  <span className="font-semibold text-teal-600">{studentInfo.name}</span>
                </p>
                <p>
                  Registration No:{" "}
                  <span className="font-semibold text-teal-600">{studentInfo.registrationNo}</span>
                </p>
                <p>
                  Course:{" "}
                  <span className="font-semibold text-teal-600">{studentInfo.course}</span>
                </p>
                <p>
                  Date of Admission:{" "}
                  <span className="font-semibold text-teal-600">{new Date(studentInfo.dateOfAdmission).toLocaleDateString()}</span>
                </p>
                <p>
                  Father's Name:{" "}
                  <span className="font-semibold text-teal-600">{studentInfo.fatherName}</span>
                </p>
                <p>
                  Mother's Name:{" "}
                  <span className="font-semibold text-teal-600">{studentInfo.motherName}</span>
                </p>
                <p>
                  Address:{" "}
                  <span className="font-semibold text-teal-600">{studentInfo.address}</span>
                </p>
              </div>
            </div>
            {/* Profile Picture Container */}
            <div className="flex-none flex flex-col items-center justify-center p-4">
              <img
                src={studentInfo.profilePic || img}
                alt="Profile"
                className={`w-36 h-36 rounded-full border-4 border-teal-600 shadow-lg ${!studentInfo.profilePic ? "blur-md" : ""}`}
              />
              <p className="text-xl font-semibold mt-3 text-center text-gray-700">{studentInfo.name}</p>
            </div>
          </div>
        )}
      </div>
      {isVerified && studentInfo && (
        <div className="mt-6 mb-2 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-2xl border border-gray-200">
          <h2 className="text-xl font-bold text-center text-teal-700 mb-4">Certificate</h2>
          <div className="flex justify-center">
            {studentInfo.certificatepic ? (
              <img
                ref={certificateRef} // Ref for the certificate image
                src={studentInfo.certificatepic}
                alt="Certificate"
                className="w-96 h-auto max-h-80 pb-5 object-contain rounded-lg shadow-lg" // Set width to 96 (24rem) and height to auto
              />
            ) : (
              <div className="flex items-center justify-center">
              <img
                src={imgs}
                alt="Default Certificate"
                className="w-96 h-auto rounded-lg shadow-lg blur-md" // Set width to 96 (24rem) and height to auto
              />
            </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Verification;
