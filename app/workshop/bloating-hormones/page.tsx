"use client";
import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TestimonialCards from '@/app/components/TestimonialCards';
import { workshopTestimonials } from '@/lib/workshopTestimonialsData';
import FAQList from '@/app/components/FAQList';
import TrustBar from '@/app/components/TrustBar';
import ValueProposition from '@/app/components/ValueProposition';
import HowItWorks from '@/app/components/HowItWorks';
import SessionSelection from '@/app/components/SessionSelection';
import RiskReversal from '@/app/components/RiskReversal';
import { workshopFaqs } from '@/lib/faqData';
import SupplementStackingCalculatorPopup from '@/app/components/SupplementStackingCalculatorPopup';
import BloatingQuizPopup from '@/app/components/BloatingQuizPopup';




const WorkshopLandingPage = () => {
  

  const workshopLegalText = "Legal Disclaimer: This workshop is for educational purposes only. For diagnosis or persistent symptoms, consult a qualified health professional.";

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1620503292890-c597f62cce8d?fm=jpg&q=60&w=3000"
          title="Beat Bloat, Respect Your Cycle"
          subtitle="Free, Faceless Workshop for Real Women. Get cycle-synced relief without cameras, judgment, or generic advice."
          hideButton={false}
          buttonText="Register Free"
        />
        
        {/* Trust Bar */}
        <TrustBar />

        <div className="container mx-auto max-w-5xl px-4 space-y-20 md:space-y-28 py-16 md:py-24">
          {/* Value Proposition Section */}
          <ValueProposition />

          {/* How It Works Section */}
          <HowItWorks />

          {/* Session Selection Grid */}
          <SessionSelection />

          {/* Risk Reversal/Guarantee Section */}
          <RiskReversal />
        </div>

        {/* Testimonials */}
        <div className="py-16 md:py-24">
          <TestimonialCards 
            stories={workshopTestimonials} 
            title="What Past Attendees Are Saying"
            basePath="/workshop/bloating-hormones/success-stories"
            ctaLink="/workshop/bloating-hormones/success-stories"
          />
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto max-w-5xl px-4 pb-16 md:pb-24">
            <FAQList faqs={workshopFaqs} />
        </div>
      </main>
      <Footer 
        legalText={workshopLegalText}
      />
      <SupplementStackingCalculatorPopup positionClassName="fixed bottom-24 left-4 z-40" />
      <BloatingQuizPopup />
    </div>
  );
};

export default WorkshopLandingPage;