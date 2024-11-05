import React, { useEffect, useRef } from "react";
import { Header } from "../components/Header.jsx";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { gsap } from "gsap";

// Hero Section for About Page
const HeroSection = () => {
  return (
    <section className="relative w-full h-[70vh] bg-gradient-to-r from-teal-300 to-teal-600 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Institute</h1>
        <p className="text-xl max-w-lg mx-auto">
          Empowering the next generation of IT professionals with cutting-edge skills and knowledge.
        </p>
      </div>
    </section>
  );
};

// Mission Section component
const MissionSection = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-teal-600 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Our mission is to provide comprehensive and industry-relevant IT education
          that prepares students for the ever-evolving digital landscape. We aim to foster innovation and equip students with the skills needed to excel in the tech industry.
        </p>
      </div>
    </section>
  );
};

// Team Section component for instructors and staff
const TeamSection = () => {
  const teamMembers = [
    { name: "Dr. Alice Johnson", role: "Director & Lead Instructor", img: "path/to/image1" },
    { name: "Mr. Brian Adams", role: "Head of Software Development", img: "path/to/image2" },
    { name: "Ms. Carol White", role: "Data Science Instructor", img: "path/to/image3" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-teal-600 mb-8">
          Meet Our Expert Faculty
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 shadow-lg rounded-lg text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-2xl font-bold text-teal-600">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action for prospective students
const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-300 to-teal-600 text-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">Join Us and Kickstart Your IT Career</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Enroll in our industry-recognized courses to build your expertise in software development, data science, and more. Contact us today to learn more about our programs.
        </p>
        <button className="bg-white text-teal-600 py-3 px-6 rounded-full font-bold shadow-lg hover:bg-teal-100 transition duration-300">
          Get in Touch
        </button>
      </div>
    </section>
  );
};

const About = () => {
  const verificationRef = useRef(null);

  useEffect(() => {
    // GSAP animation on load
    gsap.fromTo(
      verificationRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={verificationRef} className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-6">
        <HeroSection />
        <MissionSection />
        <TeamSection />
        <CallToAction />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
