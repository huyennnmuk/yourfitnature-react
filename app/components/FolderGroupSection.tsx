"use client";
import React, { useRef, useEffect, useState, useMemo } from 'react';
import WellnessInsightsSection from './WellnessInsightsSection';
import TriggerPreventionSection from './TriggerPreventionSection';
import DailyWellnessLogSection from './DailyWellnessLogSection';

interface FolderGroupSectionProps {
  title?: string;
  description?: string;
}

const FolderGroupSection: React.FC<FolderGroupSectionProps> = ({
  title = "How YourFitNature Helps You",
  description = "We connect gut symptoms to smart solutions—no guesswork needed."
}) => {
  const sectionRefs = useMemo(() => [
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
  ], []);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.map(ref => {
        if (!ref.current) return Infinity;
        const rect = ref.current.getBoundingClientRect();
        return Math.abs(rect.top - window.innerHeight / 4); // closer to top quarter
      });
      const minIdx = offsets.indexOf(Math.min(...offsets));
      setActiveSection(minIdx);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  return (
    <section data-section="folderGroup" className="fitnature-section-bg py-20">
      {/* Visual Section - Stacked Layout */}
      <div className="px-gutter-mobile md:px-gutter-desktop relative">
        <div data-viewport-enter="true" className="relative z-10 mx-auto mt-2 max-w-screen-xl opacity-100">
          <div className="flex flex-col items-center gap-1 pb-4 pt-6 text-center">
            <h2 className="typography-h1 mb-4 text-center text-grey">{title}</h2>
            <p className="typography-body mb-8 text-center text-grey text-balance">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-12 items-center w-full max-w-[1100px] mx-auto lg:perspective-1800">
            {/* Trigger Prevention Section */}
            <div
              ref={sectionRefs[0]}
              className="w-full min-h-[auto] lg:min-h-[520px] flex justify-center items-center transition-transform duration-700 lg:transform-style-3d"
              style={{
                transform: activeSection === 0 ? 'rotateY(0deg) scale(1)' : 'rotateY(-90deg) scale(0.95)',
                opacity: activeSection === 0 ? 1 : 0.5,
                zIndex: activeSection === 0 ? 3 : 1,
              }}
            >
              <TriggerPreventionSection isVisible={activeSection === 0} />
            </div>
            {/* Wellness Insights Section */}
            <div
              ref={sectionRefs[1]}
              className="w-full min-h-[auto] lg:min-h-[520px] flex justify-center items-center transition-transform duration-700 lg:transform-style-3d"
              style={{
                transform: activeSection === 1 ? 'rotateY(0deg) scale(1)' : (activeSection < 1 ? 'rotateY(90deg) scale(0.95)' : 'rotateY(-90deg) scale(0.95)'),
                opacity: activeSection === 1 ? 1 : 0.5,
                zIndex: activeSection === 1 ? 3 : 1,
              }}
            >
              <WellnessInsightsSection isVisible={activeSection === 1} />
            </div>
            {/* Daily Wellness Log Section */}
            <div
              ref={sectionRefs[2]}
              className="w-full min-h-[auto] lg:min-h-[520px] flex justify-center items-center transition-transform duration-700 lg:transform-style-3d"
              style={{
                transform: activeSection === 2 ? 'rotateY(0deg) scale(1)' : 'rotateY(90deg) scale(0.95)',
                opacity: activeSection === 2 ? 1 : 0.5,
                zIndex: activeSection === 2 ? 3 : 1,
              }}
            >
              <DailyWellnessLogSection isVisible={activeSection === 2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FolderGroupSection;
