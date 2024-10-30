import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { courses } from '../data.js';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import CourseCard from "./CourseCard.jsx";

export const CoursesOverview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const itemsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

  const nextCourse = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + itemsToShow) % courses.length
    );
  };

  const prevCourse = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - itemsToShow + courses.length) % courses.length
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      nextCourse();
    } else if (event.key === "ArrowLeft") {
      prevCourse();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".course-overview", {
      backgroundColor: "#e0f2f1",
      duration: 0.5,
      onComplete: () => {
        tl.to(".course-overview", {
          backgroundColor: "#ffffff",
          duration: 0.5
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, [currentIndex]);

  return (
    <div className="bg-white py-12 course-overview relative">
      <h2 className="text-4xl font-bold text-center text-teal-800 mb-8">Our Courses</h2>

      <div className="flex justify-center items-center relative w-full">
        <button
          className="absolute left-4 md:left-8 bg-teal-500 text-white rounded-full p-3 hover:bg-teal-600 transition duration-200 shadow-md"
          onClick={prevCourse}
        >
          <FaArrowLeftLong />
        </button>

        <div className="flex overflow-hidden w-full max-w-5xl px-4 md:px-8">
          {courses.slice(currentIndex, currentIndex + itemsToShow).map((course) => (
            <CourseCard
              key={course.id}
              course={course} // Pass the entire course object
            />
          ))}
        </div>

        <button
          className="absolute right-4 md:right-8 bg-teal-500 text-white rounded-full p-3 hover:bg-teal-600 transition duration-200 shadow-md"
          onClick={nextCourse}
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};
