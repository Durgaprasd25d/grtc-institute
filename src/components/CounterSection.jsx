import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export const CounterSection = () => {
  const counters = useRef([]);

  const stats = [
    { label: "Students Enrolled", endValue: 1200 },
    { label: "Courses Offered", endValue: 45 },
    { label: "Successful Graduates", endValue: 900 },
  ];

  useEffect(() => {
    // Animate each counter
    counters.current.forEach((counter, i) => {
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: stats[i].endValue,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            counter.textContent = Math.ceil(this.targets()[0].innerText);
          },
        }
      );
    });
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-around items-center py-8 sm:py-12 bg-gradient-to-r from-teal-50 via-teal-100 to-teal-200 space-y-8 sm:space-y-0">
    {stats.map((stat, index) => (
      <motion.div
        key={index}
        className="text-center px-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <div
          ref={(el) => (counters.current[index] = el)}
          className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#115e59] via-[#0f766e] to-[#0d9488] bg-clip-text text-transparent"
        >
          0
        </div>
  
        <p className="text-gray-700 font-medium text-base sm:text-lg md:text-xl">
          {stat.label}
        </p>
      </motion.div>
    ))}
  </div>
  
  );
};
