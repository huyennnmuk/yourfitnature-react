import React from 'react';

const InsuranceBillingVisualSection = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`
        flex flex-col gap-8 justify-center items-stretch w-full 
        transition-all duration-500 ease-in-out 
        p-6 md:p-10 rounded-3xl
        bg-gradient-to-b from-[var(--camber-background-light)] to-[var(--camber-background-medium)]
        border border-[var(--camber-background-muted)]
        shadow-lg
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      {/* Section Header */}
      <div className="flex justify-center mb-0">
        <div className="flex items-center gap-3 justify-start w-full px-4 md:px-8">
          <span className="block h-3 w-3 rounded-full bg-[var(--camber-sage-accent)] shadow-md"></span>
          <span className="text-[var(--camber-text-secondary)] text-lg font-medium tracking-tight">Daily Wellness Logs</span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-0 md:px-4 w-full">
        
        {/* Card 1: Timeline */}
        <div className="flex-1 card-base glass-light p-6 flex flex-col items-center card-hover">
          <div className="w-full flex flex-col items-center">
            <div className="w-full bg-white/30 rounded-2xl py-6 mb-6 flex flex-col items-center shadow-inner border border-white/50">
              <span className="bg-[var(--camber-sage-primary)] text-xs px-4 py-1 rounded-full mb-4 text-white font-semibold tracking-tight shadow-md">Today</span>
              <div className="w-full flex flex-col gap-2 text-base text-[var(--camber-text-primary)]">
                <div className="flex justify-between w-11/12 md:w-4/5 mx-auto"><span className="font-medium">09:00 AM</span><span className="font-semibold">Breakfast: Smoothie</span></div>
                <div className="flex justify-between w-11/12 md:w-4/5 mx-auto"><span className="font-medium">09:05 AM</span><span>Energy 7/10</span></div>
                <div className="flex justify-between w-11/12 md:w-4/5 mx-auto bg-[var(--camber-sage-light)]/30 rounded-lg px-2"><span className="font-semibold">09:12 AM</span><span className="font-semibold">Bloat 2/10</span></div>
                <div className="flex justify-between w-11/12 md:w-4/5 mx-auto"><span className="font-medium">09:36 AM</span><span>Hydration ✓</span></div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-xl font-semibold text-[var(--camber-text-primary)] mb-2 tracking-tight">Submit claims automatically</div>
              <div className="text-[var(--camber-text-secondary)] text-base">Once a session is signed off, it’s billed that night.</div>
            </div>
          </div>
        </div>

        {/* Card 2: Checklist */}
        <div className="flex-1 card-base glass-light p-6 flex flex-col items-center card-hover">
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center mb-6">
              <div className="w-full bg-white/30 rounded-2xl p-6 relative shadow-inner border border-white/50">
                <span className="absolute -top-5 left-0 bg-[var(--camber-background-light)] text-xs px-4 py-1 rounded-t-lg text-[var(--camber-text-primary)] font-semibold tracking-tight shadow-md">TODAY</span>
                <div className="flex flex-col gap-3 mt-2">
                  <div className="flex items-center gap-2 text-sm"><span className="bg-[var(--camber-sage-charcoal)] text-white px-2 py-0.5 rounded font-bold">NEW</span><span className="flex-1 text-[var(--camber-text-primary)]">🍏 Add 5g fiber</span></div>
                  <div className="flex items-center gap-2 text-sm"><span className="bg-[var(--camber-sage-muted)] text-[var(--camber-sage-charcoal)] px-2 py-0.5 rounded font-bold">PENDING</span><span className="flex-1 text-[var(--camber-text-primary)]">🥛 Probiotic dose</span></div>
                  <div className="flex items-center gap-2 text-sm"><span className="bg-[var(--camber-sage-primary)] text-white px-2 py-0.5 rounded font-bold">COMPLETE</span><span className="flex-1 text-[var(--camber-text-primary)]">💧 10-min walk</span></div>
                  <div className="flex items-center gap-2 text-sm"><span className="bg-[var(--camber-sage-primary)] text-white px-2 py-0.5 rounded font-bold">COMPLETE</span><span className="flex-1 text-[var(--camber-text-primary)]">🍏 Hydration goal</span></div>
                  <div className="flex items-center gap-2 text-sm"><span className="bg-[var(--camber-sage-primary)] text-white px-2 py-0.5 rounded font-bold">COMPLETE</span><span className="flex-1 text-[var(--camber-text-primary)]">🥛 Mindful meal</span></div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-xl font-semibold text-[var(--camber-text-primary)] mb-2 tracking-tight">Track payment status in real time</div>
              <div className="text-[var(--camber-text-secondary)] text-base">See pending and confirmed payments, by facility, funder, or patient.</div>
            </div>
          </div>
        </div>

        {/* Card 3: Milestone */}
        <div className="flex-1 card-base glass-light p-6 flex flex-col items-center card-hover">
          <div className="w-full flex flex-col items-center justify-center h-full">
            <div className="w-full flex items-center justify-center mb-6">
              <div className="text-white flex items-center gap-3 px-6 py-4 rounded-2xl text-base font-medium shadow-lg backdrop-blur-sm" style={{ backgroundColor: 'rgba(90, 104, 74, 0.9)' }}>
                <svg width="22" height="22" fill="none" viewBox="0 0 22 22" className="flex-shrink-0"><circle cx="11" cy="11" r="11" fill="white" fillOpacity="0.1" /><path d="M11 15a1.5 1.5 0 0 0 1.5-1.5h-3A1.5 1.5 0 0 0 11 15Zm5-3v-2.5a5 5 0 0 0-4-4.9V4a1 1 0 1 0-2 0v.6a5 5 0 0 0-4 4.9V12l-1 1v1h14v-1l-1-1Z" fill="currentColor"/></svg>
                <span className="text-pretty">Bloat down 25% this week—nice work!</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-xl font-semibold text-[var(--camber-text-primary)] mb-2 tracking-tight">Grow with predictable payments</div>
              <div className="text-[var(--camber-text-secondary)] text-base">Understand every reason that makes a successful payment.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsuranceBillingVisualSection;
