"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import type { Product } from '../../lib/getProducts';

interface StackedCarouselClientProps {
  products: Product[];
  size?: 'small' | 'medium' | 'large';
  maxItems?: number;
  displayPrice?: boolean;
}

const StackedCarouselClient: React.FC<StackedCarouselClientProps> = ({ products = [], size = 'medium', maxItems, displayPrice = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const sizeConfig = {
    small: {
      container: 'h-[300px] md:h-[350px] lg:h-[400px] max-w-[200px] md:max-w-xs lg:max-w-sm',
      translateX: 80,
      sizes: '(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw',
    },
    medium: {
      container: 'h-[400px] md:h-[450px] lg:h-[500px] max-w-xs md:max-w-md lg:max-w-lg',
      translateX: 100,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    },
    large: {
      container: 'h-[500px] md:h-[550px] lg:h-[600px] max-w-sm md:max-w-lg lg:max-w-xl',
      translateX: 120,
      sizes: '(max-width: 768px) 120vw, (max-width: 1200px) 60vw, 40vw',
    },
  };

  const currentSizeConfig = sizeConfig[size];

  const itemsToDisplay = maxItems ? products.slice(0, maxItems) : products;

  const handleControlClick = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (direction === 'prev') {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? itemsToDisplay.length - 1 : prevIndex - 1));
    } else {
      setActiveIndex((prevIndex) => (prevIndex === itemsToDisplay.length - 1 ? 0 : prevIndex + 1));
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 700); // Match CSS transition
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getCardStyle = useCallback((index: number) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    const isVisible = absOffset <= 1;

    const transform = `
      translateX(${offset * currentSizeConfig.translateX}px) 
      translateZ(${-absOffset * 300}px) 
      rotateY(${offset * 30}deg)
    `;

    const style: React.CSSProperties = {
      transform,
      zIndex: itemsToDisplay.length - absOffset,
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.7s ease-out',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      pointerEvents: activeIndex === index ? 'auto' : 'none',
    };

    return style;
  }, [activeIndex, itemsToDisplay.length, currentSizeConfig.translateX]);

  return (
    <section data-section="stackedCarousel" className="overflow-hidden fitnature-section-bg">
      <div className="relative mx-auto flex flex-col items-center justify-center">
        <div
          ref={carouselRef}
          className={`relative w-full ${currentSizeConfig.container}`}
          style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
        >
          {itemsToDisplay.map((item, index) => (
            <Link 
              href={item.permalink || '#'} 
              key={item.id} 
              aria-hidden={activeIndex !== index}
              className="skew-card h-full rounded-lg shadow-2xl overflow-hidden group"
              style={getCardStyle(index)}
            >
              <div className="relative w-full h-full">
                {item.images?.[0] && (
                  <Image
                    alt={item.images[0].alt || item.name}
                    src={item.images[0].src}
                    fill
                    sizes={currentSizeConfig.sizes}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                  <h3 className="typography-bodyLarge">{item.name}</h3>
                  {displayPrice && <p className="text-md md:text-lg font-semibold mt-1 typography-bodySml text-soil">${item.price}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative z-10 mt-8 flex w-full items-center justify-center gap-12">
          <button
            onClick={() => handleControlClick('prev')}
            className="p-3 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 transition-colors focus:outline-none"
            aria-label="Previous Product"
          >
            <FaArrowLeft className="text-xl text-[var(--camber-text-primary)]" />
          </button>
          
          <div className="flex gap-3 items-center">
            {itemsToDisplay.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-6 bg-[var(--camber-sage-charcoal)]'
                    : 'w-2.5 bg-[var(--camber-sage-light)] hover:bg-[var(--camber-sage-charcoal)]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleControlClick('next')}
            className="p-3 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 transition-colors focus:outline-none"
            aria-label="Next Product"
          >
            <FaArrowRight className="text-xl text-[var(--camber-text-primary)]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StackedCarouselClient;