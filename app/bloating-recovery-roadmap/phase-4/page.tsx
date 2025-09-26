'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import StackedCarousel from '@/app/components/StackedCarousel';
import ContentModule from '@/app/components/ContentModule';
import PhaseCompletionButton from '@/app/components/PhaseCompletionButton';
import FAQList from '@/app/components/FAQList';
import NewsletterSignup from '@/app/components/NewsletterSignup';
import { getProductsForPhase } from '@/lib/OneCentralAffiliateDatabase';
import { Product } from '@/lib/getProducts';
import Footer from '@/app/components/Footer';
import DigitalTrackerPopup from '@/app/components/DigitalTrackerPopup';
import CoachingUpsell from '@/app/components/CoachingUpsell';
import StickyCarousel from '@/app/components/StickyCarousel';
import SupplementStackingCalculatorPopup from '@/app/components/SupplementStackingCalculatorPopup';
import VideoPlayerSection from '@/app/components/workshop-component/VideoPlayerSection';

const phase4Faqs = [
  {
    question: "I don't have time to meditate. What else can I do?",
    answer: "Stress management isn't just about meditation. It can be deep breathing for 2 minutes, a short walk, listening to calming music, or even just stepping away from your screen. Find what works for you."
  },
  {
    question: "How does stress actually cause bloating?",
    answer: "Stress activates your 'fight or flight' response, diverting blood flow away from your digestive system. This can slow down digestion, leading to gas and bloating. It also increases gut permeability ('leaky gut')."
  },
  {
    question: "I sleep 8 hours but still feel tired. Why?",
    answer: "Sleep quality is as important as quantity. Things like blue light exposure before bed, an inconsistent sleep schedule, or stress can disrupt your sleep cycles. Our content module on sleep has tips to improve quality."
  }
];

const Phase4Page = () => {
  const phase4Data = {
    videoUrl: '/video/roadmap/[phase4]The_Gut-Brain_Connection.mp4',
    audioUrl: '/audio/roadmap/[phase4]Unlock_Your_Gut__The_Hidden_Connections_Between_Sleep,_Stress,_.mp4',
    audioDownloadName: 'Phase 4 Audio',
    videoChapters: [
    { "time": "00:00", "title": "Introduction: Gut Signals Are Real", "description": "Gut feelings and butterflies as biological communication." },
    { "time": "00:40", "title": "The Gut as a Second Brain", "description": "Enteric nervous system with more neurons than the spinal cord." },
    { "time": "02:40", "title": "Stress on the Attack", "description": "HPA axis, cortisol, leaky gut, and microbial imbalance." },
    { "time": "03:40", "title": "Gut → Brain: Serotonin & Mood", "description": "90% of serotonin made in the gut, affecting anxiety and depression." },
    { "time": "05:40", "title": "Harnessing the Connection", "description": "Tools like breathing, fiber, and awareness of gut-mind patterns." },
    { "time": "06:00", "title": "Closing Reflection", "description": "Your gut and brain are locked in conversation—listen to it daily." }
  ],
  };
  const [carouselProducts, setCarouselProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getProductsForPhase(4).then(products => {
      const mappedProducts: Product[] = products.map(p => ({
        id: p.id,
        name: p.name,
        permalink: p.url ?? '',
        slug: (p.url ?? '').split('/').pop() || '',
        description: p.description ?? '',
        price: p.price !== undefined ? String(p.price) : '',
        images: p.imageUrl ? [{ src: p.imageUrl, alt: p.name }] : [],
        benefits: [],
        certifications: [],
        technicalDetails: [],
        brand: p.brand ?? '',
        rationale: p.rationale ?? '',
        affiliateLink: p.url ?? '',
        relatedProducts: p.relatedProducts ?? [],
      }));
      setCarouselProducts(mappedProducts);
    });
  }, []);

  return (
    <>
      {/* <!-- Header --> */}
      <Header />

      {/* <!-- Hero Section --> */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1704561682534-7ce740495d19?fm=jpg&q=60&w=3000&fit=crop"
        title="Phase 4: Lifestyle & Stress Management"
        subtitle="Address the hidden drivers of bloating: stress, sleep, and movement."
       buttonText='Start Phase 4'
        enhanceContrast={true}
      />

      {/* <!-- Sticky Carousel Section --> */}
        <StickyCarousel
          title="Empower Your Wellness Journey"
          subtitle="Discover tools and personalized strategies to balance stress, improve sleep, and elevate your lifestyle."
          buttonText="Get Started"
          buttonLink="#"
          showCarousel={false}
        />  

        {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* <!-- Left Sidebar --> */}
          <aside className="lg:col-span-3 lg:block hidden">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-2 text-center">Master Your Lifestyle, Master Your Gut Health</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Join our newsletter for tips on managing stress, improving sleep, and incorporating movement for a healthier gut.
                </p>
                <NewsletterSignup source="phase-4-page" />
            </div>
          </aside>

          {/* <!-- Middle Content --> */}
          <main className="lg:col-span-6">
            {/* <!-- Back to Dashboard Link --> */}
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
            

            {/* <!-- Content Modules Section --> */}
            <section aria-labelledby="content-modules-heading">
              <h2 id="content-modules-heading" className="sr-only">
                Content Modules
              </h2>
              
              <VideoPlayerSection phaseData={phase4Data} />

              <ContentModule
                type="text"
                title="The Importance of Sleep for Digestion"
                content="Discover how sleep quality impacts your gut health and what you can do to improve it."
              />
              
              {/* <!-- Coaching Upsell --> */}
              <div className="my-12">
                <CoachingUpsell />
              </div>
            </section>
            
            {/* <!-- Desktop FAQ Section --> */}
            <section className="p-8 rounded-2xl hidden lg:block">
               <FAQList faqs={phase4Faqs} title="Phase 4 FAQs" />
            </section>
            
            {/* <!-- Mobile Only Sections --> */}
            <div className="lg:hidden">
              {/* <!-- Mobile FAQ Section --> */}
              <section aria-labelledby="faq-heading" className="my-16">
                <FAQList faqs={phase4Faqs} title="Phase 4 FAQs" />
              </section>
              {/* <!-- Mobile Recommended Products Section --> */}
                <StackedCarousel products={carouselProducts} size="small" maxItems={3} displayPrice={true} />
              {/* <!-- Mobile Newsletter Section --> */}
              <section aria-labelledby="newsletter-heading" className="my-16 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-2 text-center">Master Your Lifestyle, Master Your Gut Health</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Join our newsletter for tips on managing stress, improving sleep, and incorporating movement for a healthier gut.
                </p>
                <NewsletterSignup source="phase-4-page" />
              </section>
            </div>
          </main>

          {/* <!-- Right Sidebar --> */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <section aria-labelledby="recommended-products-heading" className="mb-8">
                <h2 id="recommended-products-heading" className=" typography-h2 text-grey text-pretty text-center mb-8">Recommended Products</h2>
                <StackedCarousel products={carouselProducts} size="small" maxItems={3} displayPrice={true} />
              </section>
            </div>
          </aside>
        </div>
      </div>

      {/* <!-- Phase Completion Button --> */}
      <PhaseCompletionButton phaseNumber={4} />

      {/* <!-- Floating Action Buttons --> */}
      <SupplementStackingCalculatorPopup positionClassName='fixed bottom-24 right-4 z-50' />
      <DigitalTrackerPopup positionClassName='fixed bottom-44 right-4 z-50' />

      {/* <!-- Footer --> */}
      <Footer />
    </>
  );
};

export default Phase4Page;

