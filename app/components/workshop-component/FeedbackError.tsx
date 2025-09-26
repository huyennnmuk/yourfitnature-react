"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import ReusableButton from '../ReusableButton';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface FeedbackErrorProps {
    onRetry: () => void;
}

const FeedbackError: React.FC<FeedbackErrorProps> = ({ onRetry }) => {
  return (
    <motion.section 
        className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto my-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
        <h2 className="text-3xl font-bold text-red-800 mt-4 mb-2">Something Went Wrong</h2>
        <p className="text-red-700 mb-8">We couldn&apos;t submit your feedback. Please try again later.</p>
        <ReusableButton onClick={onRetry} className="!bg-red-600 !text-white hover:!bg-red-700">Try Again</ReusableButton>
    </motion.section>
  );
};

export default FeedbackError;
