'use client';
import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import TestimonialCards from '@/app/components/TestimonialCards';
import { successStories } from '@/lib/testimonialsData';
import HeroSection from '@/app/components/HeroSection';
import StickyCarousel from '@/app/components/StickyCarousel';
import SupplementStackingCalculatorPopup from '@/app/components/SupplementStackingCalculatorPopup';

const SuccessStoriesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1723078442656-67cd4dad8b78?q=80&w=1170&auto=format&fit=crop" 
          title="Bloating Success Stories"
          subtitle="Real stories from people who have found relief from bloating and other digestive issues."
          buttonText="Discover Our Story"
          enhanceContrast={true}
        />

        {/* SECTION: Quiz CTA */}
        <StickyCarousel
        title="Ready to Find Your Triggers?"
        subtitle="Take our 3-minute quiz to get personalized insights and start your journey to a bloat-free life."
        buttonText="Take the Bloating Quiz"
        buttonLink="/bloating-breakthrough-blueprint/bloating-quiz"
        showCarousel={false}
        />
        {/* END SECTION: Quiz CTA */}
        <div className="container mx-auto px-4 py-12">
            <TestimonialCards stories={successStories} variant="grid" useScroller={false} />
        </div>
      </main>
      <Footer />
      <SupplementStackingCalculatorPopup positionClassName="fixed bottom-24 left-4 z-40" />
    </div>
  );
};

export default SuccessStoriesPage;
