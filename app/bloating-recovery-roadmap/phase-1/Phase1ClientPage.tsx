'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import StackedCarousel from '@/app/components/StackedCarousel';
import ContentModule from '@/app/components/ContentModule';
import DigitalTracker from '@/app/components/DigitalTracker';
import PhaseCompletionButton from '@/app/components/PhaseCompletionButton';
import DownloadTrackerButton from '@/app/components/DownloadTrackerButton';
import FAQList from '@/app/components/FAQList';
import TestimonialCards from '@/app/components/TestimonialCards';
import CoachingUpsell from '@/app/components/CoachingUpsell';
import NewsletterSignup from '@/app/components/NewsletterSignup';
import RiskReversal from '@/app/components/RiskReversal';
import { successStories } from '@/lib/testimonialsData';
import { Product } from '@/lib/getProducts';
import Footer from '@/app/components/Footer';
import BloatingQuizPopup from '@/app/components/BloatingQuizPopup';
import DigitalTrackerPopup from '@/app/components/DigitalTrackerPopup';
import StickyCarousel from '@/app/components/StickyCarousel';
import VideoPlayerSection from '@/app/components/workshop-component/VideoPlayerSection';

// Mock FAQ data as it's not provided in context
const phase1Faqs = [
  {
    question: "How long should I stay in Phase 1?",
    answer: "We recommend staying in Phase 1 for at least 7 days to gather enough data with the tracker. However, listen to your body. If you feel you need more time, that's perfectly okay."
  },
  {
    question: "What if I miss a day of tracking?",
    answer: "Don't worry! Just pick up where you left off. The goal is consistency, not perfection. The more data you have, the clearer the picture of your triggers will be."
  },
  {
    question: "I'm not feeling any better. What should I do?",
    answer: "Phase 1 is about establishing a baseline. It's normal not to see huge improvements immediately. If you're concerned, consider our one-on-one coaching for a more personalized plan."
  }
];

interface Phase1ClientPageProps {
  carouselProducts: Product[];
}

