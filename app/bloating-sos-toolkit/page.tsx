
import BloatingSOSToolkit from "@/app/components/BloatingSOSToolkit";
import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import StickyCarousel from '@/app/components/StickyCarousel';
import HeroSection from "../components/HeroSection";
import BloatingQuizPopup from "../components/BloatingQuizPopup";
import SupplementStackingCalculatorPopup from "../components/SupplementStackingCalculatorPopup";
import BlurHero from "../components/BlurHero";
import FAQList from '../components/FAQList';

const BloatingSOSToolkitPage = () => {

  const sosFaqs = [
    {
      question: "What is the Bloating SOS Toolkit?",
      answer: "It's a curated collection of immediate relief strategies, emergency meal swaps, and supplement protocols designed to quickly address unexpected bloating episodes."
    },
    {
      question: "How quickly can I expect relief?",
      answer: "The strategies and supplements in the toolkit are chosen for their fast-acting properties. While individual results vary, many users experience relief within a few hours."
    },
    {
      question: "Are the recommended products safe?",
      answer: "We only recommend products that are backed by scientific research and have a strong safety profile. However, it's always best to consult with your healthcare provider before starting any new supplement."
    },
    {
      question: "Do I need to buy all the recommended products?",
      answer: "Not at all. The toolkit provides a range of options. You can choose the products that best fit your specific symptoms, preferences, and what you have available. The goal is to provide you with effective choices, not to require a large purchase."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main">
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1590032566780-6aa2fb4c58b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          enhanceContrast={true}
          title="Bloating SOS Emergency Toolkit"
          subtitle="Your rescue kit for unexpected bloating episodes."
          buttonText="Discover More"
          buttonLink="/shop"

        />
        <StickyCarousel 
          title="Turn Bloating Into Clarity"
          subtitle="Trusted tools to restore your comfort in minutes."
          buttonText="Back to Blueprint"
          buttonLink="/bloating-breakthrough-blueprint"
          showCarousel={false}
        />
        <div className="py-20 px-4">
          <BloatingSOSToolkit />
        </div>

        <div className="py-20 px-4">
          <FAQList faqs={sosFaqs} title="Toolkit FAQs" />
        </div>

        <BlurHero />
      </main>
      <Footer />
      <BloatingQuizPopup />
      <SupplementStackingCalculatorPopup positionClassName="fixed bottom-4 left-4 z-40" />
    </div>
  );
};

export default BloatingSOSToolkitPage;
