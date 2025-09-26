import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StickyCarousel from './components/StickyCarousel';
import TestimonialCards from './components/TestimonialCards';
import CountTextSection from './components/CountTextSection';
import HorizontalCarousel from './components/HorizontalCarousel';
import FolderGroupSection from './components/FolderGroupSection';
import './styles/camber-system.css';
import BlurHero from './components/BlurHero';
import Footer from './components/Footer';
import BloatingQuizPopup from './components/BloatingQuizPopup';
import React, { useState } from 'react';
import { successStories } from '@/lib/testimonialsData';

const navItems = [
  { name: 'Shop', href: '/shop' },
  { name: 'Blog', href: '/blog' },
  { name: 'Bloating', href: '/bloating-breakthrough-blueprint' },
  { name: 'Roadmap', href: '/bloating-recovery-roadmap' },
];

const secondaryNavItems = [
  { name: 'Community', href: '/community-challenge' },
  { name: 'Workshop', href: '/workshop/bloating-hormones' },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <BloatingQuizPopup />
      <Header navItems={navItems} secondaryNavItems={secondaryNavItems} />
      <main id="main">
        {/* Hero Section */}
        <HeroSection
          backgroundImage="https://cdn.sanity.io/images/rutp9o6i/production/b6742aafef4afef02473af09d3a7240321d6a3dc-2560x2000.webp"
          enhanceContrast={true}
          buttonLink="/shop"
        />

        {/* Sticky Carousel Section: Smart Choices */}
        <StickyCarousel
          title="Smart Choices, Trusted Outcomes"
          subtitle="We sort through the clutter of gut products so you don’t have to."
          buttonText="Find Your Gut Solution"
          buttonLink="/shop"
          showCarousel={true}
        />

        {/* Counter Section */}
        <div className='py-20 px-4'>
          <CountTextSection />
        </div>

        {/* Horizontal Carousel Section: Blog Posts */}
        <HorizontalCarousel
          title="Tailored Gut Solutions"
          subtitle="Wellness routines designed to fit your lifestyle."
          mainButtonText="See All Posts"
        />

        {/* Folder Group Section: How it works */}
        <div className='py-20 px-4'>
          <FolderGroupSection
            title="How Bloating Recovery Roadmap Works"
            description="We connect gut symptoms like bloating to smart solutions—no guesswork needed."
          />
        </div>

        {/* Testimonials Section */}
        <div className='py-20 px-4'>
          <TestimonialCards stories={successStories} />
        </div>

        {/* Blur Hero Section: CTA */}
        <div className='py-20'>
          <BlurHero />
        </div>

        {/* Footer Section */}
        <Footer />
      </main>
    </div>
  );
};

export default Home;