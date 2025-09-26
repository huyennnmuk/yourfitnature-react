'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import StackedCarousel from '@/app/components/StackedCarousel';
import ContentModule from '@/app/components/ContentModule';
import PhaseCompletionButton from '@/app/components/PhaseCompletionButton';
import FAQList from '@/app/components/FAQList';
import NewsletterSignup from '@/app/components/NewsletterSignup';
import { getProductsForPhase, AffiliateProduct } from '@/lib/OneCentralAffiliateDatabase';
import { Product } from '@/lib/getProducts';
import Footer from '@/app/components/Footer';
import ScrollToTopButton from '@/app/components/ScrollToTopButton';
import BloatingQuizPopup from '@/app/components/BloatingQuizPopup';
import DigitalTrackerPopup from '@/app/components/DigitalTrackerPopup';
import SupplementStackingCalculator from '@/app/components/SupplementStackingCalculator';
import PremiumContentUpsell from '@/app/components/PremiumContentUpsell';
import TwoColumnAffiliateLayout from '@/app/components/TwoColumnAffiliateLayout';
import StickyCarousel from '@/app/components/StickyCarousel';
import SupplementStackingCalculatorPopup from '@/app/components/SupplementStackingCalculatorPopup';
import VideoPlayerSection from '@/app/components/workshop-component/VideoPlayerSection';


const phase3Faqs = [
  {
    question: "What's the difference between probiotics and prebiotics?",
    answer: "Probiotics are the beneficial bacteria themselves. Prebiotics are the 'food' for these bacteria, typically fiber-rich foods. You need both for a healthy gut."
  },
  {
    question: "How do I know which supplements to choose?",
    answer: "Our Supplement Stacking Calculator is designed to give you a personalized recommendation based on your symptoms and goals. When in doubt, start with a high-quality, broad-spectrum probiotic."
  },
  {
    question: "Can I get everything I need from food?",
    answer: "While a whole-foods diet is the foundation, targeted supplements can provide a therapeutic dose of specific nutrients and probiotics that can be difficult to obtain from food alone, especially during the healing phase."
  }
];

