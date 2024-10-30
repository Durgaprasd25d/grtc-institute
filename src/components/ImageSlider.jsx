import React, { useRef, useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import image1 from "../assets/img1.JPG";
import image2 from "../assets/img2.JPG";
import image3 from "../assets/img3.JPG";
import image4 from "../assets/img4.JPG";
import image5 from "../assets/img5.JPG";
import image6 from "../assets/img6.JPG";

export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageSliderRef = useRef(null);

  const images = [image1, image2, image3, image4, image5, image6]; // Replace these with your actual image paths

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Animation for sliding the images
      gsap.to(imageSliderRef.current, {
        x: -currentIndex * 100 + "%",
        duration: 1,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex justify-center items-center py-8 w-full max-w-7xl mx-auto">
      {" "}
      {/* Increased max width */}
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
        <div
          ref={imageSliderRef}
          className="flex transition-all duration-700 ease-in-out"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px]" // Increased heights
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Optional overlay for text visibility */}
              <div className="bg-black bg-opacity-30 w-full h-full flex items-center justify-center">
                {/* You can add text here if needed */}
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
