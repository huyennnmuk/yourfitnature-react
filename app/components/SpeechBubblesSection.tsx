'use client'

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { bubbles } from "@/lib/bubbleData";

const SpeechBubblesSection: React.FC = () => {
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = useCallback(() => {
    setModalIdx(null);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  useEffect(() => {
    if (modalIdx !== null) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIdx, handleKeyDown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredIdx((prevIdx) => (prevIdx === null ? 0 : (prevIdx + 1) % bubbles.length));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const bubblePositions = [
    {
      figureClass: "lg:absolute lg:left-[5%] lg:top-[5%] lg:rotate-[-15deg] hover:!rotate-[-5deg] hover:!scale-110",
      flexDirection: "flex-col lg:flex-row",
      avatarClass: "mb-4 lg:-mr-8",
    },
    {
      figureClass: "lg:absolute lg:right-[5%] lg:top-[10%] lg:rotate-[10deg] hover:!rotate-[0deg] hover:!scale-110",
      flexDirection: "flex-col lg:flex-row-reverse",
      avatarClass: "mb-4 lg:-ml-8",
    },
    {
      figureClass: "lg:absolute lg:left-[10%] lg:bottom-[10%] lg:rotate-[-10deg] hover:!rotate-[0deg] hover:!scale-110",
      flexDirection: "flex-col lg:flex-row",
      avatarClass: "mb-4 lg:-mr-8",
    },
    {
      figureClass: "lg:absolute lg:right-[10%] lg:bottom-[5%] lg:rotate-[15deg] hover:!rotate-[5deg] hover:!scale-110",
      flexDirection: "flex-col lg:flex-row-reverse",
      avatarClass: "mb-4 lg:-ml-8",
    },
  ];

  return (
    <section
      className="w-full min-h-screen py-16 px-4 flex flex-col items-center justify-center overflow-hidden"
      aria-label="Testimonials"
    >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
            <h2 className="typography-h2 text-grey text-pretty">What People Are Saying</h2>
            <p className="text-base sm:text-lg text-grey max-w-2xl">Real stories from people who have found relief.</p>
        </div>

        <div className="w-full max-w-xs h-16 flex items-center justify-center mb-8">
          <div className="w-full h-0.5 bg-gray-300 relative">
            {bubbles.map((_, idx) => (
              <div
                key={idx}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-300 cursor-pointer transition-all duration-300"
                style={{
                  left: `${(idx / (bubbles.length - 1)) * 100}%`,
                  transform: `translate(-50%, -50%) scale(${hoveredIdx === idx ? 1.5 : 1})`,
                  borderColor: hoveredIdx === idx ? '#6E7C5B' : '#D1D5DB',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setModalIdx(idx)}
              />
            ))}
          </div>
        </div>

      <div className="relative w-full max-w-6xl min-h-[500px] mx-auto flex flex-col lg:block items-center justify-center gap-8 lg:gap-0">
        {bubbles.map((bubble, idx) => (
          <figure
            key={bubble.name}
            className={`speech-bubble-figure relative flex items-center group transition-all duration-700 ease-in-out w-full md:max-w-none ${bubblePositions[idx].figureClass} ${bubblePositions[idx].flexDirection}`}
            style={{ zIndex: hoveredIdx === idx ? 30 : (idx % 2 === 0 ? 10 : 20) }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => setModalIdx(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setModalIdx(idx);
            }}
            tabIndex={0}
            role="listitem"
            aria-label={`Testimonial from ${bubble.name}`}
          >
            <div
              className={`relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0 z-20 ${bubblePositions[idx].avatarClass}`}
            >
              <Image
                src={bubble.img}
                alt={bubble.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <figcaption
              className="relative backdrop-blur-md rounded-2xl p-6 shadow-xl transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-camber-sage-light max-w-sm text-left bg-white/50"
            >
              <span className="block font-semibold text-camber-text-primary mb-1 text-base">
                {bubble.name}
              </span>
              <span className="block text-xs text-camber-text-secondary mb-3">
                {bubble.title}
              </span>
              <p className="text-lg text-camber-text-primary leading-relaxed">
                {bubble.quote}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {modalIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
          ref={modalRef}
        >
          <div
            className="bg-camber-background-light rounded-2xl p-8 max-w-lg w-full shadow-2xl relative transform transition-all duration-300 scale-95 opacity-0 animate-modal-open"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-camber-text-secondary hover:text-camber-text-primary text-3xl leading-none"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                <Image
                  src={bubbles[modalIdx].img}
                  alt={bubbles[modalIdx].name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-2xl text-camber-text-primary mb-1">
                {bubbles[modalIdx].name}
              </h3>
              <p className="text-md text-camber-text-secondary mb-4">
                {bubbles[modalIdx].title}
              </p>
              <p className="text-lg text-camber-text-primary leading-relaxed">
                {bubbles[modalIdx].quote}
              </p>
            </div>
          </div>
        </div>
      )}
      
    </section>
  );
};

export default SpeechBubblesSection;
