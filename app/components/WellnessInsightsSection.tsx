import React from 'react';
import Lottie from 'lottie-react';
import reportingAnimation from '../animations/reporting.json';

const ReportingVisualSection = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  return (
    <div
      className="flex flex-col gap-8 justify-center items-stretch w-full transition-all duration-500 ease-in-out opacity-100 scale-100 fade-in is-visible"
      style={{
        background: 'linear-gradient(180deg, #F7F8F5 0%, #F7F8F5 100%)',
        borderRadius: '32px',
        padding: '32px 0',
        boxShadow: '0 2px 24px 0 rgba(0,0,0,0.04)',
      }}
    >
      {/* Denial Prevention section moved outside */}
      <div className="flex justify-center mb-0">
        <div className="flex items-center gap-3 justify-start w-full px-16">
          <span className="block h-2 w-2 rounded-full bg-[#B6B6B6]"></span>
          <span className="text-grey text-lg font-medium" style={{letterSpacing: '-0.01em'}}>Wellness Insights</span>
        </div>
      </div>
      {/* FolderCard 1 */}
      <div className="flex flex-col md:flex-row gap-8 px-16 w-full justify-center items-stretch">
      {/* Card 1: Daily Metric Log */}
      <div className="flex-1 min-w-[260px] max-w-[370px] linear-gradient(180deg, #F7F8F5 0%, #F7F8F5 100%) rounded-2xl shadow-[0_2px_24px_0_rgba(0,0,0,0.04)] border border-[#E9E9E9] flex flex-col items-center p-6 relative">
        <div className="mt-12 w-full flex flex-col items-center">
          {/* Daily Metric Log visual */}
          <div className="w-full bg-[#F5F6F7] rounded-xl py-4 mb-4 flex flex-col items-center">
            <span className="bg-[#D1D5DB] text-xs px-3 py-1 rounded-full mb-2 text-[#5B5B5B]">Today</span>
            <div className="w-full flex flex-col gap-1 text-sm text-[#5B5B5B]">
              <div className="flex justify-between w-4/5 mx-auto"><span>09:00 AM</span><span className="font-semibold">Energy 6/10</span></div>
              <div className="flex justify-between w-4/5 mx-auto"><span>09:05 AM</span><span>Bloat 3/10</span></div>
              <div className="flex justify-between w-4/5 mx-auto bg-[#E6F4EA] rounded"><span className="font-semibold">09:12 AM</span><span className="font-semibold">Hydration ✅</span></div>
              <div className="flex justify-between w-4/5 mx-auto"><span>09:36 AM</span><span>Mood 🙂</span></div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-xl font-semibold text-grey mb-1">Every metric, live and clear</div>
            <div className="text-[#8B8B8B] text-base">Watch bloat, regularity, and vitality<br/>update on the spot.</div>
          </div>
        </div>
      </div>
      {/* Card 2: Insightful progress graphs */}
      <div className="flex-1 min-w-[260px] max-w-[370px] bg-gradient-to-b from-[#F7F8F5] to-[#F7F8F5] rounded-2xl shadow-[0_2px_24px_0_rgba(0,0,0,0.04)] border border-[#E9E9E9] flex flex-col items-center p-6 relative">
        <div className="absolute left-6 top-6 flex items-center gap-2 opacity-0 pointer-events-none">
          <span className="block h-2 w-2 rounded-full bg-[#B6B6B6]"></span>
          <span className="text-grey text-lg font-medium">Reporting</span>
        </div>
        <div className="mt-8 w-full flex flex-col items-center">
          {/* Graph visual */}
          <div className="w-full h-40 flex items-center justify-center mb-4 relative">
            {/* Line chart, recolored to FitNature green */}
            <svg width="90%" height="100%" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,90 20,80 40,85 60,60 80,70 100,40 120,60 140,30 160,60 180,50 200,70 220,60 240,80 260,60 280,90 300,80" fill="rgba(162,212,160,0.18)" stroke="#A2D4A0" strokeWidth="2" />
            </svg>
            <span className="absolute left-8 top-8 bg-[#E6F4EA] text-xs px-2 py-0.5 rounded-full text-[#3A3A3A] font-semibold">–30% Bloat</span>
          </div>
          <div className="mt-2 text-center">
            <div className="text-xl font-semibold text-grey mb-1">Insightful progress graphs</div>
            <div className="text-[#8B8B8B] text-base">Spot trending foods and habits<br/>that amplify results.</div>
          </div>
        </div>
      </div>
      {/* Card 3: Clarity for sustainable scaling */}
      <div className="flex-1 min-w-[260px] max-w-[370px] bg-gradient-to-b from-[#F7F8F5] to-[#F7F8F5] rounded-2xl shadow-[0_2px_24px_0_rgba(0,0,0,0.04)] border border-[#E9E9E9] flex flex-col items-center p-6 relative">
        <div className="absolute left-6 top-6 flex items-center gap-2 opacity-0 pointer-events-none">
          <span className="block h-2 w-2 rounded-full bg-[#B6B6B6]"></span>
          <span className="text-grey text-lg font-medium">Reporting</span>
        </div>
        <div className="mt-8 w-full flex flex-col items-center">
          {/* Dotted circle visual */}
          <div className="w-full h-40 flex items-center justify-center mb-4 relative">
            {/* Dotted spiral, label as Consistency Streak */}
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" stroke="#B6B6B6" strokeDasharray="2 8" strokeWidth="2" fill="none" />
              <circle cx="60" cy="60" r="35" stroke="#B6B6B6" strokeDasharray="1 6" strokeWidth="1.5" fill="none" />
              <circle cx="60" cy="60" r="20" stroke="#7FC29B" strokeDasharray="1 4" strokeWidth="1" fill="none" />
              {/* Add subtle green dots for completed days */}
              <circle cx="60" cy="20" r="3" fill="#7FC29B" />
              <circle cx="90" cy="60" r="3" fill="#7FC29B" />
              <circle cx="60" cy="100" r="3" fill="#7FC29B" />
              <circle cx="30" cy="60" r="3" fill="#7FC29B" />
            </svg>
            <span className="absolute right-8 top-8 bg-[#E6F4EA] text-xs px-2 py-0.5 rounded-full text-[#3A3A3A] font-semibold">98% Consistency Streak</span>
          </div>
          <div className="mt-2 text-center">
            <div className="text-xl font-semibold text-grey mb-1">Clarity for sustainable scaling</div>
            <div className="text-[#8B8B8B] text-base">Translate small wins into<br/>system-wide lifestyle upgrades.</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ReportingVisualSection;