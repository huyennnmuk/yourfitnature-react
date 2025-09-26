'use client';
import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import TestimonialCards from '@/app/components/TestimonialCards';
import { workshopTestimonials } from '@/lib/workshopTestimonialsData';
import HeroSection from '@/app/components/HeroSection';
import StickyCarousel from '@/app/components/StickyCarousel';
import SupplementStackingCalculatorPopup from '@/app/components/SupplementStackingCalculatorPopup';
import BloatingQuizPopup from '@/app/components/BloatingQuizPopup';

const WorkshopSuccessStoriesPage = () => {
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
          backgroundImage="https://images.unsplash.com/photo-1620503292890-c597f62cce8d?fm=jpg&q=60&w=3000"
          title="Workshop Success Stories"
          subtitle="Real stories from women who have found hormonal balance and relief from cyclical bloating."
          hideButton={true}
        />

        <StickyCarousel
          title="Ready to Beat Bloat & Balance Your Hormones?"
          subtitle="Join our free workshop to get cycle-synced relief without cameras, judgment, or generic advice."
          buttonText="Register for the Free Workshop"
          buttonLink="/workshop/bloating-hormones"
          showCarousel={false}
        />

        <div className="container mx-auto px-4 py-12">
            <TestimonialCards
                stories={workshopTestimonials}
                variant="grid"
                useScroller={false}
                title="Workshop Attendee Stories"
                basePath="/workshop/bloating-hormones/success-stories"
                ctaLink=""
            />
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

export default WorkshopSuccessStoriesPage;