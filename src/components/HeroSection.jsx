// src/components/HeroSection.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import img from "../assets/bgg.jpg"; // Import your image

export const HeroSection = () => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    // Animate the background image to zoom in slightly
    gsap.fromTo(
      ".bg-image",
      { scale: 1.05 }, // Start slightly zoomed in
      { scale: 1, duration: 2, ease: "power2.out", repeat: -1, yoyo: true } // Zoom out and repeat
    );

    // Animate the hero text and button
    tl.fromTo(".hero-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }).fromTo(
      ".hero-button",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1 },
      "-=0.5" // overlap with previous animation
    );
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed bg-image"
        style={{
          backgroundImage: `url(${img})`, // Use template literal for correct image path
          backgroundSize: "cover", // Ensure the image covers the entire div
          backgroundPosition: "center", // Center the background image
        }}
        // Add a class for GSAP animation
      ></div>

      {/* Optional overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative text-center p-4" // Added padding for smaller screens
      >
        <h1 className="text-5xl md:text-6xl text-white font-bold mb-4 hero-text">
          Welcome to GRTC Computer Institute
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Empowering students with cutting-edge technology and hands-on
          training. Join us to enhance your skills and prepare for a successful
          career in tech.
        </p>
        <motion.button
          className="bg-gradient-to-r from-[#115e59] via-[#0f766e] to-[#0d9488] text-white py-2 px-6 rounded  transition duration-200 hero-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </div>
  );
};
