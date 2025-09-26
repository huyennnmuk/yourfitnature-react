"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const useCountUp = (end: number, duration: number) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) {
          startTimestamp = timestamp;
        }

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(step);
        }
      };

      animationFrameId.current = requestAnimationFrame(step);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [inView, end, duration]);

  return { count, ref };
};

const CountTextSection = () => {
  const { count, ref } = useCountUp(10000, 2000);

  return (
    <section ref={ref} className="py-20 flex items-center justify-center min-h-[60vh] text-grey">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="px-4 md:px-8 py-6 text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
          <div data-viewport-enter="true" className="mx-auto max-w-[15ch] text-center md:max-w-[25ch]">
            We’ve simplified gut wellness and saved over
          </div>
          <div className="flex justify-center flex-wrap gap-2 my-4">
            {[...String(count).padStart(5, '0')].map((digit, idx) => (
              <span
                key={idx}
                className="inline-block bg-[#dfe5dc] rounded-md px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 text-grey font-normal shadow-sm text-4xl sm:text-5xl md:text-7xl lg:text-8xl align-middle border border-[#a5a5a5]"
              >
                {digit}
              </span>
            ))}
            <span className="sr-only">10,000</span>
          </div>
          <div>
            hours for readers like you.
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountTextSection;