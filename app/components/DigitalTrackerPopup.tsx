'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, NotebookPen } from 'lucide-react';
import DigitalTracker from './DigitalTracker';

interface DigitalTrackerPopupProps {
  positionClassName?: string;
}

const DigitalTrackerPopup: React.FC<DigitalTrackerPopupProps> = ({ positionClassName = "fixed bottom-40 right-4 z-40" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white dark:bg-camber-sage-charcoal rounded-2xl shadow-2xl max-w-2xl w-full m-4 relative overflow-hidden border border-gray-200 dark:border-camber-sage-deep flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b border-camber-background-muted dark:border-camber-sage-deep flex justify-between items-center flex-shrink-0">
                <h2 className="typography-h3 text-camber-text-primary dark:text-white">7-Day Bloating Reset Tracker</h2>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors rounded-full hover:bg-camber-background-medium dark:hover:bg-camber-sage-dark"
                  aria-label="Close tracker"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow">
                <DigitalTracker />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMinimized && isButtonVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={positionClassName}
          >
            <button
              onClick={handleOpen}
              className="group flex items-center justify-center bg-camber-primary text-white rounded-full p-4 shadow-lg hover:bg-camber-sage-deep focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-camber-sage-deep transition-all duration-300"
              aria-label="Open 7-Day Tracker"
            >
              <NotebookPen size={28} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-sm group-hover:ml-2">
                Open Tracker
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DigitalTrackerPopup;