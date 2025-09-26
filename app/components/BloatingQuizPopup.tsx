'use client';

import React, { useState, useEffect } from 'react';
import { quizData } from '@/lib/quizData';
import { motion, AnimatePresence } from 'framer-motion';
import {X, ClipboardCheck, FileQuestion} from 'lucide-react';
import Link from 'next/link';
import ReusableButton from './ReusableButton';

interface BloatingQuizPopupProps {
  positionClassName?: string;
}

const BloatingQuizPopup: React.FC<BloatingQuizPopupProps> = ({ positionClassName = "fixed bottom-24 right-4 z-40" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenBloatingQuizPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenBloatingQuizPopup', 'true');
      }, 5000); // 5 second delay
      return () => clearTimeout(timer);
    } else {
      setIsMinimized(true);
    }
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  };

  useEffect(() => {
    if (isMinimized) {
      window.addEventListener('scroll', toggleVisibility);
      toggleVisibility();
    }
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [isMinimized]);

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const firstQuestion = quizData.questions[0];

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
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full m-4 relative overflow-hidden border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close quiz popup"
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <div className="flex justify-center items-center mb-4">
                    <ClipboardCheck className="text-camber-sage-accent mr-2" size={32} />
                    <h2 className="typography-h1 gradient-text">
                        Bloating Quiz
                    </h2>
                </div>
                <p className="text-gray-500 mb-6 text-lg">
                  {firstQuestion.text}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-8">
                {firstQuestion.answers.map((answer) => (
                  <button
                    key={answer.value}
                    className="btn-secondary bg-camber-sage-lightest hover:bg-camber-sage-light transition-colors duration-200 text-left"
                  >
                    {answer.text}
                  </button>
                ))}
              </div>

              <Link href="/bloating-breakthrough-blueprint/bloating-quiz" passHref>
                <ReusableButton
                  className="w-full !py-4 !text-lg"
                  onClick={handleClose}
                >
                  Take the Full Quiz
                </ReusableButton>
              </Link>
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
              className="group flex items-center justify-center bg-camber-sage-primary text-white rounded-full p-4 shadow-lg hover:bg-camber-sage-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-camber-sage-accent transition-all duration-300"
              aria-label="Open bloating quiz"
            >
              <FileQuestion size={28} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-sm group-hover:ml-2">
                Take the Quiz
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BloatingQuizPopup;
