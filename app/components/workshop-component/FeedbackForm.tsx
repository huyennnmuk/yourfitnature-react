"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import ReusableButton from '../ReusableButton';
import FormField from '../form/FormField';
import { FeedbackFormState } from '../../hooks/useFeedbackForm';

interface FeedbackFormProps {
  formState: FeedbackFormState;
  status: 'idle' | 'submitting' | 'success' | 'error';
  isSubmitDisabled: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setRating: (rating: number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  formState,
  status,
  isSubmitDisabled,
  handleChange,
  setRating,
  handleSubmit,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const { rating, message, name, isPrivate } = formState;

  return (
    <motion.section 
        className="glass-bg border border-camber-sage-light/30 rounded-2xl shadow-xl p-6 sm:p-8 max-w-2xl mx-auto my-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-center font-semibold text-camber-text-primary mb-4">
            How would you rate this workshop?
          </p>
          <div className="flex justify-center items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-camber-sage-accent"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star
                  className={`w-8 h-8 transition-colors duration-200 ${
                    (hoverRating || rating) >= star
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-camber-background-muted'
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>
        
        <div>
            <label htmlFor="feedback-message" className="block text-sm font-medium text-camber-text-secondary mb-1 text-center">
                Your Story Matters <span className="text-red-500">*</span>
            </label>
            <textarea
                id="feedback-message"
                name="message"
                rows={5}
                className="w-full p-3 bg-white/50 border border-camber-background-muted rounded-lg focus:ring-2 focus:ring-camber-sage-primary focus:border-camber-sage-primary transition-shadow duration-200"
                placeholder="What was your biggest 'aha' moment? How has this workshop helped you?"
                value={message}
                onChange={handleChange}
                required
            />
        </div>

        <FormField
            id="feedback-name"
            name="name"
            label="Your Name / Initials"
            value={name}
            onChange={handleChange}
            placeholder="e.g., Jane D. or Anonymous"
        />

        <div className="flex items-center justify-center">
            <input
                id="feedback-private"
                name="isPrivate"
                type="checkbox"
                className="h-4 w-4 rounded border-camber-background-muted text-camber-sage-primary focus:ring-camber-sage-primary"
                checked={isPrivate}
                onChange={handleChange}
            />
            <label htmlFor="feedback-private" className="ml-3 block text-sm text-camber-text-secondary">
                Keep my testimonial private.
            </label>
        </div>

        <div className="text-center pt-4">
            <ReusableButton
                type="submit"
                disabled={isSubmitDisabled}
                className=" flex justify-center justify-self-center
                !bg-perplexity-primary !text-white disabled:!bg-camber-sage-light w-full sm:w-auto"
            >
                <Send className="w-5 h-5 mr-2 -ml-1" />
                {status === 'submitting' ? 'Submitting...' : 'Submit My Feedback'}
            </ReusableButton>
        </div>
      </form>
    </motion.section>
  );
};

export default FeedbackForm;
