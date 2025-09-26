"use client";
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import React from 'react';

const WellnessTipsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <HeroSection 
          backgroundImage="https://cdn.sanity.io/images/rutp9o6i/production/6f324ad200e683180df792086f2d1c17d1c41f53-2560x2000.webp?w=3840&fit=max&auto=format&h=3000&q=100"
          title="Daily Wellness Tips"
          subtitle="Small changes for a healthier, happier you."
          buttonText="Get Inspired"
        />
        {/* Add other sections for the wellness tips page here */}
      </main>
      <Footer />
    </div>
  );
};

export default WellnessTipsPage;
