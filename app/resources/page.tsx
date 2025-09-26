import ResourcesPage from "@/app/components/ResourcesPage";
import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

const Resources = () => {
  return (
    <div className="min-h-screen fitnature-section-bg">
      <main id="main">
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Your Journey to a Bloat-Free Life"
          subtitle="Discover the best resources to help you on your journey."
        />
        <Header />
        <ResourcesPage />
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
