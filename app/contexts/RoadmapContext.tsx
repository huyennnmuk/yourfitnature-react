'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { PhaseStatus } from '@/app/components/PhaseCard';
import { toast } from 'sonner';
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  HeartIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

interface Phase {
  phase: number;
  title: string;
  description: string;
  status: PhaseStatus;
  icon: ReactNode;
}

interface RoadmapContextType {
  phases: Phase[];
  completePhase: (phase: number) => void;
  uncompletePhase: (phase: number) => void;
  isLoading: boolean;
  updatingPhase: number | null;
}

const initialPhases: Phase[] = [
    { phase: 1, title: "Foundation & Symptom Tracking", description: "Establish a baseline and start tracking your symptoms.", status: 'locked', icon: <ClipboardDocumentListIcon /> },
    { phase: 2, title: "Elimination & Reintroduction", description: "Identify your personal trigger foods through a guided protocol.", status: 'locked', icon: <MagnifyingGlassIcon /> },
    { phase: 3, title: "Gut Healing & Rebalancing", description: "Support your gut lining and microbiome with targeted nutrients.", status: 'locked', icon: <SparklesIcon /> },
    { phase: 4, title: "Lifestyle & Stress Management", description: "Address non-dietary triggers like stress and sleep.", status: 'locked', icon: <HeartIcon /> },
    { phase: 5, title: "Maintenance & Long-Term Wellness", description: "Learn to sustain your results and prevent relapse.", status: 'locked', icon: <CheckCircleIcon /> },
];

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingPhase, setUpdatingPhase] = useState<number | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (status === 'authenticated') {
        setIsLoading(true);
        try {
          const response = await fetch('/api/roadmap/progress');
          if (response.ok) {
            const progress = await response.json();
            const updatedPhases = initialPhases.map(p => {
              if (progress.completedPhases.includes(p.phase)) {
                return { ...p, status: 'completed' as PhaseStatus };
              }
              if (p.phase === progress.currentPhase) {
                return { ...p, status: 'current' as PhaseStatus };
              }
              return { ...p, status: 'locked' as PhaseStatus };
            });
            setPhases(updatedPhases);
          }
        } catch (error) {
          console.error("Failed to fetch roadmap progress", error);
        } finally {
          setIsLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setPhases(initialPhases);
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [status]);

  const updateRoadmapAPI = async (currentPhase: number, completedPhases: number[]) => {
    try {
      const response = await fetch('/api/roadmap/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPhase, completedPhases }),
      });
      if (!response.ok) throw new Error('Failed to save progress');
      return true;
    } catch (error) {
      console.error("Failed to save roadmap progress", error);
      return false;
    }
  };

  const completePhase = async (phaseNumber: number) => {
    const originalPhases = phases;
    setUpdatingPhase(phaseNumber);

    const newPhases = phases.map(p => {
      if (p.phase === phaseNumber) return { ...p, status: 'completed' as PhaseStatus };
      if (p.phase === phaseNumber + 1) return { ...p, status: 'current' as PhaseStatus };
      return p;
    });
    setPhases(newPhases);

    const completedPhases = newPhases.filter(p => p.status === 'completed').map(p => p.phase);
    const currentPhase = newPhases.find(p => p.status === 'current')?.phase || completedPhases.length + 1;

    const success = await updateRoadmapAPI(currentPhase, completedPhases);
    if (success) {
      toast.success("Phase marked as complete!");
    } else {
      toast.error("Failed to update phase. Please try again.");
      setPhases(originalPhases);
    }
    setUpdatingPhase(null);
  };

  const uncompletePhase = async (phaseNumber: number) => {
    const originalPhases = phases;
    setUpdatingPhase(phaseNumber);

    const newPhases = phases.map(p => {
      if (p.phase === phaseNumber) return { ...p, status: 'current' as PhaseStatus };
      if (p.phase > phaseNumber) return { ...p, status: 'locked' as PhaseStatus };
      return p;
    });
    setPhases(newPhases);

    const completedPhases = newPhases.filter(p => p.status === 'completed').map(p => p.phase);
    const currentPhase = phaseNumber;

    const success = await updateRoadmapAPI(currentPhase, completedPhases);
    if (success) {
      toast.info("Phase status reverted.");
    } else {
      toast.error("Failed to update phase. Please try again.");
      setPhases(originalPhases);
    }
    setUpdatingPhase(null);
  };

  return (
    <RoadmapContext.Provider value={{ phases, completePhase, uncompletePhase, isLoading, updatingPhase }}>
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};