const Phase1ClientPage: React.FC<Phase1ClientPageProps> = ({ carouselProducts }) => {
  const relevantStories = successStories.filter(s => s.issueTags?.includes('Bloating') || s.issueTags?.includes('IBS'));

  const phase1Data = {
    videoUrl: '/video/roadmap/[phase1]The_Gut-Brain_Connection.mp4',
    audioUrl: '/audio/roadmap/[phase1]The_Gut-Brain_Axis__Your_Mind-Body_Superhighway_Revealed.mp4',
    audioDownloadName: 'Phase 1 Audio',
    videoChapters: [
    { "time": "00:00", "title": "Introduction: Gut Feelings Explained", "description": "Why gut instincts and butterflies are real signals of the gut-brain axis." },
    { "time": "00:40", "title": "The Gut as a Second Brain", "description": "The enteric nervous system and its 100 million neurons." },
    { "time": "01:35", "title": "Stress Impact on the Gut", "description": "How the HPA axis, cortisol, and stress damage gut balance." },
    { "time": "03:15", "title": "Gut → Brain: Serotonin & Mood", "description": "Over 90% of serotonin is made in the gut, shaping emotions." },
    { "time": "05:05", "title": "Practical Tools & Action Steps", "description": "Breathing, fiber, and mindful observation to restore balance." },
    { "time": "06:00", "title": "Closing Reflection", "description": "Your gut and brain are always in conversation—are you listening?" }
    ],
  };

  return (
    <>
      <Header />
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2071&auto=format&fit=crop"
        title="Phase 1: Foundation & Symptom Tracking"
        subtitle="Let's begin by understanding your body and identifying triggers."
        buttonText='Get Started with Phase 1'
        enhanceContrast={true}
      />
      {/* <!-- StickyCarousel Section --> */}
        <StickyCarousel
          title="Build Your Foundation"
          subtitle="Access essential tools and guidance to track your symptoms and establish your baseline."
          buttonText="Get Started"
          buttonLink="#"
          showCarousel={false}
        />
        
        {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-8">
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: FAQs */}
          <aside className="lg:col-span-3 lg:block hidden">
            <div className="sticky top-24">
              
              <h3 className="text-xl font-bold mb-2 text-center">Stay on Track</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Subscribe for more tips and support throughout your journey.
                </p>
                <NewsletterSignup source="phase-1-page" />
            </div>
            
          </aside>

          {/* Middle Column: Main Content */}
          <main className="lg:col-span-6">
            <div className="mb-8 flex items-center">
          <Link
            href="/bloating-recovery-roadmap"
            className="inline-flex items-center gap-2 text-camber-sage-primary font-semibold hover:underline hover:text-camber-sage-dark transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
            
            <section aria-labelledby="content-modules-heading">
              <h2 id="content-modules-heading" className="sr-only">
                Content Modules
              </h2>
              <VideoPlayerSection phaseData={phase1Data} />

              <ContentModule
                type="text"
                title="Understanding the Gut-Brain Axis"
                content="This first module explains the critical connection between your digestive system and your brain. Understanding how stress, mood, and your nervous system influence your gut is the foundational step to taking back control."
              />
              
              <ContentModule
                type="text"
                title="Your 7-Day Bloating Reset Tracker"
                content="Use the interactive tracker below to log your meals, symptoms, mood, and energy for the next 7 days. This is the most important step in this phase. Prefer pen and paper? Download a printable version."
              />
              <div className="text-center mt-[-1rem] mb-8">
                  <DownloadTrackerButton className="btn-secondary text-grey inline-flex items-center" />
              </div>
            </section>

            <section aria-labelledby="digital-tracker-heading" className="my-8">
              <h2 id="digital-tracker-heading" className="sr-only">
                Digital Tracker
              </h2>
              <DigitalTracker />
            </section>

            {relevantStories.length > 0 && (
              <section aria-labelledby="testimonial-heading" className="my-16">
                <TestimonialCards stories={[relevantStories[0]]} variant="carousel" title="A Story of Relief" useScroller={false}/>
              </section>
            )}


            {/*<section aria-labelledby="coaching-upsell-heading" className="my-16">
              <CoachingUpsell />
            </section>*/}

            <section className="p-8 rounded-2xl hidden lg:block">
               <FAQList faqs={phase1Faqs} title="Phase 1 FAQs" />
            </section>
            
            {/* On smaller screens, show FAQs and Newsletter at the bottom */}
            <div className="lg:hidden">
              <section aria-labelledby="faq-heading" className="my-16">
                <FAQList faqs={phase1Faqs} title="Phase 1 FAQs" />
              </section>
              <section aria-labelledby="recommended-products-heading" className="my-16">
                <h2 id="recommended-products-heading" className="typography-h2 text-grey text-pretty text-center mb-8">Recommended Products</h2>
                <StackedCarousel products={carouselProducts} size="small" maxItems={3} />
              </section>
              <section aria-labelledby="newsletter-heading" className="my-16 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-2 text-center">Stay on Track</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Subscribe for more tips and support throughout your journey.
                </p>
                <NewsletterSignup source="phase-1-page" />
              </section>
            </div>
          </main>

          {/* Right Column: Recommended Products & Newsletter */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <section aria-labelledby="recommended-products-heading" className="mb-8">
                <h2 id="recommended-products-heading" className=" typography-h2 text-grey text-pretty text-center mb-8">Recommended Products</h2>
                <StackedCarousel products={carouselProducts} size="small" maxItems={3}  />
              </section>
            </div>
          </aside>
        </div>

        
      </div>
      <PhaseCompletionButton phaseNumber={1} />

      <BloatingQuizPopup positionClassName='fixed bottom-24 right-4 z-50' />
      <DigitalTrackerPopup positionClassName='fixed bottom-44 right-4 z-50' />
      <Footer />
    </>
  );
};

export default Phase1ClientPage;
