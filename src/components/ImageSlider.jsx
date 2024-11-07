import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export const ImageSlider = () => {
  // Static array of computer-related images
  const images = [
    "https://plus.unsplash.com/premium_photo-1673329271082-365e038a1efd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1710787193365-cbc782344920?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZCUyMHNjYXBlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1637419567748-6789aec01324?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFuZCUyMHNjYXBlfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1723060544035-bdb6331a4c39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1723400242616-2969c5ea3272?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGxhbmQlMjBzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1673329273252-62bf98808be9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGxhbmQlMjBzY2FwZXxlbnwwfHwwfHx8MA%3D%3D"
  ];

  // Only one useState for currentIndex
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageSliderRef = useRef(null);

  useEffect(() => {
    if (images.length === 0) return; // Avoid errors if images are not available yet
    // GSAP Animation for sliding the images
    gsap.to(imageSliderRef.current, {
      x: -currentIndex * 100 + "%",
      duration: 0.8, // Smooth transition
      ease: "power2.out",
    });
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative flex justify-center items-center py-8 w-full max-w-7xl mx-auto">
      {/* Left arrow */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="absolute left-4 z-10 p-2 bg-gray-800 text-white rounded-full cursor-pointer"
        onClick={prevSlide}
      >
        <FaArrowLeftLong />
      </motion.div>

      {/* Slider */}
      <div className="w-full overflow-hidden">
        <div ref={imageSliderRef} className="flex transition-all duration-700 ease-in-out">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px]"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.8s ease-out",
              }}
            >
              {/* Optional overlay for text visibility */}
              <div className="bg-black bg-opacity-30 w-full h-full flex items-center justify-center">
                {/* Optional text or content */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="absolute right-4 z-10 p-2 bg-gray-800 text-white rounded-full cursor-pointer"
        onClick={nextSlide}
      >
        <FaArrowRightLong />
      </motion.div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-teal-500" : "bg-gray-300"
            }`}
            whileHover={{ scale: 1.3 }}
            onClick={() => setCurrentIndex(index)}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};
