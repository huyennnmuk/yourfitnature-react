"use client";

import Image from 'next/image';
import React from 'react';
import { UnifiedPost } from '../../lib/getPosts';

interface HorizontalCarouselClientProps {
  posts: UnifiedPost[];
  title?: string;
  subtitle?: string;
  mainButtonText?: string;
  
}

const HorizontalCarouselClient: React.FC<HorizontalCarouselClientProps> = ({ 
  posts,
  title = "Tailored Gut Solutions",
  subtitle = "Discover wellness routines designed to fit your unique needs and lifestyle.",
  mainButtonText = "See All Posts",
}) => {
  return (
    <section data-section="horizontalCarousel" className="fitnature-section-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-1 pb-4 pt-6 text-center">
          <h2 className="typography-h1 mb-4 text-center text-grey">
            {title}
          </h2>
          <p className="typography-body mb-8 text-center text-grey">
            {subtitle}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug} className="group relative flex h-full flex-col gap-6">
              <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-80 lg:aspect-w-1 lg:aspect-h-1">
                <Image
                  src={post.featuredImage || '/YourFitNature.svg'}
                  alt={post.altText}
                  width={500}
                  height={500}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 640px, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="typography-bodyLarge text-pretty text-grey">
                <a href={`/blog/${post.slug}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
                <div className="typography-bodySml text-soil">
                {post.excerpt
                  .replace(/<[^>]+>/g, '') // Remove HTML tags
                  .split(' ')
                  .slice(0, 25)
                  .join(' ')
                  .concat(post.excerpt.replace(/<[^>]+>/g, '').split(' ').length > 30 ? '...' : '')
                }
                </div>
              <div className="mt-4">
                <a
                  href={`/blog/${post.slug}`}
                  className="bg-[var(--camber-secondary)] text-[var(--camber-sage-charcoal)] px-8 py-3 rounded-full font-semibold btn-secondary text-grey inline-flex items-center"
                >
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
              href="/blog"
              className="bg-[var(--camber-secondary)] text-[var(--camber-sage-charcoal)] px-8 py-3 rounded-full font-semibold btn-secondary text-grey inline-flex items-center"
            >
              {mainButtonText}
            </a>
        </div>
      </div>
    </section>
  );
};

export default HorizontalCarouselClient;
