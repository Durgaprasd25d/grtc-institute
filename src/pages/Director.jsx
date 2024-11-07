import React from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import director from "../assets/director/director.jpg";

const Director = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <Header />
      <Navbar />
      <main className="flex flex-col md:flex-row items-center justify-center py-10 px-6 space-y-10 md:space-y-0 md:space-x-10">
        {/* Enhanced Director's Photo with shadow, border, and animation */}
        <div className="relative group w-80 h-80 md:w-96 md:h-96 overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105">
          <img
            src={director}
            alt="Director"
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"></div>
        </div>

        {/* Director's Message with modern styling */}
        <div className="max-w-lg p-8 bg-white/90 shadow-lg rounded-2xl text-center md:text-left transform transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-900 to-teal-600 mb-4 tracking-tight">
            Director's Message
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed font-light">
            Welcome to{" "}
            <span className="text-gray-800 font-semibold">
              Gurukrupa Research and Training Center
            </span>
            , a premier computer institute dedicated to fostering technical
            excellence and professional growth. Our mission is to empower
            students with cutting-edge skills in computer science and
            technology, preparing them for successful careers in the digital
            era. Join us to explore, learn, and innovate in an environment built
            for your success.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Director;
