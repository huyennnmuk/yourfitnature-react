"use client";
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import React from 'react';


interface ScrollToTopButtonProps {
  positionClassName?: string;
}
const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ 
  positionClassName = 'fixed bottom-4 right-4 z-50' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`group ${positionClassName} flex items-center justify-center rounded-full !p-4 btn-secondary text-grey shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } hover:bg-[var(--camber-sage-accent)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--camber-sage-accent)]`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-xs group-hover:ml-2">
        Scroll to Top
      </span>
    </button>
  );
};

export default ScrollToTopButton;