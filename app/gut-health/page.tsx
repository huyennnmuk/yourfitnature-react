"use client";
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StickyCarousel from '../components/StickyCarousel';
import Footer from '../components/Footer';
import TwoColumnFeature from '../components/TwoColumnFeature';
import ContentWithImageSection from '../components/ContentWithImageSection';
import React from 'react';

const GutHealthPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <HeroSection 
          backgroundImage="https://cdn.sanity.io/images/rutp9o6i/production/f425bd5dd4e7c87a559ab3914a9cd8c49f98f88c-2523x2084.png?w=3840&fit=max&auto=format&h=3172&q=100" 
          title="Nourish Your Gut"
          subtitle="Discover the foundation of true well-being."
          buttonText="Explore Gut Health"
        />
        
        

        <StickyCarousel
          title="	Gut Health Articles & Insights"
          subtitle="Practical, science-backed guidance to nourish your microbiome and feel your best."
          buttonText="Explore All Articles"
          showCarousel={false}
        />
        {/* Add other sections for the gut health page here */}

        <TwoColumnFeature
          title="Unlock Your Gut's Potential"
          subtitle="Our platform provides the tools and insights you need to understand and improve your gut health."
          leftColumn={
            <div className="prose">
              <h3>Personalized Insights</h3>
              <p>Get recommendations tailored to your unique microbiome and health goals.</p>
              <h3>Track Your Progress</h3>
              <p>Monitor your symptoms and see the impact of your lifestyle changes over time.</p>
            </div>
          }
          rightColumn={
            <div className="prose">
              <h3>Expert Guidance</h3>
              <p>Access articles, workshops, and support from gut health experts.</p>
              <h3>Community Support</h3>
              <p>Connect with others on a similar journey and share your experiences.</p>
            </div>
          }
        />

        <ContentWithImageSection
          title="From insights to impact"
          description="Advancing autism care -- and beyond. We partner with state and federal organizations to shape policy and expand access to quality care. We’re analyzing public rate data, addressing provider network gaps, and tackling education discrepancies—driving structural change. Come join our movement."
          images={["/vs-1.png", "/vs-1.png", "/vs-2.png"]} // Example image array
        />
      </main>
      <Footer />
    </div>
  );
};

export default GutHealthPage;
