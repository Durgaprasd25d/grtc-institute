// src/components/Footer.jsx
import React, { useEffect } from "react";
import { gsap } from "gsap";

export const Footer = () => {
  useEffect(() => {
    // GSAP animation for the footer
    gsap.fromTo(
      ".footer-content",
      { opacity: 0, y: 20 }, // Start fully transparent and slightly down
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" } // Fade in and slide up
    );
  }, []);

  return (
    <footer className="bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 text-white p-10">
      <div className="footer-content max-w-6xl mx-auto text-center">
        <h2 className="font-bold text-3xl mb-3">GRTC Online Education & Learning</h2>
        <blockquote className="italic mb-4">
          "Wisdom is the right use of knowledge. To know is not to be wise..."
        </blockquote>
        <address className="text-sm mb-6">
          <p className="mb-1">📍 Benagaon, Kanas, Puri, 752017</p>
          <p className="mb-1">📞 Phone: <a href="tel:+919662895519" className="hover:underline">+91-9662895519</a></p>
          <p className="mb-1">📧 Email: <a href="mailto:info@gurukuledu.in" className="hover:underline">info@gurukuledu.in</a></p>
          <p className="mb-1">🕖 Office Hours: Mon-Sat 07:00 AM - 07:00 PM, Sunday Closed</p>
        </address>
        <div className="mt-8 border-t border-gray-600 pt-4">
          <p className="text-sm">© 2024 GRTC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
