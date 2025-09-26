'use client';
import React from 'react';
import { SuccessStory } from '@/lib/testimonialsData';
import SuccessStoryLayout from '@/app/components/SuccessStoryLayout';

interface SuccessStoryClientPageProps {
  story: SuccessStory;
}

const SuccessStoryClientPage: React.FC<SuccessStoryClientPageProps> = ({ story }) => {
  return <SuccessStoryLayout story={story} />;
};

export default SuccessStoryClientPage;
