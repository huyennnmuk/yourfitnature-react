"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useFeedbackForm } from '../../hooks/useFeedbackForm';
import FeedbackForm from './FeedbackForm';
import FeedbackSuccess from './FeedbackSuccess';
import FeedbackError from './FeedbackError';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshopId: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, workshopId }) => {
  const {
    formState,
    status,
    handleChange,
    setRating,
    handleSubmit,
    isSubmitDisabled,
    setStatus,
  } = useFeedbackForm({ workshopId });

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white sm:rounded-2xl shadow-xl w-full h-full sm:h-auto sm:max-w-lg p-6 sm:p-8 relative overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
          
          <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-camber-text-primary">Share Your Experience</h2>
              <p className="text-camber-text-secondary">Help us grow by sharing your feedback on the workshop.</p>
          </div>

          {status === 'success' && <FeedbackSuccess onDone={onClose} />}
          {status === 'error' && <FeedbackError onRetry={() => setStatus('idle')} />}
          {status !== 'success' && status !== 'error' && (
            <FeedbackForm
              formState={formState}
              status={status}
              isSubmitDisabled={isSubmitDisabled}
              handleChange={handleChange}
              setRating={setRating}
              handleSubmit={handleSubmit}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
