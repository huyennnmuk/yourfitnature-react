"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { motion } from 'framer-motion';
import ReusableButton from './ReusableButton';

interface ContentWithImageSectionProps {
  title: string;
  description: string;
  images: string[];
  buttonText?: string;
  buttonLink?: string;
  imageClassName?: string;
  aspectRatio?: string;
  imageFit?: 'cover' | 'contain';
}

const ContentWithImageSection: React.FC<ContentWithImageSectionProps> = ({ title, description, images, buttonText, buttonLink, imageClassName, aspectRatio = 'aspect-square', imageFit = 'cover' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const imageContainerClasses = imageClassName ? `relative ${imageClassName}` : `relative ${aspectRatio} w-full overflow-hidden rounded-2xl shadow-2xl`;


  return (
    <section className="py-12 md:py-20 fitnature-section-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="typography-h1 text-grey text-balance">{title}</h2>
            <p className="typography-body text-soil mt-4">{description}</p>
            {buttonText && buttonLink && (
              <div className="mt-8">
                <ReusableButton as="a" href={buttonLink} className="!bg-perplexity-primary !text-white">
                  {buttonText}
                </ReusableButton>
              </div>
            )}
          </motion.div>

          {/* Right Column: Image Carousel + Dot Nav */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={imageContainerClasses}>
              <div ref={sliderRef} className="keen-slider h-full w-full">
                {images.map((imgSrc, idx) => (
                  <div key={idx} className="keen-slider__slide">
                    <div className="relative h-full w-full">
                      <Image
                        src={imgSrc}
                        alt={`${title} slide ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        className={`object-${imageFit}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {loaded && instanceRef.current && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex justify-center gap-3 bg-black/30 backdrop-blur-sm p-2 rounded-full">
                  {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => instanceRef.current?.moveToIdx(idx)}
                      className={`w-3 h-3 rounded-full border-2 border-white transition-colors duration-200 focus:outline-none ${
                        currentSlide === idx
                          ? 'bg-white'
                          : 'bg-transparent'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    ></button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContentWithImageSection;