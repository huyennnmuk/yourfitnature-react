import React from 'react';
import { getSuccessStoryBySlug, successStories } from '@/lib/testimonialsData';
import { notFound } from 'next/navigation';
import SuccessStoryClientPage from './SuccessStoryClientPage';

export function generateStaticParams() {
  return successStories.map(story => ({
    slug: story.caseStudySlug,
  }));
}

interface SuccessStoryPageProps {
  params: {
    slug: string;
  };
}

const SuccessStoryPage: React.FC<SuccessStoryPageProps> = ({ params }) => {
  const story = getSuccessStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  return <SuccessStoryClientPage story={story} />;
};

export default SuccessStoryPage;
