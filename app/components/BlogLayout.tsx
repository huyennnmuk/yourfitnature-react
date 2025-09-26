"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { UnifiedPost } from '../../lib/getPosts';

interface BlogLayoutProps {
  initialPosts: UnifiedPost[];
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ initialPosts }) => {
  const [posts] = useState<UnifiedPost[]>(initialPosts);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleControlClick = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (direction === 'prev') {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1));
    } else {
      setActiveIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1));
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

    const isVisible = absOffset <= 1; // Show only the active and immediate neighbors

    const transform = `
      translateX(${offset * 100}px) 
      translateZ(${-absOffset * 300}px) 
      rotateY(${offset * 30}deg)
    `;

    const style: React.CSSProperties = {
      transform,
      zIndex: posts.length - absOffset,
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.7s ease-out',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      pointerEvents: activeIndex === index ? 'auto' : 'none',
    };

    return style;
  }, [activeIndex, posts.length]);

  const latestPosts = posts.slice(0, 3); // Display a limited number of posts in the carousel

  return (
    <section data-section="blogPosts" className="overflow-hidden fitnature-section-bg pb-20">
      <div className="relative mx-auto flex flex-col items-center justify-center">
        
        <div
          ref={carouselRef}
          className="relative w-full max-w-xs md:max-w-md lg:max-w-lg h-[400px] md:h-[450px] lg:h-[500px]"
          style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
        >
          {latestPosts.map((post, index) => (
            <Link 
              href={`/blog/wp/${post.slug}`} 
              key={post.slug} 
              aria-hidden={activeIndex !== index}
              className="skew-card h-full rounded-lg shadow-2xl overflow-hidden group"
              style={getCardStyle(index)}
            >
              <div className="relative w-full h-full">
                {post.featuredImage && (
                  <Image
                    alt={post.altText || post.title}
                    src={post.featuredImage}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="typography-bodyLarge">{post.title}</h3>
                  <div 
                    className="text-md md:text-lg mt-1 line-clamp-2 typography-bodySml text-soil" 
                    dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative z-10 mt-8 flex w-full items-center justify-center gap-12">
          <button
            onClick={() => handleControlClick('prev')}
            className="p-3 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 transition-colors focus:outline-none"
            aria-label="Previous Post"
          >
            <FaArrowLeft className="text-xl text-[var(--camber-text-primary)]" />
          </button>
          
          <div className="flex gap-3 items-center">
            {latestPosts.map((_, index) => (
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
            aria-label="Next Post"
          >
            <FaArrowRight className="text-xl text-[var(--camber-text-primary)]" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default BlogLayout;