import React from 'react';
import { getRecentPostsFromWp } from '../../lib/getPosts';
import BlogLayout from './BlogLayout';
import { UnifiedPost } from '../../lib/getPosts';

const BlogPostsServerWrapper = async () => {
  let posts: UnifiedPost[] = [];
  let error: string | null = null;

  try {
    posts = await getRecentPostsFromWp();
  } catch (err) {
    console.error('Failed to fetch blog posts:', err);
    error = 'Failed to load blog posts.';
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-grey leading-tight">Our Blog</h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-grey">Latest insights and articles.</p>
          <div className="mt-12 text-lg text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return <BlogLayout initialPosts={posts} />;
};

export default BlogPostsServerWrapper;
