"use client";
import AnnouncementBanner from './AnnouncementBanner';
import { FaArrowDown } from 'react-icons/fa';
import React from 'react';
import Image from 'next/image';

import Link from 'next/link';

interface HeroSectionProps {
  backgroundImage: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string; // New prop for button link
  hideBanner?: boolean; // New prop to hide banner
  hideButton?: boolean; // New prop to hide button
  avatarImage?: string;
  enhanceContrast?: boolean; // New prop to enhance contrast
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  title = "From Gut Health<br />to Greatness",
  subtitle = "We heal from the inside<br />so you can glow on the outside.",
  buttonText = "Let's Get Started",
  buttonLink,
  hideBanner = false, // Default to false (show banner)
  hideButton = false, // Default to false (show button)
  avatarImage,
  enhanceContrast = false,
}) => {
  return (
    <section data-section="hero">
      <div className="relative min-h-screen h-[110vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // Make the background fixed
            position: 'relative',
          }}>

        {!hideBanner && ( // Conditionally render AnnouncementBanner
          <div className="absolute top-0 left-0 right-0 z-10 mt-16 sm:mt-20 md:mt-28">
            <AnnouncementBanner lightText={enhanceContrast} />
          </div>
        )}

        {/* Overlay for depth */}
        <div className="absolute inset-0"
             style={{
               background: 'radial-gradient(circle at center, rgba(180, 223, 165, 0.15) 0%, rgba(110, 124, 91, 0.25) 100%)',
               boxShadow: 'inset 0 0 150px rgba(0,0,0,0.08)'
             }}>
        </div>
        {enhanceContrast && <div className="absolute inset-0 bg-black opacity-20"></div>}

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {avatarImage && (
            <div className="mb-8">
              <Image
                src={avatarImage}
                alt="avatar"
                width={80}
                height={80}
                className="rounded-full mx-auto !h-20 !w-20"
              />
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 md:mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-md md:max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: subtitle }} />
        </div>

        {!hideButton && (
          <div className="absolute bottom-20 left-0 right-0 z-10 flex flex-row items-center justify-center space-y-2">
            {buttonLink ? (
              <Link href={buttonLink} passHref legacyBehavior>
                <a className="inline-flex items-center px-6 py-0 text-sm text-white transition-all duration-300 ">{buttonText}</a>
              </Link>
            ) : (
              <span className="inline-flex items-center px-6 py-0 text-sm text-white transition-all duration-300 ">{buttonText}</span>
            )}
            <span className="text-white animate-bounce">
              <FaArrowDown size={20} />
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;