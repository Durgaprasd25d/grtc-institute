import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        const data = await response.json();
        setStudents(data.results);
        setLoading(false);
      } catch (error) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Loading or error states
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Header />
      <Navbar />
      <main className="container mx-auto py-10">
        <h2 className="text-4xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-teal-900 to-teal-400">Student Profiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {students.map((student, index) => (
            <div
              key={index}
              className="student-card p-6 bg-white shadow-lg rounded-lg flex flex-col items-center"
            >
              <div className="text-center">
                <img
                  src={student.picture.large}
                  alt={`${student.name.first} ${student.name.last}`}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">
                  {student.name.title} {student.name.first} {student.name.last}
                </h3>
                <p className="text-gray-500">
                  {student.gender === "female" ? "Female" : "Male"}
                </p>
                <p className="mt-2 text-sm text-gray-600">{student.email}</p>
                <p className="text-gray-500 mt-1">
                  {student.location.city}, {student.location.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentPage;
