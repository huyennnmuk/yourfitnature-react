'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag } from 'react-icons/fa';
import Link from 'next/link';

interface FloatingAffiliateLinkButtonProps {
  affiliateLink: string;
  productName?: string;
}

const FloatingAffiliateLinkButton: React.FC<FloatingAffiliateLinkButtonProps> = ({ affiliateLink, productName = 'recommended product' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // Show button after scrolling down a bit
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

  if (!affiliateLink) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          // Positioned above the ScrollToTopButton (which is typically at bottom-4)
          className="fixed bottom-20 right-4 z-40"
        >
          <Link href={affiliateLink} passHref legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center bg-camber-sage-primary text-white rounded-full p-4 shadow-lg hover:bg-camber-sage-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-camber-sage-accent transition-all duration-300"
              aria-label={`Purchase ${productName}`}
            >
              <FaShoppingBag size={24} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-sm group-hover:ml-2">
                Purchase Now
              </span>
            </a>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingAffiliateLinkButton;
