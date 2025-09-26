'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import StackedCarousel from '@/app/components/StackedCarousel';
import ContentModule from '@/app/components/ContentModule';
import PhaseCompletionButton from '@/app/components/PhaseCompletionButton';
import FAQList from '@/app/components/FAQList';
import NewsletterSignup from '@/app/components/NewsletterSignup';
import { AffiliateProduct, getProductsForPhase } from '@/lib/OneCentralAffiliateDatabase';
import { Product } from '@/lib/getProducts';
import Footer from '@/app/components/Footer';
import ScrollToTopButton from '@/app/components/ScrollToTopButton';
import BloatingQuizPopup from '@/app/components/BloatingQuizPopup';
import DigitalTrackerPopup from '@/app/components/DigitalTrackerPopup';
import StickyCarousel from '@/app/components/StickyCarousel';
import VideoPlayerSection from '@/app/components/workshop-component/VideoPlayerSection';


const phase2Faqs = [
  {
    question: "How long does the elimination phase last?",
    answer: "The standard elimination phase is 4 weeks. This gives your body enough time to calm down and for inflammation to reduce. However, this can be adjusted based on your individual needs."
  },
  {
    question: "What if I accidentally eat a 'forbidden' food?",
    answer: "Don't panic. Make a note of it and any symptoms you experience. It's a learning experience. Just get back on track with your next meal."
  },
  {
    question: "I'm struggling with cravings. What can I do?",
    answer: "Cravings are normal. Make sure you're eating enough of the 'allowed' foods. Try to find satisfying alternatives. Our recipe library has lots of ideas."
  }
];

