import React from 'react';

const TriggerPreventionSection = ({ isVisible }: { isVisible: boolean }) => {
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
          <span className="text-[var(--camber-text-secondary)] text-lg font-medium tracking-tight">Trigger Prevention</span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-0 md:px-4 w-full">
        
        {/* Card 1: Quick Trigger Check */}
        <div className="flex-1 card-base glass-light p-6 flex flex-col items-center card-hover">
          <div className="w-full flex flex-col items-center">
            <div className="w-full bg-white/30 rounded-2xl p-6 mb-6 flex flex-col items-center shadow-inner border border-white/50">
                <div className="text-lg text-[var(--camber-text-primary)] font-medium mb-4 text-center">Quick Trigger Check</div>
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">🌶</span>
                    <span className="text-xs text-[var(--camber-text-secondary)] mt-1">Allergens</span>
                    <span className="block h-2 w-2 rounded-full bg-[var(--camber-sage-primary)] mt-1"></span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">🍺</span>
                    <span className="text-xs text-[var(--camber-text-secondary)] mt-1">FODMAPs</span>
                    <span className="block h-2 w-2 rounded-full bg-[var(--camber-sage-primary)] mt-1"></span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">😰</span>
                    <span className="text-xs text-[var(--camber-text-secondary)] mt-1">Stress</span>
                    <span className="block h-2 w-2 rounded-full bg-[var(--camber-sage-primary)] mt-1"></span>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2 mt-2">
                  <button className="btn-secondary">Run Check</button>
                  <button className="text-sm text-[var(--camber-text-secondary)] py-2 px-4 rounded-full hover:bg-black/5 transition-colors">Skip</button>
                </div>
            </div>
            <div className="mt-2 text-center">
              <div className="text-xl font-semibold text-[var(--camber-text-primary)] mb-1">Prevent flare-ups early</div>
              <div className="text-[var(--camber-text-secondary)] text-base">Spot digestive triggers before they snowball.</div>
            </div>
          </div>
        </div>

        {/* Card 2: Food-Onboarding List */}
        <div className="flex-1 card-base glass-light p-6 flex flex-col items-center card-hover">
          <div className="w-full flex flex-col items-center">
            <div className="w-full bg-white/30 rounded-2xl p-6 mb-6 flex flex-col shadow-inner border border-white/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[var(--camber-text-secondary)] font-semibold tracking-wide">Today&apos;s Picks</span>
                  <button className="text-xs text-[var(--camber-sage-primary)] font-medium px-3 py-1 rounded-full bg-white/50 hover:bg-white/80 transition">+ Add</button>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🥑</span>
                    <div>
                      <div className="text-[var(--camber-text-primary)] font-semibold">Avocado</div>
                      <div className="text-xs text-[var(--camber-text-secondary)]">Healthy fat</div>
                    </div>
                    <span className="ml-auto bg-[var(--camber-sage-primary)] text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">LOVED</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🥕</span>
                    <div>
                      <div className="text-[var(--camber-text-primary)] font-semibold">Fermented Carrot</div>
                      <div className="text-xs text-[var(--camber-text-secondary)]">Probiotic boost</div>
                    </div>
                    <span className="ml-auto bg-[var(--camber-sage-muted)] text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">NEW</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🍚</span>
                    <div>
                      <div className="text-[var(--camber-text-primary)] font-semibold">Rice</div>
                      <div className="text-xs text-[var(--camber-text-secondary)]">Gentle carb</div>
                    </div>
                    <span className="ml-auto bg-[var(--camber-text-secondary)] text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">TEST</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button className="text-xs text-[var(--camber-text-secondary)] bg-white/50 px-4 py-1.5 rounded-full border border-white/80 hover:bg-white/90 transition font-medium">Guide</button>
                  <span className="text-xs text-[var(--camber-text-secondary)]">Swipe to reorder</span>
                </div>
            </div>
            <div className="mt-2 text-center">
              <div className="text-xl font-semibold text-[var(--camber-text-primary)] mb-1">Add gut-friendly foods with ease</div>
              <div className="text-[var(--camber-text-secondary)] text-base">Turnkey guides for introducing new ingredients—stress-free.</div>
            </div>
          </div>
        </div>

        {/* Card 3: Symptom Severity Over Time */}
        <div className="flex-1 card-base glass-light p-6 flex flex-col items-center card-hover">
          <div className="w-full flex flex-col items-center justify-center h-full">
            <div className="w-full flex items-center justify-center mb-6 relative">
              <svg width="100%" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="40" r="8" fill="var(--camber-sage-primary)" fillOpacity="0.3" />
                <circle cx="40" cy="30" r="5" fill="var(--camber-sage-accent)" fillOpacity="0.2" />
                <circle cx="70" cy="45" r="10" fill="var(--camber-sage-primary)" fillOpacity="0.4" />
                <circle cx="100" cy="35" r="4" fill="var(--camber-sage-accent)" fillOpacity="0.15" />
                <circle cx="130" cy="50" r="12" fill="var(--camber-sage-primary)" fillOpacity="0.5" />
                <circle cx="160" cy="40" r="6" fill="var(--camber-sage-accent)" fillOpacity="0.2" />
                <circle cx="190" cy="45" r="9" fill="var(--camber-sage-primary)" fillOpacity="0.3" />
                <circle cx="220" cy="30" r="5" fill="var(--camber-sage-accent)" fillOpacity="0.2" />
                <circle cx="250" cy="50" r="15" fill="var(--camber-sage-primary)" fillOpacity="0.5" />
                <circle cx="280" cy="40" r="8" fill="var(--camber-sage-accent)" fillOpacity="0.3" />
                <circle cx="310" cy="35" r="6" fill="var(--camber-sage-primary)" fillOpacity="0.2" />
              </svg>
              <span className="absolute right-2 top-2 bg-white/50 text-xs px-2 py-0.5 rounded shadow text-[var(--camber-sage-deep)] border border-white/80">Average bloat score dropped 30%</span>
            </div>
            <div className="mt-2 text-center">
              <div className="text-xl font-semibold text-[var(--camber-text-primary)] mb-1">Speed up your progress</div>
              <div className="text-[var(--camber-text-secondary)] text-base">Resolve micro-tasks early to keep relief on schedule.</div>
              <div className="text-xs text-[var(--camber-text-secondary)] mt-1">Symptom Severity Over Time</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TriggerPreventionSection;
