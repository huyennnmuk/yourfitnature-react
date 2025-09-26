'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

interface FeedbackPopupProps {
  positionClassName?: string;
  workshopId: string;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ positionClassName = "fixed bottom-20 right-4 z-40", workshopId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <FeedbackModal isOpen={isOpen} onClose={handleClose} workshopId={workshopId} />

      <AnimatePresence>
        {!isOpen && isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={positionClassName}
          >
            <button
              onClick={handleOpen}
              className="group flex items-center justify-center bg-camber-sage-primary text-white rounded-full p-4 shadow-lg hover:bg-camber-sage-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-camber-sage-accent transition-all duration-300"
              aria-label="Leave Feedback"
            >
              <Star size={28} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-sm group-hover:ml-2">
                Leave Feedback
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackPopup;
