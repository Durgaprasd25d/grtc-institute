import React, { useEffect, useRef } from "react";
import { Header } from "./components/Header"; // Ensure the path is correct
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ImageSlider } from "./components/ImageSlider";
import { BenefitsSection } from "./components/BenefitsSection";
import { CounterSection } from "./components/CounterSection";
import { CoursesOverview } from "./components/CoursesOverview";
import { Footer } from "./components/Footer";

import { gsap } from "gsap";

function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    // GSAP animation for the whole home
    gsap.fromTo(
      homeRef.current,
      { opacity: 0, y: 50 }, // Start with transparent and shifted down
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" } // Fade in and shift to original position
    );
  }, []);

  return (
    <div ref={homeRef}>
      <Header />
      <Navbar />
      <HeroSection />
      <ImageSlider />
      <BenefitsSection />
      <CounterSection />
      <CoursesOverview />
      <Footer />
    </div>
  );
}

export default Home;
