"use client";
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import TwoColumnFeature from '../components/TwoColumnFeature';
import ContentWithImageSection from '../components/ContentWithImageSection';
import React from 'react';
import SpeechBubblesSection from '../components/SpeechBubblesSection';
import DownloadTrackerButton from '../components/DownloadTrackerButton';
import BloatingSOSToolkit from '../components/BloatingSOSToolkit';
import MealPlanTemplates from '../components/MealPlanTemplates';
import NewsletterSignup from '../components/NewsletterSignup';
import TestimonialCards from '../components/TestimonialCards';
import ReusableButton from '../components/ReusableButton';
import Link from 'next/link';
import StickyCarousel from '../components/StickyCarousel';
import BloatingQuizPopup from '../components/BloatingQuizPopup';
import SupplementStackingCalculatorPopup from '../components/SupplementStackingCalculatorPopup';
import SupplementStackingCalculator from '../components/SupplementStackingCalculator';
import Image from 'next/image';
import { successStories } from '@/lib/testimonialsData';
import WorkshopCTA from '../components/WorkshopCTA';
import FAQList from '../components/FAQList';


const BloatingBreakthroughBlueprintPage = () => {

  const blueprintFaqs = [
    {
      question: "What is the Bloating Breakthrough Blueprint?",
      answer: "It's a comprehensive collection of our best tools designed to help you identify your bloating triggers and find immediate relief. It includes the Bloating Quiz, the 7-Day Reset Tracker, the SOS Toolkit, and more."
    },
    {
      question: "Is this a one-time purchase or a subscription?",
      answer: "All the tools in the Bloating Breakthrough Blueprint are completely free. Our mission is to provide accessible, science-backed resources to help you on your wellness journey."
    },
    {
      question: "What if I don't know my bloating triggers?",
      answer: "That's exactly what the Blueprint is for! Start with the 'Bloating Trigger Detective Quiz' to get personalized insights. The 7-Day Tracker will then help you connect the dots between your diet, lifestyle, and symptoms."
    },
    {
      question: "How is this different from the Bloating Recovery Roadmap?",
      answer: "The Blueprint is your starting point for immediate relief and trigger identification. The Roadmap is a more in-depth, phased program for long-term healing and sustainable gut health. Many people start with the Blueprint and then move on to the Roadmap."
    }
  ];
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        {/* SECTION: Hero */}
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1721444343421-da31570404d9?q=80&w=1935&auto=format&fit=crop" 
          title="The Bloating Breakthrough Blueprint"
          subtitle="Your comprehensive guide to understanding, managing, and overcoming bloating for good."
          buttonText="Start Your Journey"
          enhanceContrast={true}
        />
        {/* END SECTION: Hero */}

        {/* SECTION: Quiz CTA */}
        <StickyCarousel
        title="Ready to Find Your Triggers?"
        subtitle="Take our 3-minute quiz to get personalized insights and start your journey to a bloat-free life."
        buttonText="Take the Bloating Quiz"
        buttonLink="/bloating-breakthrough-blueprint/bloating-quiz"
        showCarousel={false}
        />
        {/* END SECTION: Quiz CTA */}

        {/* SECTION: Social Proof/Bubbles */}
        <SpeechBubblesSection />
        {/* END SECTION: Social Proof/Bubbles */}
        
        {/* SECTION: 7-Day Bloating Reset Tracker */}
        <div className="py-20 px-4 bg-glass-bg">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
                <h2 className="typography-h2 text-grey text-pretty">Your 7-Day Bloating Reset Tracker</h2>
                <p className="text-base sm:text-lg text-grey max-w-2xl">Download your free PDF tracker to log your food, symptoms, and progress. It&apos;s the first step to taking back control.</p>
                <DownloadTrackerButton className="btn-secondary !bg-perplexity-primary !text-white" />
            </div>
        </div>
        {/* END SECTION: 7-Day Bloating Reset Tracker */}

        {/* SECTION: Bloating SOS Toolkit */}
        <div className="py-20 px-4">
            <BloatingSOSToolkit />
        </div>
        {/* END SECTION: Bloating SOS Toolkit */}

        {/* SECTION: Meal Plan Templates */}
        <div className="py-20 px-4">
            <MealPlanTemplates />
        </div>
        {/* END SECTION: Meal Plan Templates */}

        {/* SECTION: Newsletter Signup */}
        <div className="py-20 px-4">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
                <h2 className="typography-h2 text-grey text-pretty">Debunk Bloating Myths</h2>
                <p className="text-base sm:text-lg text-grey max-w-2xl">Join our free 5-day email course and get evidence-based solutions delivered straight to your inbox.</p>
                <NewsletterSignup source="bloating-blueprint-course" />
            </div>
        </div>
        {/* END SECTION: Newsletter Signup */}

        {/* SECTION: Supplement Stacking Calculator */}
        <SupplementStackingCalculator />
        {/* END SECTION: Supplement Stacking Calculator */}

        {/* SECTION: Testimonials */}
        <TestimonialCards stories={successStories} />
        {/* END SECTION: Testimonials */}



        {/* SECTION: Workshop CTA */}
        <WorkshopCTA />
        {/* END SECTION: Workshop CTA */}

        
        {/* END SECTION: Two Column Feature */}

        {/* SECTION: Recovery Roadmap */}
        <ContentWithImageSection
          title="Your Bloating Recovery Roadmap"
          description="Ready for long-term relief? Our roadmap provides a phased, comprehensive protocol to guide you every step of the way. From foundational habits to advanced strategies, we've got you covered."
          images={["/images/Benefits of Your Bloating Recovery Roadmap.png", "/images/How Your Bloating Recovery Roadmap.png", "/images/Quote Bloating Recovery Roadmap.png"]}
          buttonText="Start the Roadmap"
          buttonLink="/bloating-recovery-roadmap"
        />
        {/* END SECTION: Recovery Roadmap */}

        {/* SECTION: Community Challenge CTA */}
        <div className="py-20 px-4 bg-camber-background-medium">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
                <h2 className="typography-h2 text-grey text-pretty">Join the Community Challenge</h2>
                <p className="text-base sm:text-lg text-grey max-w-2xl">Join our monthly challenge for group support, daily actions, and expert guidance to keep you motivated and on track.</p>
                <ReusableButton as="a" href="/community-challenge" className="!bg-camber-sage-primary !text-white">
                    Join the Challenge
                </ReusableButton>
            </div>
        </div>
        {/* END SECTION: Community Challenge CTA */}

        <div className="py-20 px-4">
          <FAQList faqs={blueprintFaqs} title="Blueprint FAQs" />
        </div>

      </main>
      <Footer />
      <BloatingQuizPopup />
      <SupplementStackingCalculatorPopup positionClassName="fixed bottom-4 left-4 z-40" />
    </div>
  );
};

export default BloatingBreakthroughBlueprintPage;