'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { quizData } from '@/lib/quizData';
import NewsletterSignup from './NewsletterSignup';
import DownloadTrackerButton from './DownloadTrackerButton';
import { motion } from 'framer-motion';

const QuizResultsSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-2xl w-full mx-auto my-12 p-8 rounded-lg glass-morphism">
      <div className="animate-pulse">
        <div className="h-8 bg-camber-sage-light rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-camber-sage-light rounded w-full mb-2"></div>
        <div className="h-4 bg-camber-sage-light rounded w-5/6 mb-6"></div>
        <div className="h-6 bg-camber-sage-light rounded w-1/2 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-camber-sage-light rounded"></div>
          <div className="h-4 bg-camber-sage-light rounded"></div>
          <div className="h-4 bg-camber-sage-light rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const QuizResults = () => {
  const searchParams = useSearchParams();
  const resultId = searchParams.get('result');
  const [result, setResult] = useState<(typeof quizData.results)[0] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundResult = quizData.results.find((r) => r.id === resultId);
      setResult(foundResult);
      setLoading(false);
    }, 1500); // Simulate loading
  }, [resultId]);

  if (loading) {
    return <QuizResultsSkeleton />;
  }

  if (!result) {
    return <div>Result not found.</div>; // Handle case where result is not found after loading
  }

return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto my-12 p-8 rounded-2xl glass-morphism text-gray-800 shadow-xl border border-white/20"
      >
      <h2 className="typography-h2 text-gray-800 text-center mb-4">Your Results</h2>
      <p className="typography-bodyLarge text-center mb-8">{result.text}</p>
      <div className="p-6 rounded-xl border border-camber-sage-light/50" style={{ backgroundColor: 'var(--camber-background-muted)' }}>
        <h3 className="typography-h4-sans text-center mb-6">Recommendations</h3>
        <ul className="space-y-4">
        {result.recommendations.map((rec, index) => (
          <motion.li
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
          className="flex items-start"
          >
          <span className="mr-3 mt-1 text-camber-sage-primary">&#10004;</span>
          <span>{rec}</span>
          </motion.li>
        ))}
        </ul>
      </div>
      <div className="flex justify-center my-8 text-center">
        <DownloadTrackerButton className="btn-secondary focus-ring w-full max-w-xs sm:max-w-sm md:max-w-md" />
      </div>
      <NewsletterSignup source="quiz-results" />
      </motion.div>
    </div>
  );
};

export default QuizResults;