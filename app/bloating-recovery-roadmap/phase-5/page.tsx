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
import BloatingQuizPopup from '@/app/components/BloatingQuizPopup';
import DigitalTrackerPopup from '@/app/components/DigitalTrackerPopup';
import PremiumContentUpsell from '@/app/components/PremiumContentUpsell';
import StickyCarousel from '@/app/components/StickyCarousel';
import SupplementStackingCalculatorPopup from '@/app/components/SupplementStackingCalculatorPopup';
import VideoPlayerSection from '@/app/components/workshop-component/VideoPlayerSection';



// Mock FAQ data as it's not provided in context
const phase5Faqs = [
  {
    question: "I'm scared to reintroduce foods. What if my symptoms come back?",
    answer: "This is a common fear. The goal of the 80/20 rule is to find your personal threshold. Start with a small amount of one food and see how you feel. The goal is food freedom, not restriction."
  },
  {
    question: "How do I know if I'm ready to move to maintenance?",
    answer: "You're likely ready if your symptoms are significantly reduced, you've identified your major triggers, and you feel confident in your ability to manage your gut health through diet and lifestyle."
  },
  {
    question: "What if I have a flare-up?",
    answer: "Flare-ups happen. Don't see it as a failure. Go back to the basics of Phase 1 or 2 for a few days to calm your system. You have the tools to get back on track."
  }
];

const Phase5Page = () => {
  const phase5Data = {
    videoUrl: '/video/roadmap/[phase5]Gut_Health_Maintenance.mp4',
    audioUrl: '/audio/roadmap/[phase5]Beyond_the__Fix__Sustaining_Lifelong_Gut_Health_with_Consistenc.mp4',
    audioDownloadName: 'Phase 5 Audio',
    videoChapters: [
      { "time": "00:00", "title": "Introduction: From Healing to Maintenance", "description": "Why gut recovery is just the starting line, not the finish." },
      { "time": "00:35", "title": "Mindset Shift & 80/20 Rule", "description": "Consistency over perfection for long-term gut success." },
      { "time": "01:35", "title": "Roadmap for Food Reintroduction", "description": "A gradual 4-phase process and the moderation matrix." },
      { "time": "02:45", "title": "The Four Pillars of Gut Health", "description": "Diet diversity, smart supplements, lifestyle, and tracking." },
      { "time": "05:20", "title": "Handling Setbacks & Plateaus", "description": "How stress, hormones, illness, and antibiotics affect gut resilience." },
      { "time": "06:30", "title": "Redefining Success", "description": "Stable energy, mood resilience, and cognitive clarity." },
      { "time": "06:55", "title": "Closing Reflection", "description": "Gut health as a lifelong journey of empowerment, not a finish line." }
    ],
  };
  const [carouselProducts, setCarouselProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsForPhase(5);
      if (products) {
        const mappedProducts = products.map(p => ({
          id: p.id,
          name: p.name,
          permalink: p.url ?? '',
          slug: (p.url ?? '').split('/').pop() || '',
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
          affiliateLink: p.url ?? '',
        }));
        setCarouselProducts(mappedProducts);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* <!-- Header --> */}
      <Header />

      {/* <!-- Hero Section --> */}
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1514889363570-bf36ac74b42d?q=80&w=2070&auto=format&fit=crop"
          title="Phase 5: Maintenance & Long-Term Wellness"
          subtitle="Integrate what you've learned into a sustainable lifestyle for lasting relief."
          buttonText='Start Phase 5'
          enhanceContrast={true}
        />

        {/* <!-- Sticky Carousel Section --> */}
        <StickyCarousel
          title="Sustain Your Success"
          subtitle="Keep your progress on track with personalized guidance, ongoing support, and the tools you need to thrive in your maintenance phase."
          buttonText="Learn More"
          buttonLink="#"
          showCarousel={false}
        />

        {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* <!-- Left Sidebar --> */}
          <aside className="lg:col-span-3 lg:block hidden">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-2 text-center">Maintain Your Progress, Thrive for Life</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Stay motivated with our newsletter, offering ongoing support, new recipes, and tips for long-term gut health.
                </p>
                <NewsletterSignup source="phase-5-page" />
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
              <VideoPlayerSection phaseData={phase5Data} />
              <ContentModule
                type="text"
                title="The 80/20 Rule"
                content="Learn how to incorporate your personal trigger foods in moderation without causing a flare-up."
              />

              <ContentModule
                type="text"
                title="Community Connection"
                content="You've completed the roadmap! Join our private community group for ongoing support and to share your success story."
              />
              
              {/* <!-- Premium Content Upsell --> */}
              <div className="my-12">
                <PremiumContentUpsell
                  title="Premium Workshop: Hormones & Bloating"
                  description="A deep dive into the connection between hormonal fluctuations and digestive health. This premium workshop is available for purchase."
                  buttonText="Unlock Workshop"
                  link="/workshop/bloating-hormones"
                  isLocked={true}
                />
              </div>
            </section>
            
            {/* <!-- Desktop FAQ Section --> */}
            <section className="p-8 rounded-2xl hidden lg:block">
               <FAQList faqs={phase5Faqs} title="Phase 5 FAQs" />
            </section>
            
            {/* <!-- Mobile Only Sections --> */}
            <div className="lg:hidden">
              {/* <!-- Mobile FAQ Section --> */}
              <section aria-labelledby="faq-heading" className="my-16">
                <FAQList faqs={phase5Faqs} title="Phase 5 FAQs" />
              </section>
              {/* <!-- Mobile Recommended Products Section --> */}
              <section aria-labelledby="recommended-products-heading" className="my-16">
                <h2 id="recommended-products-heading" className="typography-h2 text-grey text-pretty text-center mb-8">Recommended Products</h2>
                <StackedCarousel products={carouselProducts} size="small" />
              </section> 
              {/* <!-- Mobile Newsletter Section --> */}
              <section aria-labelledby="newsletter-heading" className="my-16 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-2 text-center">Maintain Your Progress, Thrive for Life</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Stay motivated with our newsletter, offering ongoing support, new recipes, and tips for long-term gut health.
                </p>
                <NewsletterSignup source="phase-5-page" />
              </section>
            </div>
          </main>

          {/* <!-- Right Sidebar --> */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <section aria-labelledby="recommended-products-heading" className="mb-8">
                <h2 id="recommended-products-heading" className=" typography-h2 text-grey text-pretty text-center mb-8">Recommended Products</h2>
                <StackedCarousel products={carouselProducts} size="small" />
              </section>
            </div>
          </aside>
        </div>
      </div>

      {/* <!-- Phase Completion Button --> */}
      <PhaseCompletionButton phaseNumber={5} />

      {/* <!-- Floating Action Buttons --> */}
      <DigitalTrackerPopup positionClassName='fixed bottom-44 right-4 z-50' /> 
      <BloatingQuizPopup positionClassName='fixed bottom-4 left-4 z-50'/>
      <SupplementStackingCalculatorPopup positionClassName='fixed bottom-24 right-4 z-50' />

      {/* <!-- Footer --> */}
      <Footer />
    </>
  );
};

export default Phase5Page;
