'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ReusableButton from './ReusableButton';
import FormField from './form/FormField';
import LogHistoryModal from './LogHistoryModal';
import { Smile, Meh, Frown, Zap, Lock, Loader, History } from 'lucide-react';

// --- Helper Components ---

interface MoodEnergySelectorProps {
  label: string;
  options: { value: string; icon: React.ElementType; color: string }[];
  selected: string;
  onSelect: (name: string, value: string) => void;
  name: string;
}

const MoodEnergySelector: React.FC<MoodEnergySelectorProps> = ({ label, options, selected, onSelect, name }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-camber-text-secondary mb-2">{label}</label>
      <div className="flex flex-wrap items-center gap-2 rounded-lg bg-camber-background-medium p-1.5">
        {options.map(({ value, icon: Icon, color }) => (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(name, value)}
            className={`flex-grow py-2 px-3 text-sm font-semibold rounded-md flex items-center justify-center transition-all duration-200 ease-in-out min-w-[90px]
              ${
                selected === value
                  ? `shadow-sm ${color} text-white`
                  : 'bg-transparent text-camber-text-secondary hover:bg-white/60'
              }`}
          >
            <Icon className="w-5 h-5 mr-2" />
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

interface ProgressTrackerProps {
    day: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ day }) => {
  const progress = Math.min((day / 7) * 100, 100);
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-camber-text-primary">
          Day <span className="text-camber-primary">{day}</span> of 7
        </p>
        <p className="text-sm text-camber-text-secondary">
          {day < 7 ? `${7 - day} days to go!` : 'Completed!'}
        </p>
      </div>
      <div className="w-full bg-camber-background-medium rounded-full h-2.5">
        <motion.div
          className="bg-camber-sage-primary h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

// --- Main Component ---

interface DayLog {
  id?: number;
  log_date: string;
  food: string;
  symptoms: string;
  mood: 'Good' | 'Okay' | 'Bad';
  energy: 'High' | 'Medium' | 'Low';
}

const MOOD_OPTIONS = [
  { value: 'Good', icon: Smile, color: 'bg-camber-sage-primary' },
  { value: 'Okay', icon: Meh, color: 'bg-yellow-500' },
  { value: 'Bad', icon: Frown, color: 'bg-red-500' },
];

const ENERGY_OPTIONS = [
  { value: 'High', icon: Zap, color: 'bg-camber-sage-accent' },
  { value: 'Medium', icon: Zap, color: 'bg-orange-400' },
  { value: 'Low', icon: Zap, color: 'bg-gray-400' },
];

const DigitalTracker = () => {
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [currentLog, setCurrentLog] = useState<Omit<DayLog, 'log_date'>>({
    food: '',
    symptoms: '',
    mood: 'Good',
    energy: 'High',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      if (status === 'authenticated') {
        setIsLoading(true);
        try {
          const response = await fetch('/api/tracker');
          if (response.ok) {
            const data = await response.json();
            setLogs(data);
          } else {
            toast.error('Failed to fetch your logs.');
          }
        } catch (error) {
          toast.error('An error occurred while fetching logs.');
        } finally {
          setIsLoading(false);
        }
      }
      if (status === 'unauthenticated') {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [status]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentLog(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectorChange = (name: string, value: string) => {
    setCurrentLog(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSaveLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (logs.length >= 7) {
      toast.error('You have completed the 7-day tracker!');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentLog),
      });

      if (response.ok) {
        const newLog = await response.json();
        setLogs(prev => [newLog, ...prev]);
        toast.success(`Day ${logs.length + 1} logged! Keep going!`);
        setCurrentLog({ food: '', symptoms: '', mood: 'Good', energy: 'High' });
      } else {
        toast.error('Failed to save your log. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'unauthenticated') {
    return (
        <div className="p-4 sm:p-6 md:p-8 bg-camber-background-light dark:bg-camber-sage-charcoal rounded-2xl shadow-lg border border-camber-background-muted dark:border-camber-sage-deep text-center">
            <h3 className="typography-h3 text-camber-text-primary dark:text-white mb-4">Please sign in</h3>
            <p className="text-camber-text-secondary dark:text-camber-sage-light">You need to be signed in to use the tracker.</p>
        </div>
    )
  }

  return (
    <>
    <div className="p-4 sm:p-6 md:p-8 bg-camber-background-light dark:bg-camber-sage-charcoal rounded-2xl shadow-lg border border-camber-background-muted dark:border-camber-sage-deep">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
        <h3 className="typography-h2 text-camber-text-primary dark:text-white">
            7-Day Bloating Reset Tracker
        </h3>
        <ReusableButton 
            onClick={() => setShowHistoryModal(true)} 
            className="flex items-center !bg-transparent !text-camber-text-primary dark:!text-white hover:!bg-camber-background-medium dark:hover:!bg-camber-sage-dark transition-colors flex-shrink-0"
        >
            <History className="w-5 h-5 mr-2"/>
            View History
        </ReusableButton>
      </div>
      <p className="text-camber-text-secondary dark:text-camber-sage-light mb-8">
        Log your meals, symptoms, and wellness to uncover patterns.
      </p>

      <ProgressTracker day={logs.length} />

      <form onSubmit={handleSaveLog} className="space-y-6">
        <FormField
          id="food"
          name="food"
          label="What did you eat today?"
          value={currentLog.food}
          onChange={handleInputChange}
          placeholder="e.g., Oatmeal with berries, chicken salad..."
          required
          isTextArea
        />
        <FormField
          id="symptoms"
          name="symptoms"
          label="Any symptoms? (e.g., bloating, gas)"
          value={currentLog.symptoms}
          onChange={handleInputChange}
          placeholder="e.g., Felt bloated after lunch..."
          required
          isTextArea
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MoodEnergySelector
            label="Your Mood"
            name="mood"
            options={MOOD_OPTIONS}
            selected={currentLog.mood}
            onSelect={handleSelectorChange}
          />
          <MoodEnergySelector
            label="Energy Level"
            name="energy"
            options={ENERGY_OPTIONS}
            selected={currentLog.energy}
            onSelect={handleSelectorChange}
          />
        </div>
        <div className="flex flex-col items-center sm:flex-row justify-between gap-4 pt-4">
           <p className="text-xs text-camber-text-secondary dark:text-camber-sage-muted flex items-center">
             <Lock className="w-3 h-3 mr-1.5" /> Your data is private and stored securely.
           </p>
          <ReusableButton
            type="submit"
            disabled={logs.length >= 7 || isSubmitting}
            className="!bg-camber-primary !text-white hover:!bg-camber-sage-deep transition-colors w-full sm:w-auto disabled:!bg-gray-400"
          >
            {isSubmitting ? <Loader className="animate-spin"/> : (logs.length >= 7 ? 'Tracker Complete' : `Save Day ${logs.length + 1} Log`)}
          </ReusableButton>
        </div>
      </form>
    </div>
    <LogHistoryModal 
        showModal={showHistoryModal} 
        onClose={() => setShowHistoryModal(false)} 
        logs={logs} 
        isLoading={isLoading}
    />
    </>
  );
};

export default DigitalTracker;
