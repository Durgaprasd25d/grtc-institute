import React, { useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { gsap } from "gsap";
import logo_1 from "../assets/logo_1.png"; // Replace with your first logo
import logo_2 from "../assets/director/grtc_1.jpg"; // Replace with your second logo
import logo_3 from "../assets/director/logo3.png"; // Replace with your third logo

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

  const logos = [logo_1, logo_2, logo_3]; // Array of logos

  return (
    <header
      ref={headerRef}
      className="flex flex-col md:flex-row justify-between items-center p-6 md:p-8 h-auto md:h-24 bg-gradient-to-t from-teal-800 via-teal-600 to-teal-500 text-white shadow-xl rounded-lg font-sans"
    >
      {/* Institute Name */}
      <div className="flex items-center space-x-3 md:space-x-5 text-center md:text-left font-semibold text-xl md:text-3xl tracking-tight font-serif mb-4 md:mb-0 uppercase">
        <img
          src={logo_2}
          alt="Institute Logo"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md"
        />

        <span>GURUKRUPA RESEARCH AND TRAINING CENTER</span>
      </div>

      {/* Circular Logos */}
      <div className="flex space-x-6 md:space-x-10 mt-4 md:mt-0">
        {logos.map((logo, index) => (
          <div
            key={index}
            ref={(el) => (logoRefs.current[index] = el)}
            className="w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full shadow-lg hover:scale-110 transition-all duration-300 ease-in-out transform hover:shadow-2xl"
          >
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-5 md:space-x-7 text-2xl md:text-3xl mt-4 md:mt-0">
        {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
          <div
            key={index}
            ref={(el) => (socialIconRefs.current[index] = el)}
            className="hover:text-gray-400 transition-all duration-300 transform hover:scale-125 cursor-pointer"
          >
            <Icon />
          </div>
        ))}
      </div>
    </header>
  );
};
