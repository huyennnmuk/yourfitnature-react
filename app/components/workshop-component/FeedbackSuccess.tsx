"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import ReusableButton from '../ReusableButton';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface FeedbackSuccessProps {
    onDone: () => void;
}

const FeedbackSuccess: React.FC<FeedbackSuccessProps> = ({ onDone }) => {
  return (
    <motion.section 
        className="bg-camber-background-light/80 backdrop-blur-sm border border-camber-sage-light/30 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto my-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <CheckCircle className="mx-auto h-16 w-16 text-camber-sage-primary" />
        <h2 className="text-3xl font-bold text-camber-text-primary mt-4 mb-2">Thank You!</h2>
        <p className="text-camber-text-secondary mb-8">Your feedback helps us improve our community resources.</p>
        <ReusableButton as="a" href="/community" className="!bg-camber-primary !text-white">Join the Conversation</ReusableButton>
    </motion.section>
  );
};

export default FeedbackSuccess;
