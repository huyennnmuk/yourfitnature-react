"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ReusableButton from '../components/ReusableButton';
import React from 'react';
import StickyCarousel from '../components/StickyCarousel';
import VerticalSlider from '../components/VerticalSlider';
import { communityChallengeSliderData } from '../../lib/communityChallengeSliderData';
import BlurHero from '../components/BlurHero';
import FAQList from '../components/FAQList';
import { communityChallengeFaqs } from '../../lib/faqData';

const CommunityChallengePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1734451047658-98a8b3e7a1a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Join the Community Challenge"
          subtitle="Take on our monthly challenge with group support, daily actions, and expert guidance to keep you motivated and on track."
          buttonText="Join the Challenge Now"
          enhanceContrast={true}
        />
        {/* SECTION: Challenge Details */}
            <StickyCarousel
            title="What is the Community Challenge?"
            subtitle="This is a supportive, motivating program designed perfectly to help you grow and thrive."
            buttonText="Join the Challenge Now"
            buttonLink="/community-challenge/register"
            showCarousel={false}
            />
            {/* END SECTION: Challenge Details */}

        <section className="py-20 px-4">
          <div className="container mx-auto">         
            
            <VerticalSlider slides={communityChallengeSliderData} imageWidth={200} imageHeight={200} />
            
          </div>
        </section>

        {/* SECTION: Call to Action */}
        <div className="py-20 px-4 bg-glass-bg">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
                <h2 className="typography-h2 text-grey text-pretty">Ready to Transform Your Health?</h2>
                <p className="text-base sm:text-lg text-grey max-w-2xl">Don&apos;t wait any longer to take control of your health. Join our community and start your journey towards a healthier, happier you.</p>
                <ReusableButton as="a" href="/community-challenge/register" className="btn-secondary !bg-perplexity-primary !text-white"> I&apos;m Ready, Let&apos;s Do This!
               </ReusableButton>
            </div>
        </div>
        {/* END SECTION: Call to Action */}

        {/* SECTION: FAQ */}
        <FAQList faqs={communityChallengeFaqs} title="Frequently Asked Questions" />

        


        {/* SECTION: Blur Hero */}
        <BlurHero />
        {/* END SECTION: Blur Hero */}





      </main>
      <Footer />
    </div>
  );
};

export default CommunityChallengePage;
