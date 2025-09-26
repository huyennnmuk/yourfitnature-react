
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TwoColumnFeatureProps {
  title: string;
  subtitle: string;
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}

const TwoColumnFeature: React.FC<TwoColumnFeatureProps> = ({ title, subtitle, leftColumn, rightColumn }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(section, 
        { y: 100, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="py-12 md:py-20" ref={sectionRef}>
        <div className="flex flex-col items-center gap-1 pb-4 pt-6 text-center">
            <h2 className="typography-h1 mb-4 text-center text-grey">{title}</h2>
            <p className="typography-body mb-8 text-center text-grey">{subtitle}</p>
        </div>
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
        >
         <div 
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
        >
            <div className="w-full lg:w-1/2">
                {leftColumn}
            </div>
            <div className="w-full lg:w-1/2">
                {rightColumn}
            </div>
        </div>

        </div>
    </div>
  );
};

export default TwoColumnFeature;


