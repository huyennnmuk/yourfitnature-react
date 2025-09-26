'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import '../styles/infinite-scroll.css';
import '../styles/3d-card.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReusableButton from './ReusableButton';

interface Testimonial {
  text: string;
  author: string;
  title: string;
  img?: string; 
}

interface SingleTestimonialProductCardProps {
  testimonials: Testimonial[];
  affiliateLink: string;
}

const SingleTestimonialProductCard: React.FC<SingleTestimonialProductCardProps> = ({ testimonials, affiliateLink }) => {
  const [modalData, setModalData] = useState<Testimonial | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleOpenModal = (testimonial: Testimonial) => {
    setModalData(testimonial);
  };

  const handleControlClick = (direction: 'prev' | 'next') => {
    if (!scrollRef.current || isPaused) return;

    const scrollAmount = 300; // Adjust scroll amount as needed
    setIsPaused(true);
    if (direction === 'prev') {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    setTimeout(() => {
      setIsPaused(false);
    }, 500); // Pause for 0.5 seconds to prevent rapid clicking
  };

  const handleCloseModal = useCallback(() => {
    setModalData(null);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  useEffect(() => {
    if (modalData) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalData, handleKeyDown]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section data-section="testimonialCards" className="w-full flex flex-col items-center justify-center py-16 py-20">
      <div className="relative w-full max-w-7xl flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="scroller w-full overflow-hidden" ref={scrollRef}>
          <div className="scroller__inner flex">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="card-3d-container mx-2 sm:mx-4" onClick={() => handleOpenModal(t)} style={{ cursor: 'pointer' }}>
                <div
                  className="card-3d flex flex-col justify-between bg-[#f6f7f3]/80 border border-[#e6e7e2] shadow-none rounded-[32px] p-6 sm:p-8 md:p-10 min-h-[380px] sm:min-h-[420px] w-[300px] sm:w-[350px] md:w-[420px] max-w-full transition-colors duration-500 hover:bg-[#f6f7f3]"
                >
                  <p className="typography-bodyLarge mb-10 block text-pretty" style={{wordBreak:'break-word'}}>
                    {t.text}
                    <span className="text-perplexity-primary font-semibold text-sm ml-1 transition-colors">
                        {' '}Read more...
                    </span>
                  </p>
                  <div className="flex w-full justify-between items-end mt-auto">
                    <span className="text-[#444] text-sm sm:text-base font-medium whitespace-pre-wrap">
                      {t.author}
                      {t.title && <br />}
                      {t.title && <span className="text-[#888] text-xs sm:text-sm font-normal">{t.title}</span>}
                    </span>
                    {t.img && (
                        <Image
                            alt={t.author}
                            loading="lazy"
                            width={48}
                            height={48}
                            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-[#e6e7e2] shadow"
                            src={t.img}
                            style={{ color: 'transparent' }}
                        />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-8 flex w-full items-center justify-center gap-12">
            <button
            onClick={() => handleControlClick('prev')}
            className="p-3 rounded-full bg-camber-background-light/80 border border-camber-sage-light text-camber-sage-primary hover:bg-camber-background-light focus:outline-none focus:ring-2 focus:ring-camber-sage-light transition-colors dark:bg-camber-sage-charcoal/50 dark:border-camber-sage-deep dark:text-camber-sage-light dark:hover:bg-camber-sage-charcoal"
            aria-label="Previous Testimonial"
            >
            <FaArrowLeft className="text-xl" />
            </button>
            
            <button
            onClick={() => handleControlClick('next')}
            className="p-3 rounded-full bg-camber-background-light/80 border border-camber-sage-light text-camber-sage-primary hover:bg-camber-background-light focus:outline-none focus:ring-2 focus:ring-camber-sage-light transition-colors dark:bg-camber-sage-charcoal/50 dark:border-camber-sage-deep dark:text-camber-sage-light dark:hover:bg-camber-sage-charcoal"
            aria-label="Next Testimonial"
            >
            <FaArrowRight className="text-xl" />
            </button>
        </div>
        <div className="w-full flex justify-center mt-12">
            <ReusableButton as="a" href={affiliateLink} size="lg">
                Check Out Product
            </ReusableButton>
        </div>
      </div>

      {modalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
          ref={modalRef}
        >
          <div
            className="bg-[#f6f7f3]/80 dark:bg-camber-sage-charcoal rounded-2xl p-8 max-w-lg w-full shadow-2xl relative transform transition-all duration-300 scale-95 opacity-0 animate-modal-open"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-camber-sage-muted hover:text-camber-sage-primary dark:text-camber-sage-light dark:hover:text-white text-3xl leading-none transition-colors"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="flex flex-col items-center text-center">
              {modalData.img && (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-camber-sage-deep shadow-lg mb-6">
                  <Image
                    src={modalData.img}
                    alt={modalData.author}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="font-bold text-2xl text-camber-text-primary dark:text-white mb-1">
                {modalData.author}
              </h3>
              {modalData.title && (
                <p className="text-md text-camber-text-secondary dark:text-camber-sage-light mb-4">
                  {modalData.title}
                </p>
              )}
              <p className="text-lg text-camber-text-primary dark:text-gray-300 leading-relaxed">
                {modalData.text}
                <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="text-camber-sage-primary dark:text-camber-sage-accent font-semibold text-sm ml-1 transition-colors hover:underline">
                    {' '}Buy Product
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes modal-open {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-open {
          animation: modal-open 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SingleTestimonialProductCard;