const Phase2Page = () => {
  const phase2Data = {
    videoUrl: '/video/roadmap/[phase2]Baseline_Elimination_Diet.mp4',
    audioUrl: '/audio/roadmap/[phase2]Decode_Your_Digestive_Distress__The_Baseline_Elimination_Diet_f.mp4',
    audioDownloadName: 'Phase 2 Audio',
    videoChapters: [
      { "time": "00:00", "title": "Introduction: Why Elimination Diets Matter", "description": "The guessing game of food sensitivities and how to stop it." },
      { "time": "00:45", "title": "What Is an Elimination Diet?", "description": "A 4–6 week plan to remove triggers and reset the gut." },
      { "time": "01:30", "title": "Foods to Remove", "description": "Gluten, dairy, soy, legumes, nightshades, sugar, alcohol, and caffeine." },
      { "time": "02:40", "title": "The Three Phases", "description": "Eliminate → Observe → Reintroduce for clear body signals." },
      { "time": "04:40", "title": "Whole-Body Reactions", "description": "Symptoms beyond the gut: skin, joints, fatigue, mood." },
      { "time": "06:00", "title": "Closing Reflection", "description": "The goal is empowerment and clarity—your personalized food freedom." }
    ],
  };
  const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsForPhase(2);
      const mappedProducts: Product[] = products.map(p => ({
        id: p.id,
        name: p.name,
        permalink: p.url,
        slug: p.url.split('/').pop() || '',
        description: p.description || '',
        price: p.price !== undefined ? String(p.price) : '',
        images: p.imageUrl ? [{ src: p.imageUrl, alt: p.name }] : [],
        benefits: [],
        certifications: [],
        technicalDetails: [],
        featuresBenefits: [],
        testimonials: [],
        relatedProducts: [],
        category: '',
        shortDescription: '',
        moneyBackGuarantee: '',
        affiliateLink: p.url,
      }));
      setCarouselProducts(mappedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* <!-- Header --> */}
      <Header />

      {/* <!-- Hero Section --> */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1545830608-1d7e13648b48?q=80&w=2070&auto=format&fit=crop"
        title="Phase 2: Elimination & Reintroduction"
        subtitle="Calm your system and identify trigger foods with a guided protocol."
        buttonText='Start Your Elimination Journey'
        enhanceContrast={true}
      />

      {/* <!-- StickyCarousel Section --> */}
      <StickyCarousel
        title="Elimination Essentials"
        subtitle="Explore key tools and resources designed to support your elimination journey and help you identify trigger foods."
        buttonText="Explore Resources"
        buttonLink="/shop/#"
        showCarousel={false}
      />
      {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* <!-- Left Sidebar --> */}
          <aside className="lg:col-span-3 lg:block hidden">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-2 text-center">Navigate the Elimination Phase with Confidence</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Get recipes, tips, and support for identifying your trigger foods delivered to your inbox.
                </p>
                <NewsletterSignup source="phase-2-page" />
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
              <VideoPlayerSection phaseData={phase2Data} />
              <ContentModule
                type="text"
                title="Guided Elimination Protocol"
                content="This module provides a step-by-step guide to a baseline elimination diet. We will temporarily remove common trigger foods to calm your system."
              />

              <ContentModule
                type="text"
                title="Resource Library"
                content="Here you will find downloadable meal plans, grocery shopping lists, and anti-bloating recipes to support you during this phase."
              />
                 <div className="my-8 p-8 rounded-2xl bg-glass-bg shadow-lg text-center transition-transform transform ">
                    <div className="flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-camber-sage-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                        <h3 className="typography-h3 text-camber-text-primary">Meal Planning Templates</h3>
                        <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-camber-sage-light text-camber-sage-deep">
                          New
                        </span>
                    </div>
                    <p className="mt-2 mb-6 text-camber-text-secondary">Use our library of pre-made templates to make your meal planning easy during this phase.</p>
                    <Link href="/meal-planning-templates" className="btn-secondary text-grey">
                        Go to Meal Plans
                    </Link>
                </div>
            </section>
            
            {/* <!-- Desktop FAQ Section --> */}
            <section className="p-8 rounded-2xl hidden lg:block">
               <FAQList faqs={phase2Faqs} title="Phase 2 FAQs" />
            </section>
            
            {/* <!-- Mobile Only Sections --> */}
            <div className="lg:hidden">
              {/* <!-- Mobile FAQ Section --> */}
              <section aria-labelledby="faq-heading" className="my-16">
                <FAQList faqs={phase2Faqs} title="Phase 2 FAQs" />
              </section>
              {/* <!-- Mobile Recommended Products Section --> */}
              <section aria-labelledby="recommended-products-heading" className="my-16">
                <h2 id="recommended-products-heading" className="typography-h2 text-grey text-pretty text-center mb-8">Recommended Products</h2>
                <StackedCarousel products={carouselProducts} size="small" maxItems={3} />
              </section>
              {/* <!-- Mobile Newsletter Section --> */}
              <section aria-labelledby="newsletter-heading" className="my-16 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-2 text-center">Navigate the Elimination Phase with Confidence</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Get recipes, tips, and support for identifying your trigger foods delivered to your inbox.
                </p>
                <NewsletterSignup source="phase-2-page" />
              </section>
            </div>
          </main>

          {/* <!-- Right Sidebar --> */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <section aria-labelledby="recommended-products-heading" className="mb-8">
                <h2 id="recommended-products-heading" className=" typography-h2 text-grey text-pretty text-center mb-8">Recommended Products</h2>
                <StackedCarousel products={carouselProducts} size="small" maxItems={3} />
              </section>
            </div>
          </aside>
        </div>
      </div>

      {/* <!-- Phase Completion Button --> */}
      <PhaseCompletionButton phaseNumber={2} />

      {/* <!-- Floating Action Buttons --> */}
      <BloatingQuizPopup positionClassName='fixed bottom-24 right-4 z-50' />
      <DigitalTrackerPopup positionClassName='fixed bottom-44 right-4 z-50' />

      {/* <!-- Footer --> */}
      <Footer />
    </>
  );
};

export default Phase2Page;

