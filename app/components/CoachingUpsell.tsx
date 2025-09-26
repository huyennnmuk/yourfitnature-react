import React from 'react';
import Link from 'next/link';
import ReusableButton from './ReusableButton';
import { HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const CoachingUpsell = () => {
  return (
    <motion.div 
      className="p-8 bg-glass-bg rounded-2xl shadow-lg border border-camber-background-muted text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex justify-center items-center mb-4">
        <HeartHandshake className="w-12 h-12 text-camber-sage-primary" />
      </div>
      <h3 className="typography-h3 text-camber-text-primary">Need More Personalized Support?</h3>
      <p className="mt-2 text-camber-text-secondary max-w-2xl mx-auto">
        If you&apos;re feeling stuck or want a deeply personalized plan, our one-on-one coaching can help you get to the root of your issues faster.
      </p>
      <div className="mt-6">
        <ReusableButton as="a" href="/coaching" className="!bg-camber-primary !text-white hover:!bg-camber-sage-deep transition-colors">
            Learn More About Coaching
        </ReusableButton>
      </div>
    </motion.div>
  );
};

export default CoachingUpsell;