const Phase3Page = () => {
  const phase3Data = {
    videoUrl: '/video/roadmap/[Phase3]Gut_Microbiome_Mastery_Guide.mp4',
    audioUrl: '/audio/roadmap/[phase3]Your_Gut__The_Inner_Ecosystem_Guiding_Your_Mood,_Immunity,_and_.mp4',
    audioDownloadName: 'Phase 3 Audio',
    videoChapters: [
  { "time": "00:00", "title": "Introduction: The Gut Ecosystem", "description": "Your inner garden and its link to mind, mood, and energy." },
  { "time": "00:40", "title": "Gut-Brain Axis & Microbes", "description": "How the ENS, vagus nerve, and trillions of microbes shape health." },
  { "time": "02:40", "title": "Disruptors of Balance", "description": "Processed food, antibiotics, stress, and sleep loss cause dysbiosis." },
  { "time": "03:20", "title": "Gut Garden Toolkit", "description": "Prebiotics, fermented foods, and polyphenols to cultivate balance." },
  { "time": "05:05", "title": "Gut Barrier & Healing Nutrients", "description": "Butyrate, glutamine, zinc, omega-3s, and vitamin D for repair." },
  { "time": "06:00", "title": "Action Plan & Closing", "description": "30+ plant foods weekly, one fermented food daily, less processed sugar." }
],
  };
  const [allPhase3Products, setAllPhase3Products] = useState<AffiliateProduct[]>([]);
  const [phase3Products, setPhase3Products] = useState<AffiliateProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProductsForPhase(3);
      setAllPhase3Products(allProducts);

      const filteredProducts = await getProductsForPhase(3, 'Anti-inflammatory');
      if (filteredProducts.length > 0) {
        setPhase3Products(filteredProducts);
      } else {
        setPhase3Products(allProducts);
      }
    };

    fetchProducts();
  }, []);

  const carouselProducts: Product[] = allPhase3Products.map(p => ({
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

  return (
    <>
      {/* <!-- Header --> */}
      <Header />


      {/* <!-- Hero Section --> */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1659339209507-115d9155002e?q=80&w=2074&auto=format&fit=crop"
        title="Phase 3: Gut Healing & Rebalancing"
        subtitle="Nourish your gut, restore balance, and support your body's natural healing processes."
        buttonText='Get Started with Phase 3'
        enhanceContrast={true}
      />
      
      {/* <!-- StickyCarousel Section --> */}
      <StickyCarousel
        title="Key Pillars of Gut Healing"
        subtitle="Discover essential strategies and tools to accelerate healing and restore natural gut balance."
        buttonText="Discover More"
        buttonLink="/resources"
        showCarousel={false}
      />

      
      {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* <!-- Left Sidebar --> */}
          <aside className="lg:col-span-3 lg:block hidden">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-2 text-center">Heal and Rebalance Your Gut</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Subscribe for expert advice on gut-healing foods, supplement guides, and lifestyle tips.
                </p>
                <NewsletterSignup source="phase-3-page" />
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
              <VideoPlayerSection phaseData={phase3Data} />
              <ContentModule
                type="text"
                title="The Role of Probiotics & Prebiotics"
                content="Learn about the crucial role of beneficial bacteria in your gut and how to nourish them with the right foods and supplements."
              />

              <ContentModule
                type="text"
                title="Your Personalized Supplement Protocol"
                content="Use the calculator below to generate a personalized supplement stack based on your unique needs and the findings from your previous phases."
              />
              
              {/* <!-- Supplement Stacking Calculator --> */}
              <div className="my-8">
                <SupplementStackingCalculator />
              </div>

              <ContentModule
                type="text"
                title="Recommended Products"
                content="Based on your results, here are some recommended products that may help you on your journey. These are affiliate links, which means we may earn a small commission at no extra cost to you."
              />

              {/* <!-- Recommended Products --> */}
              <TwoColumnAffiliateLayout products={phase3Products} />

              

              {/* <!-- Premium Content Upsell --> */}
              <div className="my-12">
                <PremiumContentUpsell
                  title="Want to dig deeper? Consider Advanced Testing"
                  description="For persistent issues, at-home tests for SIBO or food sensitivities can provide a deeper level of insight. We've partnered with reputable labs to offer you a discount."
                  buttonText="Explore Testing Options"
                  link="/testing"
                  isLocked={true}
                />
              </div>
            </section>
            
            {/* <!-- Desktop FAQ Section --> */}
            <section className="p-8 rounded-2xl hidden lg:block">
               <FAQList faqs={phase3Faqs} title="Phase 3 FAQs" />
            </section>
            
            {/* <!-- Mobile Only Sections --> */}
            <div className="lg:hidden">
              {/* <!-- Mobile FAQ Section --> */}
              <section aria-labelledby="faq-heading" className="my-16">
                <FAQList faqs={phase3Faqs} title="Phase 3 FAQs" />
              </section>
              {/* <!-- Mobile Recommended Products Section --> */}
              <section aria-labelledby="recommended-products-heading" className="my-16">
<StackedCarousel products={carouselProducts} size="small" maxItems={3} />
              </section>
              {/* <!-- Mobile Newsletter Section --> */}
              <section aria-labelledby="newsletter-heading" className="my-16 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-2 text-center">Heal and Rebalance Your Gut</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Subscribe for expert advice on gut-healing foods, supplement guides, and lifestyle tips.
                </p>
                <NewsletterSignup source="phase-3-page" />
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
      <PhaseCompletionButton phaseNumber={3} />

      {/* <!-- Floating Action Buttons --> */}
      <SupplementStackingCalculatorPopup positionClassName='fixed bottom-24 right-4 z-50' />
      <DigitalTrackerPopup positionClassName='fixed bottom-44 right-4 z-50' />
      
      {/* <!-- Footer --> */}
      <Footer />
    </>
  );
};

export default Phase3Page;