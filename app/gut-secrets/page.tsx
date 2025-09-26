import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FAQList from '../components/FAQList';
import Footer from '../components/Footer';
import StackedCarousel from '../components/StackedCarousel';
import { gutSecrets } from '../../lib/gutSecretsData';
import React from 'react';
import BloatingQuizPopup from '../components/BloatingQuizPopup';
import { Product } from '../../lib/getProducts';
import StickyCarousel from '../components/StickyCarousel';
import TestimonialCards from '../components/TestimonialCards';
import { SuccessStory } from '../../lib/testimonialsData';

const faqs = [
  { question: 'What is the main cause of fatigue and bloating?', answer: 'The guide explains that fatigue and bloating often stem from a leaky gut, stress, an imbalanced microbiome, poor meal timing, and inefficient digestion, rather than just lack of sleep or overeating.' },
  { question: 'How can I fix a leaky gut?', answer: 'The guide suggests repairing your gut barrier by increasing fiber and anti-inflammatory foods, and considering a quality probiotic to help reinforce your intestinal lining.' },
  { question: 'What is the connection between stress and digestion?', answer: 'Chronic stress can disrupt your gut bacteria balance and inflame your GI tract. The guide recommends activating your body’s “rest and digest” mode through breathing exercises and natural aids like ginger tea.' },
  { question: 'Why is meal timing important?', answer: 'Your body has a natural digestive clock. Eating at regular times, and having lighter dinners, helps your gut perform optimally, absorbing nutrients when needed and resting when it should.' },
];

const testimonialStories: SuccessStory[] = [
  {
    caseStudySlug: 'energy-boost',
    problem: 'I thought feeling tired all the time was normal for a busy professional. This guide made me realize I was leaking energy. Fixing my gut lining was a game-changer.',
    timeline: '3 weeks',
    lifeStage: 'Busy Professional',
    issueTags: ['Fatigue', 'Bloating'],
    credibility: { verified: true, consent: true },
    mediaGallery: [],
    protocol: { steps: [] },
  },
  {
    caseStudySlug: 'stress-and-digestion',
    problem: 'I never connected my stress with my digestive issues. This guide\'s explanation of the gut-brain axis was a lightbulb moment. The breathing exercises and ginger tea have made a huge difference.',
    timeline: '2 weeks',
    lifeStage: 'Entrepreneur',
    issueTags: ['Stress', 'Digestion'],
    credibility: { verified: true, consent: true },
    mediaGallery: [],
    protocol: { steps: [] },
  },
  {
    caseStudySlug: 'microbiome-power',
    problem: 'I was eating all the \'right\' things but still felt sluggish. This guide taught me that I need to feed my microbes, not just myself. Adding prebiotics and fermented foods changed everything.',
    timeline: '1 month',
    lifeStage: 'Consultant',
    issueTags: ['Low Energy', 'Digestion'],
    credibility: { verified: true, consent: true },
    mediaGallery: [],
    protocol: { steps: [] },
  },
];

const GutSecretsPage = () => {
  const products: Product[] = gutSecrets.map(secret => ({
    id: secret.id.toString(),
    name: secret.title,
    description: secret.description,
    images: [{ src: secret.image, alt: secret.title }],
    slug: `secret-${secret.id}`,
    permalink: `secret-${secret.id}`,
    price: 'Free',
  }));

  return (
    <div className="min-h-screen">
      <BloatingQuizPopup />
      <Header />
      <main id="main">
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1621498341895-f04d7f4ac195?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="5 Secrets to Restoring Digestion and Enhancing Energy"
          subtitle="A Practical, Science-Backed Field Guide for Busy Professionals"
          buttonText="Get The Free Guide"
          buttonLink="/gut-secrets/register"
          hideBanner={true}
          enhanceContrast={true}
        />
        <StickyCarousel
          title="Unlock Your Gut's Potential"
          subtitle="Discover the 5 secrets to restoring digestion, enhancing energy, and transforming your well-being. Download our free guide today!"
          buttonText="Explore the Secrets"
          showCarousel={false}
          buttonLink='/gut-secrets/register'
        />
        
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
            <h2 className="typography-h2 text-grey text-pretty mb-16 sr-only">The 5 Secrets to a Healthier Gut</h2>
        </div>
        <StackedCarousel products={products} displayPrice={false} />

        <div className='py-20 px-4'>
        <TestimonialCards stories={testimonialStories} 
        title="What Our Readers Are Saying" 
        showCta={true} 
        ctaText="Get The Free Guide" 
        ctaLink="/gut-secrets/register" 
        useLinks={false} />
        </div>

        <div className='py-20 px-4'>
          <FAQList faqs={faqs} />
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default GutSecretsPage;
