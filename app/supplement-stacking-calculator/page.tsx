import Header from '../components/Header';
import React from 'react';
import Footer from '../components/Footer';
import SupplementStackingCalculator from '../components/SupplementStackingCalculator';
import HeroSection from '../components/HeroSection';
import TestimonialCards from '../components/TestimonialCards';
import StickyCarousel from '../components/StickyCarousel';
import SpeechBubblesSection from '../components/SpeechBubblesSection';
import ContentWithImageSection from '../components/ContentWithImageSection';
import { successStories } from '../../lib/testimonialsData';
import BlurHero from '../components/BlurHero';
import FAQList from '../components/FAQList';
import BloatingQuizPopup from '../components/BloatingQuizPopup';
import SupplementStackingCalculatorPopup from '../components/SupplementStackingCalculatorPopup';


const SupplementStackingCalculatorPage = () => {

  const calculatorFaqs = [
    {
      question: "What is the Supplement Stacking Calculator?",
      answer: "It's an interactive tool designed to provide personalized supplement recommendations based on the symptoms you select. It helps you understand which supplements might work together to address your specific health goals."
    },
    {
      question: "Is this medical advice?",
      answer: "No. This tool is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before starting any new supplement regimen."
    },
    {
      question: "How are the recommendations generated?",
      answer: "The recommendations are based on an internal database that maps common symptoms to supplements that have been studied for their potential benefits. The calculator also checks for potential interactions between the recommended supplements."
    },
    {
      question: "What should I do after I get my recommendations?",
      answer: "You can download your personalized protocol to review. We strongly recommend discussing the recommendations with your doctor or a qualified healthcare professional to ensure they are appropriate for your individual health needs and existing medications."
    }
  ];
  return (
    <div className="min-h-screen fitnature-section-bg">
      <Header />
      <main id="main">
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1551464170-bb6ec2856891?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Supplement Stacking Calculator"
          subtitle="Create your personalized supplement stack based on your symptoms and health goals."
          buttonText="Get Started"
          enhanceContrast={true}
        />
        
        <ContentWithImageSection
          title="Unlock Your Optimal Wellness"
          description="Our Supplement Stacking Calculator helps you create a personalized supplement plan based on your unique symptoms and health goals. Get ready to feel your best!"
          images={[
            '/img/stacking-supplement-calculator-step-1.png',
            '/img/stacking-supplement-calculator-step-2.png',
          ]}
          aspectRatio="aspect-video"
          imageFit="contain"
        />
        <div className='py-20 px-4'>
        <SupplementStackingCalculator />
        </div>

        <div className='py-20 px-4'>
        <StickyCarousel />
        </div>

        <div className='py-20 px-4'>
        <TestimonialCards stories={successStories} />
        </div>
        <div className='py-20 px-4'>
        <SpeechBubblesSection />     
        </div>

        

        <div className='py-20 px-4'>
          <FAQList faqs={calculatorFaqs} title="Calculator FAQs" />
        </div>
       <div className='py-20 px-4'>
          <BlurHero />
        </div>

      </main>
      <Footer />
      <BloatingQuizPopup />
      <SupplementStackingCalculatorPopup positionClassName="fixed bottom-4 left-4 z-40" />
    </div>
  );
}
export default SupplementStackingCalculatorPage;