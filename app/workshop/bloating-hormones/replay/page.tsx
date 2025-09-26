'use client';
import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ReplaySelection from '@/app/components/ReplaySelection';
import SupplementStackingCalculatorPopup from '@/app/components/SupplementStackingCalculatorPopup';
import BloatingQuizPopup from '@/app/components/BloatingQuizPopup';
import StickyCarousel from '@/app/components/StickyCarousel';

const WorkshopReplayIndexPage = () => {

  const workshopNavLinks = [
    { href: "/bloating-breakthrough-blueprint/bloating-quiz", text: "Quiz" },
    { href: "/tracker", text: "Tracker" },
    { href: "/meal-plans", text: "Meal Plans" },
    { href: "/sos-toolkit", text: "SOS Toolkit" },
    { href: "/success-stories", text: "Success Stories" },
    { href: "/roadmap", text: "Roadmap" },
  ];

  const workshopPolicyLinks = [
    { href: "/about", text: "About FitNature" },
    { href: "/privacy-policy", text: "Privacy Policy" },
    { href: "/affiliate-disclosure", text: "Affiliate Disclosure" },
    { href: "/contact", text: "Contact" },
  ];

  const workshopLegalText = "Legal Disclaimer: This workshop is for educational purposes only. For diagnosis or persistent symptoms, consult a qualified health professional.";

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1533038023143-de7a62a9d779?q=80&w=1074&auto=format&fit=crop" 
          title="Workshop Replays"
          subtitle="Catch up on any workshop session you missed. All resources and recordings are available here."
          hideButton={true}
        />
        <StickyCarousel
          title="Ready to Find Your Triggers?"
          subtitle="Take our 3-minute quiz to get personalized insights and start your journey to a bloat-free life."
          buttonText="Take the Bloating Quiz"
          buttonLink="/bloating-breakthrough-blueprint/bloating-quiz"
          showCarousel={false}
        />
        <div className="container mx-auto px-4 py-16">
            <ReplaySelection />
        </div>
      </main>
      <Footer 
        navLinks={workshopNavLinks}
        policyLinks={workshopPolicyLinks}
        legalText={workshopLegalText}
      />
      <SupplementStackingCalculatorPopup positionClassName="fixed bottom-24 left-4 z-40" />
      <BloatingQuizPopup />
    </div>
  );
};

export default WorkshopReplayIndexPage;