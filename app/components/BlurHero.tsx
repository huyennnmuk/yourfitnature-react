"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import AnnouncementBanner from './AnnouncementBanner';
import React from 'react';

const BlurHero = () => {
  return (
    <section data-section="blurHero" className="relative w-full flex items-center justify-center min-h-[70vh] py-10" style={{
      background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #b7d6a7 0%, #eaf6e2 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="absolute inset-0 z-0">
        <div className="h-0 min-h-full w-full blur-[100px]">
          <Image
            alt="Background image"
            loading="lazy"
            width={3324}
            height={2600}
            decoding="async"
            data-nimg="1"
            className="h-full w-full object-cover object-top"
            sizes="100vw"
            src="https://cdn.sanity.io/images/rutp9o6i/production/4737475e3d53d6e233647aab69c1cb2b47ce7e27-3324x2600.webp?w=3840&fit=max&auto=format&h=3004&q=100"
            style={{ color: 'transparent' }}
          />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <div className="glass-light mx-auto w-full max-w-3xl min-h-[420px] flex flex-col items-center justify-center gap-y-4 px-4 py-8 md:gap-y-6 md:px-8 md:py-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4">Your Gut. Your Clarity.</h2>
          <p className="text-base md:text-lg lg:text-xl max-w-[50ch] text-balance text-center text-white mb-8">Say goodbye to bloat, brain fog, and confusion. We simplify gut health with smart routines and trusted solutions.</p>
          <Link
            href="/about-us"
            className="text-grey btn-secondary inline-flex items-center"
          >
            About Us
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlurHero;
