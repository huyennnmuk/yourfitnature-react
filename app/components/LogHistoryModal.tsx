'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import SelectField from './form/SelectField';
import FormField from './form/FormField';
import ReusableButton from './ReusableButton';
import { Calendar, Heart, Zap, Utensils, AlertTriangle, X, Search, Loader, FileDown } from 'lucide-react';

interface Log {
  id?: number;
  log_date: string;
  food: string;
  symptoms: string;
  mood: 'Good' | 'Okay' | 'Bad';
  energy: 'High' | 'Medium' | 'Low';
}

interface LogHistoryModalProps {
  showModal: boolean;
  onClose: () => void;
  logs: Log[];
  isLoading: boolean;
}

const LogHistoryModal: React.FC<LogHistoryModalProps> = ({ showModal, onClose, logs, isLoading }) => {
  const [moodFilter, setMoodFilter] = useState('all');
  const [energyFilter, setEnergyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllHistory, setShowAllHistory] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'moodFilter') {
        setMoodFilter(value);
    } else if (name === 'energyFilter') {
        setEnergyFilter(value);
    } else if (name === 'searchQuery') {
        setSearchQuery(value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
    }
  };

  const filteredLogs = useMemo(() => {
      return logs.filter(log => {
          const moodMatch = moodFilter === 'all' || log.mood === moodFilter;
          const energyMatch = energyFilter === 'all' || log.energy === energyFilter;
          const searchMatch = !searchQuery || 
                                log.food.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                log.symptoms.toLowerCase().includes(searchQuery.toLowerCase());
          return moodMatch && energyMatch && searchMatch;
      });
  }, [logs, moodFilter, energyFilter, searchQuery]);

  const displayedLogs = showAllHistory ? filteredLogs : filteredLogs.slice(0, 5);

  const isAnyFilterActive = moodFilter !== 'all' || energyFilter !== 'all' || searchQuery !== '';

  const clearFilters = () => {
    setMoodFilter('all');
    setEnergyFilter('all');
    setSearchQuery('');
  };

  useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
         if (event.keyCode === 27) {
          onClose();
         }
      };
      window.addEventListener('keydown', handleEsc);

      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }, [onClose]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('YourFitNature - Log History', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    let y = 40;
    doc.setFontSize(10);
    doc.text(`Filters: Mood: ${moodFilter}, Energy: ${energyFilter}, Search: "${searchQuery}"`, 14, y);
    y += 10;


    filteredLogs.forEach(log => {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.setFontSize(12);
        doc.setFont(doc.getFont().fontName, 'bold');
        doc.text(`Date: ${new Date(log.log_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, y);
        doc.setFont(doc.getFont().fontName, 'normal');
        doc.text(`Mood: ${log.mood} | Energy: ${log.energy}`, 120, y);
        y += 8;
        doc.setFontSize(10);
        doc.setFont(doc.getFont().fontName, 'bold');
        doc.text('Food:', 14, y);
        doc.setFont(doc.getFont().fontName, 'normal');
        const foodLines = doc.splitTextToSize(log.food, 180);
        doc.text(foodLines, 24, y + 4);
        y += (foodLines.length * 4) + 4;

        doc.setFont(doc.getFont().fontName, 'bold');
        doc.text('Symptoms:', 14, y);
        doc.setFont(doc.getFont().fontName, 'normal');
        const symptomLines = doc.splitTextToSize(log.symptoms, 180);
        doc.text(symptomLines, 24, y + 4);
        y += (symptomLines.length * 4) + 8;
    });

    doc.save('yourfitnature_log_history.pdf');
  };

  const getStatusColor = (status: 'Good' | 'Okay' | 'Bad' | 'High' | 'Medium' | 'Low') => {
    switch (status) {
      case 'Good': return 'text-camber-sage-primary';
      case 'Okay': return 'text-yellow-500';
      case 'Bad': return 'text-red-500';
      case 'High': return 'text-camber-sage-accent';
      case 'Medium': return 'text-orange-400';
      case 'Low': return 'text-gray-400';
      default: return 'text-camber-text-secondary';
    }
  };

  interface FilterPillProps {
  label: string;
  onClear: () => void;
}

const FilterPill: React.FC<FilterPillProps> = ({ label, onClear }) => (
    <div className="flex items-center bg-camber-primary/10 text-camber-primary text-sm font-medium px-3 py-1 rounded-full">
      <span>{label}</span>
      <button onClick={onClear} className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-camber-primary/20">
        <X className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-camber-background-light dark:bg-camber-sage-charcoal rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="log-history-title"
          >
            <div className="p-6 border-b border-camber-background-muted dark:border-camber-sage-deep flex justify-between items-center flex-shrink-0">
                <h2 id="log-history-title" className="typography-h2 text-camber-text-primary dark:text-white">Log History</h2>
                <ReusableButton onClick={onClose} className="!p-2 !bg-transparent !text-camber-text-secondary hover:!bg-camber-background-medium">
                    <X className="w-6 h-6"/>
                </ReusableButton>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <FormField
                        id="searchQuery"
                        name="searchQuery"
                        label="Search Logs"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Search food or symptoms..."
                        Icon={Search}
                    />
                    <SelectField id="moodFilter" name="moodFilter" label="Filter by Mood" value={moodFilter} onChange={handleInputChange}>
                        <option value="all">All Moods</option>
                        <option value="Good">Good</option>
                        <option value="Okay">Okay</option>
                        <option value="Bad">Bad</option>
                    </SelectField>
                    <SelectField id="energyFilter" name="energyFilter" label="Filter by Energy" value={energyFilter} onChange={handleInputChange}>
                        <option value="all">All Energy</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </SelectField>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <AnimatePresence>
                      {moodFilter !== 'all' && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          <FilterPill label={`Mood: ${moodFilter}`} onClear={() => setMoodFilter('all')} />
                        </motion.div>
                      )}
                      {energyFilter !== 'all' && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          <FilterPill label={`Energy: ${energyFilter}`} onClear={() => setEnergyFilter('all')} />
                        </motion.div>
                      )}
                      {searchQuery && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          <FilterPill label={`Search: "${searchQuery}"`} onClear={() => setSearchQuery('')} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {isAnyFilterActive && (
                      <ReusableButton onClick={clearFilters} className="!text-sm !py-1 !px-3 !bg-transparent !text-camber-text-secondary hover:!bg-camber-background-medium">
                        Clear Filters
                      </ReusableButton>
                    )}
                    <div className="ml-auto text-sm text-camber-text-secondary">
                      {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'} found
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader className="w-8 h-8 animate-spin text-camber-primary"/>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {displayedLogs.length > 0 ? (
                            displayedLogs.map((log) => (
                                <motion.div 
                                  key={log.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.2 }}
                                  className="bg-white dark:bg-camber-sage-dark p-4 rounded-xl shadow-sm border border-camber-background-medium dark:border-camber-sage-deep"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="font-bold text-camber-text-primary dark:text-white flex items-center">
                                            <Calendar className="w-5 h-5 mr-2 text-camber-sage-primary" />
                                            {new Date(log.log_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <span className={`flex items-center text-sm font-semibold ${getStatusColor(log.mood)}`}>
                                                <Heart className="w-4 h-4 mr-1.5" /> {log.mood}
                                            </span>
                                            <span className={`flex items-center text-sm font-semibold ${getStatusColor(log.energy)}`}>
                                                <Zap className="w-4 h-4 mr-1.5" /> {log.energy}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="font-semibold text-camber-text-primary dark:text-white flex items-center"><Utensils className="w-4 h-4 mr-2 text-camber-sage-accent"/>Food</p>
                                            <p className="text-camber-text-secondary dark:text-camber-sage-light pl-6">{log.food}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-camber-text-primary dark:text-white flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-orange-400"/>Symptoms</p>
                                            <p className="text-camber-text-secondary dark:text-camber-sage-light pl-6">{log.symptoms}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-10 px-6 bg-camber-background-medium dark:bg-camber-sage-dark rounded-lg">
                                <p className="font-semibold text-camber-text-primary dark:text-white mb-2">No Matching Logs</p>
                                <p className="text-camber-text-secondary dark:text-camber-sage-light">No logs match your filters. Try adjusting Mood/Energy or clearing your search.</p>
                            </div>
                        )}
                        {filteredLogs.length > 5 && !showAllHistory && (
                            <div className="text-center mt-6">
                                <ReusableButton onClick={() => setShowAllHistory(true)} className="!bg-camber-background-medium !text-camber-text-primary hover:!bg-camber-background-muted">
                                    Show More
                                </ReusableButton>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="p-6 border-t border-camber-background-muted dark:border-camber-sage-deep flex justify-end items-center flex-shrink-0">
                <ReusableButton onClick={handleExportPDF} disabled={filteredLogs.length === 0} className="flex justify-center items-center !bg-camber-primary !text-white hover:!bg-camber-sage-deep transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                    <FileDown className="w-4 h-4 mr-2"/>
                    Export as PDF ({filteredLogs.length})
                </ReusableButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogHistoryModal;