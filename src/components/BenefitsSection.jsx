import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import benefitImage from '../assets/about.webp';

export const BenefitsSection = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // GSAP animations for the image and text
    gsap.fromTo(
      imageRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );

    gsap.fromTo(
      textRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 sm:py-12 sm:px-6">
      {/* Wrapper for Image and Text */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Image */}
        <div
          ref={imageRef}
          className="flex justify-center items-center w-full md:w-1/2 mb-6 md:mb-0"
        >
          <img
            src={benefitImage}
            alt="Computer Education"
            className="w-64 sm:w-80 md:w-96 h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>

        {/* Right Side: Benefits Text */}
        <motion.div
          ref={textRef}
          className="flex flex-col justify-center items-start w-full md:w-1/2 md:ml-4 mt-4 md:mt-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-teal-600">
            Why Choose Us
          </h2>
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold">Comprehensive Programs</h3>
              <p className="text-gray-700">
                We offer a wide range of computer education programs tailored to meet your needs.
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold">Experienced Instructors</h3>
              <p className="text-gray-700">
                Our team consists of experienced instructors dedicated to providing the best learning experience.
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold">Career Support</h3>
              <p className="text-gray-700">
                We provide extensive career support and guidance to help you achieve your professional goals.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
