// src/components/CourseCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  return (
    <motion.div
      className="course-card max-w-sm rounded-lg overflow-hidden shadow-lg m-4 w-full md:w-1/2 lg:w-1/3 border transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-6 py-4 flex-grow">
        <h3 className="font-bold text-xl text-teal-800 mb-2">{course.name}</h3>
        <p className="text-gray-700 text-base mb-4">{course.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex flex-wrap">
        <span className="inline-block bg-teal-200 rounded-full px-3 py-1 text-sm font-semibold text-teal-800 mr-2 mb-2">
          {course.tutor}
        </span>
        <span className="inline-block bg-teal-200 rounded-full px-3 py-1 text-sm font-semibold text-teal-800 mr-2 mb-2">
          {course.price}
        </span>
      </div>
      <div className="px-6 pb-4">
        <button className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-200 shadow">
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
