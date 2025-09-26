import React from 'react';
import PhaseCard from './PhaseCard';
import { useRoadmap } from '@/app/contexts/RoadmapContext';
import { useSession, signOut } from 'next-auth/react';
import ReusableButton from './ReusableButton';
import { motion } from 'framer-motion';

const RoadmapDashboard = () => {
  const { data: session } = useSession();
  const { phases, isLoading } = useRoadmap();

  if (isLoading) {
    return (
      <div className="text-center p-12">
        <p className="text-lg text-camber-text-secondary">Loading your roadmap...</p>
      </div>
    );
  }

  const completedPhases = phases.filter(p => p.status === 'completed').length;
  const progressPercentage = phases.length > 0 ? (completedPhases / phases.length) * 100 : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12">
        <div className="text-center sm:text-left">
          <h1 className="typography-h1">Your Bloating Recovery Roadmap</h1>
          <p className="text-lg text-camber-text-secondary mt-2">
            Welcome, {session?.user?.name}! Here is your roadmap to recovery. You can track your progress and see what&apos;s next.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <ReusableButton 
            onClick={() => signOut()} 
            className="!bg-camber-primary !text-white !py-2 !px-4 !text-sm group-hover:!bg-camber-sage-deep"
          >
            Sign Out
          </ReusableButton>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-8 md:mb-16">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-camber-primary">Your Progress</span>
          <span className="text-sm font-medium text-camber-primary">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-camber-background-medium rounded-full h-2.5">
          <motion.div
            className="bg-camber-primary h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Journey Path */}
      <div className="relative">
        {/* Desktop Path (hidden on mobile) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-camber-background-muted -translate-y-1/2"></div>
        <svg className="hidden lg:block absolute top-1/2 left-0 w-full h-full -translate-y-1/2" preserveAspectRatio="none" viewBox="0 0 1200 100">
          <path d="M0 50 C 150 50, 150 0, 300 0 C 450 0, 450 50, 600 50 C 750 50, 750 100, 900 100 C 1050 100, 1050 50, 1200 50" stroke="#E5E7EB" strokeWidth="4" fill="none" strokeDasharray="10,5" />
        </svg>

        {/* Cards Container */}
        <div className="relative">
          {/* Mobile & Tablet view (vertical list) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
            {phases.map((phase) => (
              <PhaseCard key={phase.phase} {...phase} />
            ))}
          </div>

          {/* Desktop view (on path) */}
          <div className="hidden lg:flex w-full justify-between items-center">
            {phases.map((phase, index) => (
              <div key={phase.phase} className={`w-full lg:w-[19%] ${index % 2 !== 0 ? 'lg:mt-24' : 'lg:mb-24'}`}>
                <PhaseCard {...phase} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDashboard;