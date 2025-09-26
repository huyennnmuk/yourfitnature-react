import React, { ReactNode } from 'react';
import Link from 'next/link';
import ReusableButton from './ReusableButton';
import { ArrowRight } from 'lucide-react';

export type PhaseStatus = 'locked' | 'current' | 'completed';

interface PhaseCardProps {
  phase: number;
  title: string;
  description: string;
  status: PhaseStatus;
  icon: ReactNode;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, title, description, status, icon }) => {
  const statusStyles = {
    locked: {
      container: 'bg-camber-background-medium/50 border-camber-background-muted opacity-60 cursor-not-allowed',
      badge: 'bg-camber-background-muted text-camber-text-secondary',
      title: 'text-camber-text-secondary',
      icon: 'text-camber-text-secondary/80',
    },
    current: {
      container: 'bg-white border-camber-sage-primary hover:shadow-lg hover:border-camber-sage-deep',
      badge: 'bg-camber-sage-primary text-white',
      title: 'text-camber-text-primary group-hover:text-camber-sage-deep',
      icon: 'text-camber-sage-primary',
    },
    completed: {
      container: 'bg-camber-sage-light/20 border-camber-sage-light hover:shadow-lg hover:border-camber-sage-medium',
      badge: 'bg-camber-sage-light text-camber-sage-deep',
      title: 'text-camber-sage-deep',
      icon: 'text-camber-sage-deep',
    },
  };

  const styles = statusStyles[status];

  const CardContent = (
    <div className={`group p-6 rounded-2xl border-2 shadow-md transition-all duration-300 flex flex-col h-full ${styles.container}`}>
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${styles.badge}`}>
          Phase {phase}
        </span>
        <div className={`w-10 h-10 transition-colors duration-300 ${styles.icon}`}>
          {icon}
        </div>
      </div>
      <h3 className={`text-xl font-bold transition-colors duration-300 ${styles.title}`}>{title}</h3>
      <p className="mt-2 text-camber-text-secondary flex-grow">{description}</p>
      
      <div className="mt-6 flex justify-end">
        {status === 'current' && (
            <ReusableButton className=" flex justify-center !bg-camber-primary !text-white !py-2 !px-4 !text-sm group-hover:!bg-camber-sage-deep">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </ReusableButton>
        )}
        {status === 'completed' && (
            <span className="text-sm font-semibold text-camber-sage-deep">
              Completed
            </span>
        )}
         {status === 'locked' && (
            <span className="text-sm font-semibold text-camber-text-secondary">
              Locked
            </span>
        )}
      </div>
    </div>
  );

  if (status === 'locked') {
    return CardContent;
  }

  return (
    <Link href={`/bloating-recovery-roadmap/phase-${phase}`} passHref className="h-full">
      {CardContent}
    </Link>
  );
};

export default PhaseCard;
