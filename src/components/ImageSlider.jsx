import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong, FaSpinner } from "react-icons/fa6";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export const ImageSlider = () => {
  const [images, setImages] = useState([]); // Holds the images fetched from the API
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loader state to track fetching images
  const imageSliderRef = useRef(null);

  // Fetch images from the API (e.g., images with category "banner")
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://grtc-new-node-backend.onrender.com/api/get-images?category=banner"); // API URL for fetching images based on category
        const data = await response.json();
        if (data && data.images) {
          setImages(data.images); // Assume the API returns an array of images
          setLoading(false); // Set loading to false when images are fetched
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false); // In case of an error, set loading to false
      }
    };

    fetchImages();
  }, []); // Empty dependency array to fetch images only on component mount

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
      {/* Loader (spinner) while images are loading */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center z-20">
          <FaSpinner className="animate-spin text-teal-500 text-4xl" />
        </div>
      )}

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
                backgroundImage: `url(${image.url})`, // Assuming the image object contains a 'url' field
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
