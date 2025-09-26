import React from 'react';
import { getAllPosts, getRecentPostsFromWp, UnifiedPost } from '../../lib/getPosts';
import HorizontalCarouselClient from './HorizontalCarouselClient';

interface HorizontalCarouselProps {
  title?: string;
  subtitle?: string;
  mainButtonText?: string;
  source?: 'markdown' | 'wordpress';
}

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = async ({ 
  title,
  subtitle,
  mainButtonText,
  source = 'wordpress',
}) => {
  let posts: UnifiedPost[] = [];
  let error: string | null = null;

  try {
    if (source === 'wordpress') {
      posts = await getRecentPostsFromWp();
    } else {
      posts = getAllPosts();
    }
  } catch (err) {
    console.error(err);
    error = 'Failed to load posts.';
  }

  if (error) {
    return (
      <section className="fitnature-section-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-grey leading-tight">Built for you</h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-grey">Every part of admin, simplified.</p>
          <div className="mt-12 text-lg text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return <HorizontalCarouselClient posts={posts} title={title} subtitle={subtitle} mainButtonText={mainButtonText} />;
};

export default HorizontalCarousel;
