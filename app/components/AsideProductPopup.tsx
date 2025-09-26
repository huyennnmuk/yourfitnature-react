'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import ReusableButton from './ReusableButton';

import { Product } from '@/lib/getProducts';

interface SuccessProductPopupProps {
  products: Product[];
  positionClassName?: string;
}

const SuccessProductPopup: React.FC<SuccessProductPopupProps> = ({ products, positionClassName = "fixed bottom-40 right-4 z-40" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenSuccessProductPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenSuccessProductPopup', 'true');
      }, 10000); // 10 second delay
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
                aria-label="Close popup"
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <div className="flex justify-center items-center mb-4">
                    <ShoppingCart className="text-camber-sage-accent mr-2" size={32} />
                    <h2 className="typography-h1 gradient-text">
                        Featured Products
                    </h2>
                </div>
              </div>

              <ul className="space-y-6">
                {products.map((product) => (
                  <li key={product.name} className="flex flex-col items-start">
                    <div className="flex items-center mb-3">
                      {product.images && product.images[0] && (
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full bg-camber-background-medium mr-3"
                        />
                      )}
                      <h3 className="text-md font-semibold leading-6 text-camber-text-primary">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-sm leading-6 text-camber-text-secondary mb-4">{product.shortDescription}</p>
                    <ReusableButton as="a" href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="!bg-camber-primary text-center !text-white !py-2 !px-4 !text-sm !w-full hover:!bg-camber-sage-deep transition-colors duration-300">
                      Buy Now
                    </ReusableButton>
                  </li>
                ))}
              </ul>
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
              aria-label="Open featured products"
            >
              <ShoppingCart size={28} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-sm group-hover:ml-2">
                Featured Products
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SuccessProductPopup;