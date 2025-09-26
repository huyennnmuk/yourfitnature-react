'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';
import { carouselContent } from '../../lib/carouselData';
import ReusableButton from './ReusableButton';

interface StickyCarouselProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  showCarousel?: boolean;
}

const StickyCarousel: React.FC<StickyCarouselProps> = ({
  title = "Find your strength with FitNature",
  subtitle = "We sort through the clutter of gut products so you don’t have to.",
  buttonText = "Find Your Gut Solution",
  buttonLink = "/shop",
  showCarousel = true,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollTimeout = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (scrollTimeout.current) return;

    setActiveSlide(prev => {
      const next = e.deltaY > 0
        ? (prev + 1) % carouselContent.length
        : (prev - 1 + carouselContent.length) % carouselContent.length;
      return next;
    });

    scrollTimeout.current = window.setTimeout(() => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = null;
    }, 600);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    if (scrollTimeout.current) {
      
      scrollTimeout.current = null;
    }
    setActiveSlide(index);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);
 
  

    return (
        <div className="relative">
        <div className="absolute inset-0 bg-transparent backdrop-blur-xl z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-transparent backdrop-blur-xl z-10 pointer-events-none"></div>
        

        <section
        data-section="stickyCarousel"
        className="fitnature-section-bg py-12 md:py-20 -mt-20 relative z-10 mx-8 rounded-t shadow-t-lg border-transparent"
        >
    

  
            <div className="relative z-1">
              <div className="flex flex-col items-center gap-1 pb-4 pt-6 text-center">
                <h2 className="hidden md:block typography-h2 mb-4 text-center text-grey">
                {title}
                </h2>
                <p className="hidden md:block typography-body mb-8 text-center text-grey">
                {subtitle}
                </p>
            </div>

              {showCarousel && (
                <div id="carousel-wrapper" className="relative flex justify-center items-center h-[70svh] max-h-[450px] sm:max-h-[550px] md:max-h-[600px] w-full px-4">
                  <div ref={carouselRef} className="stack relative h-full w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-visible">
                      <div
                          className="absolute inset-0 bg-no-repeat bg-center bg-contain pointer-events-none"
                          style={{
                              backgroundImage: `url('https://www.camber.health/_next/static/media/background.de0d8c59.svg')`,
                              zIndex: 0,
                          }}></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-3xl pointer-events-none" style={{ zIndex: 1 }}></div>

                      {carouselContent.map((item, index) => (
                          <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                              {item.svg1 && (
                                  <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
                                      {typeof item.svg1 === 'string' && item.svg1.startsWith('/') ? <Image src={item.svg1} alt="" className="w-full h-full object-contain" fill sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px" /> : <span dangerouslySetInnerHTML={{ __html: item.svg1 }} />}
                                  </div>
                              )}
                              {item.svg2 && (
                                  <div className="absolute bottom-[20%] right-[20%] translate-x-1/2 translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
                                      {typeof item.svg2 === 'string' && item.svg2.startsWith('/') ? <Image src={item.svg2} alt="" className="w-full h-full object-contain" fill sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px" /> : <span dangerouslySetInnerHTML={{ __html: item.svg2 }} />}
                                  </div>
                              )}
                              {item.svg3 && (
                                  <div className="absolute top-[20%] right-[20%] translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
                                      {typeof item.svg3 === 'string' && item.svg3.startsWith('/') ? <Image src={item.svg3} alt="" className="w-full h-full object-contain" fill sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px" /> : <span dangerouslySetInnerHTML={{ __html: item.svg3 }} />}
                                  </div>
                              )}
                              {item.svg4 && (
                                  <div className="absolute bottom-[20%] left-[20%] -translate-x-1/2 translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
                                      {typeof item.svg4 === 'string' && item.svg4.startsWith('/') ? <Image src={item.svg4} alt="" className="w-full h-full object-contain" fill sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px" /> : <span dangerouslySetInnerHTML={{ __html: item.svg4 }} />}
                                  </div>
                              )}
                              {item.svg5 && (
                                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
                                      {typeof item.svg5 === 'string' && item.svg5.startsWith('/') ? <Image src={item.svg5} alt="" className="w-full h-full object-contain" fill sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px" /> : <span dangerouslySetInnerHTML={{ __html: item.svg5 }} />}
                                  </div>
                              )}
                              {item.svg6 && (
                                  <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
                                      {typeof item.svg6 === 'string' && item.svg6.startsWith('/') ? <Image src={item.svg6} alt="" className="w-full h-full object-contain" fill sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px" /> : <span dangerouslySetInnerHTML={{ __html: item.svg6 }} />}
                                  </div>
                              )}
                          </div>
                      ))}

                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                          <div className="flex-grow flex flex-col items-center justify-center gap-1 w-full">
                              {carouselContent.map((item, index) => (
                                  <div
                                      key={index}
                                      className="absolute inset-0 transition-opacity duration-500"
                                      style={{ opacity: activeSlide === index ? 1 : 0, pointerEvents: activeSlide === index ? 'auto' : 'none' }}
                                  >
                                      <div className="relative w-full h-full flex items-center justify-center text-[#676767]">
                                          <div className="flex flex-col items-center justify-center gap-1" style={{ opacity: 1 }}>
                                              <h2 className="typography-label font-bold max-w-[calc(100vw-40px)] text-balance text-center">
                                                  {item.title}
                                              </h2>
                                              <p className="typography-h1 relative max-w-[calc(100vw-40px)] text-balance text-center md:max-w-[18ch]">
                                                  {item.description}
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                          <div className="flex w-full justify-center gap-2 mt-4 z-20 pointer-events-auto">
                              {carouselContent.map((_, index) => (
                                  <button
                                      key={index}
                                      onClick={() => handleDotClick(index)}
                                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                          index === activeSlide
                                          ? 'bg-[var(--camber-sage-charcoal)]'
                                          : 'bg-[var(--camber-sage-light)]'
                                      }`}
                                      aria-label={`Go to slide ${index + 1}`}
                                  />
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
              )}
              <div className="text-center mt-16">
                {buttonLink ? (
                    <ReusableButton as="a" href={buttonLink} className="btn-secondary text-grey">
                        {buttonText}
                    </ReusableButton>
                ) : (
                    <ReusableButton type="button" className="btn-secondary text-grey">
                        {buttonText}
                    </ReusableButton>
                )}
              </div>
            </div>
          </section>
        </div>
    );
    
};

export default StickyCarousel;
