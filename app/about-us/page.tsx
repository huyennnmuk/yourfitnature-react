
'use client';
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { Briefcase, Heart, Lightbulb, Users } from 'lucide-react';
import StickyCarousel from '../components/StickyCarousel';
import ValueProposition from '../components/ValueProposition';
import TwoColumnFeature from '../components/TwoColumnFeature';
import OurJourney from '../components/OurJourney';
import ContentWithImageSection from '../components/ContentWithImageSection';
import BlurHero from '../components/BlurHero';
import BloatingQuizPopup from '../components/BloatingQuizPopup';



import FAQList from '../components/FAQList';

const AboutUsPage: NextPage = () => {

  const founderData = {
    title: "Meet the Founder",
    description: "I am a passionate solopreneur who turned personal health struggles into purpose. After years of navigating gut issues, they uncovered the link between digestive wellness and mental clarity. Today, they combine science-backed education, storytelling, and digital tools to simplify the wellness journey, aiming to make gut healing empowering, not overwhelming.",
    images: ['/images/pencil-drawing-cofounder.png'],
    buttonText: "Learn More",
    buttonLink: "/about-us",
    imageClassName: "w-64 h-64 rounded-full overflow-hidden shadow-2xl"
  };

  const philosophyBenefits = [
    {
        icon: Heart,
        title: "FOUNDATION OF WELL-BEING",
        description: "Gut health is the foundation of overall well-being."
    },
    {
        icon: Lightbulb,
        title: "MIND & BODY CONNECTION",
        description: "A healthy gut nurtures a clear mind and resilient body."
    },
    {
        icon: Briefcase,
        title: "SIMPLE SOLUTIONS",
        description: "Busy lives deserve simple, effective digestive support."
    },
    {
        icon: Users,
        title: "INFORMED CHOICES",
        description: "We believe in informed choices—backed by science, guided by compassion."
    }
  ];

  const whatYoullFind = {
    title: "What You'll Find Here",
    subtitle: "Quality resources to support your gut health journey, including:",
    leftColumn: (
        <div className="bg-perplexity-code-bg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-camber-text-primary">RESEARCH & SCIENCE</h3>
            <ul className="list-disc list-inside space-y-2 text-camber-text-secondary">
            <li>Clear, science-backed reviews of supplements.</li>
            <li>Deep dives into gut science, trends, and breakthroughs.</li>
            </ul>
        </div>
    ),
    rightColumn: (
        <div className=" bg-perplexity-code-bg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-camber-text-primary">GUIDES & RESOURCES</h3>
            <ul className="list-disc list-inside space-y-2 text-camber-text-secondary">
            <li>Beginner-friendly guides on restoring digestion naturally.</li>
            <li>Personal stories, product comparisons, and wellness tips.</li>
            </ul>
        </div>
    )
  };

  const aboutUsFaqs = [
    {
      question: "What makes YourFitNature different?",
      answer: "We focus on a holistic approach that connects gut health to overall wellness, particularly for busy individuals. We prioritize science-backed, practical solutions over quick fixes or fads."
    },
    {
      question: "Who is this site for?",
      answer: "This site is for anyone, especially busy people, who are struggling with digestive issues like bloating, fatigue, and brain fog and are looking for trusted, actionable guidance to restore their energy and well-being."
    },
    {
      question: "Are your recommendations backed by science?",
      answer: "Absolutely. Our philosophy is built on informed choices. We provide clear, science-backed reviews and deep dives into gut science to ensure our recommendations are effective and trustworthy."
    },
    {
      question: "How do you make money if the content is free?",
      answer: "We believe in providing free, high-quality educational content. We support our work through an ethical, ad-free affiliate model. This means if you purchase a product we recommend through our links, we may earn a commission at no extra cost to you. We only recommend products we trust."
    }
  ];

  return (
    <div className="h-min-screen">
      <Head>
        <title>About Us - YourFitNature</title>
        <meta
          name="description"
          content="Learn about YourFitNature's mission to restore digestion and energy for busy people."
        />
      </Head>
      <Header />
      <main>
        {/* Hero Section */}
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1749055486169-3f07e62481c6?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="About YourFitNature"
          subtitle="Here, we believe that true wellness begins in the gut."
          enhanceContrast={true}
          hideButton={false}
          buttonText='More About Us'
        />
        
        {/* Commitment Section */}
        <StickyCarousel
            title="Our Commitment to You"
            subtitle="To help busy people restore digestion, so they can regain energy and rediscover daily inspiration."
            buttonText="Explore Our Solutions"
            buttonLink="/shop"
            showCarousel={true}
        />

        {/* Founder Section */}
        <div className="py-20 px-4">
            <ContentWithImageSection {...founderData} />
        </div>
        
        {/* Philosophy Section */}
        <div className="py-20 px-4">
            <ValueProposition title="Our Philosophy" benefits={philosophyBenefits} gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" />
        </div>
        
        {/* What You'll Find Here Section */}
        <div className="py-20 px-4">
          <TwoColumnFeature {...whatYoullFind} />
        </div>

        {/* Journey Section */}
        <div className="py-20 px-4">
          <OurJourney />
        </div>

        <div className="py-20 px-4">
          <FAQList faqs={aboutUsFaqs} title="Frequently Asked Questions" />
        </div>

        {/* Final CTA Section */}
        <BlurHero />
      </main>

      <Footer />
      <BloatingQuizPopup />
    </div>
  );
};

export default AboutUsPage;
