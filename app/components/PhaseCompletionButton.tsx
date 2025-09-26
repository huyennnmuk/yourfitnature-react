'use client';

import React, { useState } from 'react';
import { useRoadmap } from '@/app/contexts/RoadmapContext';
import ReusableButton from './ReusableButton';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface PhaseCompletionButtonProps {
  phaseNumber: number;
}

const PhaseCompletionButton: React.FC<PhaseCompletionButtonProps> = ({ phaseNumber }) => {
  const { phases, completePhase, uncompletePhase, updatingPhase } = useRoadmap();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const phase = phases.find(p => p.phase === phaseNumber);
  const isLoading = updatingPhase === phaseNumber;

  if (!phase) return null;

  const handleComplete = async () => {
    await completePhase(phaseNumber);
    router.push('/bloating-recovery-roadmap');
  };

  const handleUncomplete = async () => {
    setShowConfirmModal(false);
    await uncompletePhase(phaseNumber);
    router.push('/bloating-recovery-roadmap');
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
      {phase.status === 'current' && (
        <>
          <h2 className="typography-h2 text-grey text-pretty">Ready to move on?</h2>
          <p className="text-base sm:text-lg text-grey max-w-2xl mt-2 mb-4">After completing all tasks in this phase, you can mark it as complete.</p>
          <ReusableButton 
            onClick={handleComplete}
            disabled={isLoading}
            className="!bg-perplexity-primary !text-white hover:!bg-perplexity-primary-dark"
          >
            {isLoading ? 'Updating...' : `Complete Phase ${phaseNumber}`}
          </ReusableButton>
        </>
      )}

      {phase.status === 'completed' && (
        <>
          <h2 className="typography-h2 text-camber-text-primary">Phase Complete!</h2>
          <p className="text-camber-text-secondary mt-2 mb-4">You can revisit this phase anytime, or mark it as incomplete to redo the tasks.</p>
          <ReusableButton 
            onClick={() => setShowConfirmModal(true)}
            disabled={isLoading}
            className=""
          >
            {isLoading ? 'Updating...' : 'Mark as Incomplete'}
          </ReusableButton>
        </>
      )}

      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full text-center"
            >
              <h3 className="typography-h3">Are you sure?</h3>
              <p className="text-camber-text-secondary mt-2 mb-6">Marking this phase as incomplete will reset the progress for all subsequent phases.</p>
              <div className="flex justify-center gap-4">
                <ReusableButton onClick={() => setShowConfirmModal(false)} className="!bg-gray-300 hover:!bg-gray-400 !text-gray-800">
                  Cancel
                </ReusableButton>
                <ReusableButton onClick={handleUncomplete} className="!bg-red-500 hover:!bg-red-600 !text-white">
                  Yes, Mark as Incomplete
                </ReusableButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhaseCompletionButton;
