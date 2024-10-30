import React, { useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { gsap } from "gsap";
import logo_1 from "../assets/logo_1.png"; // Import your image

export const Header = () => {
  const headerRef = useRef(null);
  const logoRefs = useRef([]);
  const socialIconRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    // Animate header elements
    tl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 }
    )
      // Staggered animation for logos
      .fromTo(
        logoRefs.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2 },
        "-=1"
      )
      // Staggered animation for social icons
      .fromTo(
        socialIconRefs.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2 },
        "-=0.8"
      );
  }, []);

  return (
    <header
      ref={headerRef}
      className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 h-auto md:h-24 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white shadow-lg font-poppins"
    >
      {/* Institute Name */}
      <div className="text-center md:text-left font-bold text-xl md:text-3xl tracking-wide font-serif">
        GURUKRUPA RESEARCH AND TRAINING CENTER
      </div>

      {/* Circular Images */}
      <div className="flex space-x-4 mt-4 md:mt-0">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (logoRefs.current[index] = el)}
            className="w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full shadow-md hover:shadow-xl transition-transform transform hover:scale-110"
          >
            <img
              src={logo_1}
              alt={`Logo ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-3 md:space-x-5 text-2xl md:text-3xl mt-4 md:mt-0">
        {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
          <Icon
            key={index}
            ref={(el) => (socialIconRefs.current[index] = el)}
            className="hover:text-gray-300 transition duration-300 transform hover:scale-110 cursor-pointer"
          />
        ))}
      </div>
    </header>
  );
};
