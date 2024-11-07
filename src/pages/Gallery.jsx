import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaCaretLeft, FaCaretRight } from "react-icons/fa";  
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { images } from "../data";
import gsap from "gsap";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const modalRef = useRef(null);

  // Filter images based on category
  const filteredImages = selectedCategory === "All"
    ? images
    : images.filter((image) => image.category === selectedCategory);

  // Open the modal to view the full image
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      onComplete: () => setSelectedImage(null),
    });
  };

  // Navigate to next or previous image
  const navigateImage = (direction) => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex(
      (image) => image.url === selectedImage
    );
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % images.length
        : (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[nextIndex].url);
  };

  // GSAP effect when modal opens
  useEffect(() => {
    if (selectedImage) {
      gsap.fromTo(modalRef.current, {
        opacity: 0,
        scale: 0.9,
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
      });
    }
  }, [selectedImage]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Navbar />
      
      {/* Main Content Section */}
      <main className="max-w-6xl mx-auto p-8">
        {/* Gallery Title */}
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-teal-900 to-teal-400 mb-6 tracking-tight">
          Gallery
        </h2>

        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 w-auto p-2 rounded-full flex justify-center items-center mb-6 shadow-lg">
          <ul className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {["All", "Nature", "Architecture", "Portraits"].map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="text-white hover:text-teal-200 transition-all duration-300 ease-in-out transform hover:scale-105 font-semibold"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery Grid */}
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => openModal(image.url)}
            >
              <img
                src={image.url}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal for Viewing Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div ref={modalRef} className="relative bg-white p-6 rounded-lg w-96 h-96 max-w-xl mx-auto">
            <motion.img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={() => navigateImage("prev")}
                className="bg-gradient-to-r from-teal-800 to-teal-400 text-white px-4 py-2 rounded-full"
              >
                <FaCaretLeft />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={() => navigateImage("next")}
                className="bg-gradient-to-r from-teal-800 to-teal-400 text-white px-4 py-2 rounded-full"
              >
                <FaCaretRight />
              </button>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 text-2xl text-red-500"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
};

export default Gallery;
