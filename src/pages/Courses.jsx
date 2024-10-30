import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination.jsx';
import Filter from '../components/Filter.jsx';
import { gsap } from 'gsap';
import { courses } from '../data'; // Assuming you have a data.js file for courses

const ITEMS_PER_PAGE = 6;

const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ category: '', search: '' });
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const containerRef = useRef(null);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesCategory = filters.category ? course.category === filters.category : true;
      const matchesSearch = course.name.toLowerCase().includes(filters.search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredCourses(filtered);
  }, [filters]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-6">
        <h2 className="text-4xl font-bold text-center text-teal-700 mb-8">Our Courses</h2>
        <Filter filters={filters} setFilters={setFilters} />
        <div ref={containerRef} className="flex flex-wrap justify-center">
          {currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
