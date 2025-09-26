
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { sliderData as defaultSliderData } from '../../lib/sliderData';
import ReusableButton from './ReusableButton';

interface Feature {
  text: string;
  icon: string;
}

type ContentType = 'image' | 'text' | 'features';

interface ContentLayout {
  direction?: 'row' | 'column';
  order?: ContentType[];
}

interface Slide {
  title: string;
  description: string;
  imageUrl: string;
  features: (string | Feature)[];
  ctaLink?: string;
  ctaText?: string;
  /**
   * Controls the layout of the slide content.
   * `direction`: 'row' or 'column'. Defaults to 'column'.
   * `order`: An array of 'image', 'text', 'features', 'cta' to control the order of elements.
   * Defaults to ['image', 'text', 'features', 'cta'].
   */
  contentLayout?: ContentLayout;
}

interface VerticalSliderProps {
  slides?: Slide[];
  imageWidth?: number;
  imageHeight?: number;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ slides, imageWidth = 420, imageHeight = 320 }) => {
  const sliderData = slides || (defaultSliderData as Slide[]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const sliderTop = sliderRef.current.offsetTop;
        const sliderHeight = sliderRef.current.offsetHeight;
        const scrollY = window.scrollY + window.innerHeight / 2;
        const slideHeight = sliderHeight / sliderData.length;
        const newActiveSlide = Math.floor((scrollY - sliderTop) / slideHeight);
        setActiveSlide(Math.max(0, Math.min(sliderData.length - 1, newActiveSlide)));
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [sliderData.length]);

  return (
    <section className="relative w-full overflow-hidden py-12" ref={sliderRef}>
      {sliderData.map((slide, index) => {
        const offset = index - activeSlide;
        const isActive = index === activeSlide;

        const desktopTransform = `translateY(${offset * 60}px) translateZ(${isActive ? '60px' : '0px'}) rotateY(${offset * 18}deg) scale(${isActive ? 1 : 0.92})`;
        const mobileTransform = `translateY(${offset * 30}px) scale(${isActive ? 1 : 0.95})`;

        const order = slide.contentLayout?.order || ['text', 'image', 'features'];
        const direction = slide.contentLayout?.direction || 'row';

        const contentMap = {
          image: (
            <div key="image" className="flex-1 flex justify-center items-center p-4">
              <Image src={slide.imageUrl} alt={slide.title} width={imageWidth} height={imageHeight} className="rounded-2xl shadow-lg max-w-full h-auto" />
            </div>
          ),
          text: (
            <div key="text" className="flex-1 p-4 text-center lg:text-left lg:max-w-[260px]">
              <h2 className='text-3xl lg:text-4xl font-bold text-grey mb-4'>{slide.title}</h2>
              <p className="text-grey text-base">{slide.description}</p>
            </div>
          ),
          features: slide.features && slide.features.length > 0 && (
            <div key="features" className="flex-1 p-4 ">
              <h3 className="text-xl font-bold mb-4 text-grey text-center lg:text-left">Features</h3>
              <ul className="list-none p-0 flex flex-wrap gap-2 justify-center lg:justify-start">
                {slide.features.map((feature, i) => {
                  if (typeof feature === 'string') {
                    return <li key={i} className="bg-camber-background-muted text-sm rounded-xl py-2 px-4 shadow-sm">{feature}</li>;
                  }
                  return (
                    <li key={i} className="bg-camber-background-muted text-grey text-sm rounded-xl py-2 px-4 shadow-sm flex items-center gap-2">
                      <span className="text-lg">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ),
        };

        return (
          <div
            key={index}
            className={`group flex flex-col items-center justify-center p-5 min-h-[70vh] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]`}
            style={{
              opacity: isActive ? 1 : 0.5,
              transform: isMobile ? mobileTransform : desktopTransform,
              zIndex: isActive ? 2 : 1,
              filter: isActive ? 'blur(0px)' : 'blur(2px)',
            }}
          >
            <div
              className={`relative w-full max-w-6xl rounded-3xl border border-white/20 shadow-xl backdrop-blur-md p-6 flex flex-col items-center gap-6 
                ${direction === 'row' ? 'lg:flex-row' : ''}
              `}
            >
              {order.map(type => contentMap[type])}
              {slide.ctaLink && slide.ctaText && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ReusableButton className="bg-perplexity-primary !text-white !no-underline hover:bg-perplexity-primary-dark" as="a" href={slide.ctaLink}>
                    {slide.ctaText}
                  </ReusableButton>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default VerticalSlider;


