import React, { useState, useRef } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Sample notices with dates and categories
const notices = [
  {
    title: "Upcoming Maintenance",
    content: "System maintenance is scheduled for Friday, 5 PM - 7 PM.",
    date: "2024-11-10",
    category: "Urgent",
  },
  {
    title: "Holiday Notice",
    content: "The institute will remain closed on 2024-12-25 for the holidays.",
    date: "2024-11-07",
    category: "General",
  },
  {
    title: "New Course Alert",
    content: "Enrollments open for the Advanced React Course starting 2024-11-15.",
    date: "2024-11-06",
    category: "Update",
  },
];

const Notice = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    const isOpening = activeIndex !== index;
    setActiveIndex(isOpening ? index : null);

    if (contentRefs.current[index]) {
      const content = contentRefs.current[index];

      gsap.to(content, {
        height: isOpening ? content.scrollHeight : 0,
        opacity: isOpening ? 1 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Navbar />
      <main className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-teal-900 to-teal-400 mb-6 tracking-tight">
          Notices
        </h2>

        <div className="space-y-4">
          {notices.map((notice, index) => (
            <motion.div
              key={index}
              initial={{ borderRadius: "8px" }}
              animate={{ borderRadius: activeIndex === index ? "12px" : "8px" }}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Accordion Header with Fixed Badge to the Left */}
              <motion.div
                onClick={() => toggleAccordion(index)}
                whileHover={{ backgroundColor: "#e6f7f7" }}
                className="cursor-pointer flex items-center justify-between p-4 text-gray-700 bg-teal-50"
              >
                {/* Icon on the Left */}
                <span className="text-teal-500 text-sm px-2 py-1 bg-teal-100 rounded-full mr-2">
                  {notice.category}
                </span>

                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold">{notice.title}</h3>
                    <p className="text-sm text-gray-500">{notice.date}</p>
                  </div>

                  {/* Icon for Accordion */}
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-teal-500 ml-2"
                  >
                    {/* Show angle up when open, angle down when closed */}
                    {activeIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                  </motion.span>
                </div>
              </motion.div>

              {/* Accordion Content with GSAP */}
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="overflow-hidden bg-gray-50 text-gray-600"
                style={{ height: activeIndex === index ? "auto" : 0 }}
              >
                <div className="p-4">{notice.content}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notice;
