'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/blog-post.css';
import { AffiliateProduct } from '@/lib/OneCentralAffiliateDatabase';


interface AffiliatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  products: AffiliateProduct[];
}

const AffiliatePopup: React.FC<AffiliatePopupProps> = ({ isOpen, onClose, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 font-sans backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-[var(--blog-background)] rounded-lg shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-2xl relative transform transition-all duration-300 scale-95 opacity-0 animate-modal-open"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-[var(--perplexity-hr)]">
          <h2 className="text-lg font-bold text-[var(--perplexity-heading)]">Recommended Products</h2>
          <button onClick={onClose} className="text-2xl text-[var(--perplexity-muted)] hover:text-[var(--perplexity-heading)]">&times;</button>
        </div>

        <div className="p-6">
          <div className="relative">
            <div className="overflow-hidden relative h-96">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out ${currentIndex === index ? 'transform-none opacity-100' : 'opacity-0 ' + (index > currentIndex ? 'translate-x-full' : '-translate-x-full')}`}
                >
                  <article className="flex flex-col items-center justify-center h-full text-center">
                    <div className="relative w-full h-48 mb-4">
                      <Image src={product.imageUrl || ''} alt={product.name} layout="fill" objectFit="contain" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--perplexity-heading)]">{product.name}</h3>
                    <p className="text-sm text-[var(--perplexity-muted)] my-2">{product.description}</p>
                    {product.price && <p className="font-semibold text-lg text-[var(--perplexity-primary)]">{product.price}</p>}
                    <a 
                      href={product.url} 
                      target="_blank" 
                      rel={product.rel || 'noopener noreferrer'}
                      className="mt-4 px-6 py-2 rounded-full bg-[var(--perplexity-primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      View on Store
                    </a>
                  </article>
                </div>
              ))}
            </div>
            {products.length > 1 && (
              <>
                <button onClick={handlePrev} className="carousel-button absolute top-1/2 left-2 -translate-y-1/2"><FaArrowLeft /></button>
                <button onClick={handleNext} className="carousel-button absolute top-1/2 right-2 -translate-y-1/2"><FaArrowRight /></button>
              </>
            )}
          </div>
        </div>

        <div className="p-4 text-xs text-center text-[var(--perplexity-muted)] border-t border-[var(--perplexity-hr)]">
          As an affiliate, the site may earn from qualifying purchases. Read the full disclosure in the footer.
        </div>
      </div>
      <style jsx>{`
        @keyframes modal-open {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-open {
          animation: modal-open 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AffiliatePopup;



