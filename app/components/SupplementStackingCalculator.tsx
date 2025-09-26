'use client';
import React, { useState, useEffect } from 'react';
import { allSymptoms, Supplement } from '@/lib/supplements/supplementData';
import {
  filterSupplementsBySymptom,
  getSupplementInteractions,
  checkContraindications,
} from '@/lib/supplements/supplementUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiAlertTriangle } from 'react-icons/fi';
import { CheckCircle, ClipboardList, Clock, ChevronDown } from 'lucide-react';
import ReusableButton from './ReusableButton';

const SupplementDetailAccordion: React.FC<{ title: string; content: string | string[]; icon: React.ReactNode; isOpen: boolean; onToggle: () => void; }> = ({ title, content, icon, isOpen, onToggle }) => {
  return (
    <div className="border-b border-camber-background-muted last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-3 text-left focus:outline-none"
      >
        <div className="flex items-center">
          {icon}
          <span className="font-semibold text-camber-text-primary ml-3">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-camber-sage-primary" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pl-11 pb-3 text-camber-text-secondary">
              {Array.isArray(content) ? (
                <ul className="list-disc list-inside space-y-1">
                  {content.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              ) : (
                content
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const SupplementStackingCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [medications, setMedications] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [recommendations, setRecommendations] = useState<Supplement[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (recommendations.length > 0) {
      setOpenAccordion(`${recommendations[0].id}-benefits`);
    } else {
      setOpenAccordion(null);
    }
  }, [recommendations]);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recommendedSupplements = filterSupplementsBySymptom(selectedSymptoms);
    setRecommendations(recommendedSupplements);

    const selectedIds = recommendedSupplements.map(s => s.id);
    const interactionWarnings = getSupplementInteractions(selectedIds);
    const contraindicationWarnings = checkContraindications(
      selectedIds,
      medications.split(',').map(m => m.trim()),
      restrictions.split(',').map(r => r.trim())
    );

    setWarnings([...interactionWarnings, ...contraindicationWarnings]);
  };

  const handleDownload = async () => {
    try {
      // Track the download event via API
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'Download',
          data: { 
            category: 'Supplement Protocol',
            label: 'Personalized Supplement Protocol',
            timestamp: new Date().toISOString() 
          }
        }),
      });
    } catch (error) {
      console.error('Failed to track download:', error);
    }

    const supsToString = (sups: Supplement[]) => {
      return sups.map(s => `- ${s.name}:\n  Benefits: ${s.benefits.join(', ')}\n  Dosage: ${s.dosage}\n  Usage: ${s.usage}`).join('\n\n');
    };

    const catsToString = (cats: Record<string, Supplement[]>) => {
      return Object.entries(cats).map(([category, sups]) => `${category.toUpperCase()}\n${supsToString(sups)}`).join('\n\n');
    };

    const recommendationsByCategory = recommendations.reduce((acc, supp) => {
      if (!acc[supp.category]) {
        acc[supp.category] = [];
      }
      acc[supp.category].push(supp);
      return acc;
    }, {} as Record<string, Supplement[]>);

    const protocol = `
      Your Personalized Supplement Protocol:

      ${catsToString(recommendationsByCategory)}

      Important Warnings:
      ${warnings.join('\n')}

      Disclaimer: This is not medical advice. Please consult with your healthcare provider.
    `;
    const blob = new Blob([protocol], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supplement-protocol.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6">
              <h3 className="typography-h2 text-camber-text-primary mb-4">Select Your Symptoms:</h3>
              <div className="flex flex-wrap gap-3">
                {allSymptoms.map(symptom => (
                  <motion.button
                    key={symptom}
                    type="button"
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`px-4 py-2 rounded-full  btn-pill text-sm font-medium transition-colors duration-300 ${selectedSymptoms.includes(symptom)
                        ? 'cta-jade text-white shadow-lg'
                        : 'bg-camber-background-medium text-camber-text-secondary hover:bg-camber-background-muted'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {symptom}
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.button
              type="button"
              onClick={handleNext}
              disabled={selectedSymptoms.length === 0}
              className="w-full btn-secondary text-grey disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next
            </motion.button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="medications" className="block typography-label text-camber-text-primary mb-2">
                  Current Medications (comma-separated):
                </label>
                <input
                  type="text"
                  id="medications"
                  value={medications}
                  onChange={e => setMedications(e.target.value)}
                  className="input w-full p-3 rounded-lg focus-ring transition-shadow"
                  placeholder="e.g., Aspirin, Metformin"
                />
              </div>
              <div>
                <label htmlFor="restrictions" className="block typography-label text-camber-text-primary mb-2">
                  Dietary Restrictions (comma-separated):
                </label>
                <input
                  type="text"
                  id="restrictions"
                  value={restrictions}
                  onChange={e => setRestrictions(e.target.value)}
                  className="input w-full p-3 rounded-lg focus-ring transition-shadow"
                  placeholder="e.g., Gluten-free, Vegan"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <motion.button
                type="button"
                onClick={handleBack}
                className="btn-secondary text-grey"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
              <motion.button
                type="submit"
                className="btn-secondary cta-jade text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Recommendations
              </motion.button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 font-sans rounded-2xl shadow-glass">
      {/* Calculator Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-left mb-12"
      >
        <h2 className="typography-h2 text-grey text-pretty mb-4">Supplement Stacking Calculator</h2>
        <p className="text-base sm:text-lg text-grey max-w-2xl">Personalize your wellness journey.</p>
      </motion.div>

      {/* Symptoms and Conditions Form */}
      <form onSubmit={handleSubmit} className="mb-8 glass p-8 rounded-2xl shadow-glass">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-camber-primary">Step {step} of 2</span>
          </div>
          <div className="w-full bg-camber-background-medium rounded-full h-2.5">
            <motion.div
              className="bg-camber-primary h-2.5 rounded-full"
              animate={{ width: `${(step / 2) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
        {renderStep()}
      </form>

      {/* Results Section */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 rounded-2xl shadow-glass"
        >
          <div className="md:flex md:items-center md:justify-between mb-6">
            <h2 className="typography-h2 text-camber-text-primary">Your Personalized Recommendations:</h2>
            {/* Download Protocol Section */}
            <div className="mt-4 md:mt-0 text-left flex flex-col items-start md:items-end">
              <h3 className="typography-h3 text-camber-text-primary mb-2 sr-only">Download Your Protocol</h3>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ReusableButton
                  onClick={handleDownload}
                  className="flex items-center justify-start py-2 px-4 text-sm"
                >
                  <FiDownload className="mr-2" />
                  Download
                </ReusableButton>
              </motion.div>
            </div>
          </div>

          {/* Recommended Supplements */}
          <div className="space-y-8">
            {Object.entries(
              recommendations.reduce((acc, supp) => {
                if (!acc[supp.category]) {
                  acc[supp.category] = [];
                }
                acc[supp.category].push(supp);
                return acc;
              }, {} as Record<string, Supplement[]>)
            ).map(([category, sups]) => (
              <div key={category}>
                <h3 className="typography-h3 text-camber-text-primary mb-4 capitalize">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {sups.map((supplement, index) => (
                    <motion.div
                      key={supplement.id}
                      className="bg-white/80 backdrop-blur-sm border border-camber-sage-light/30 rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-camber-sage-light"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h4 className="typography-h4-sans text-camber-text-primary mb-4">{supplement.name}</h4>
                      
                      <div className="text-sm flex-grow">
                        <SupplementDetailAccordion
                            title="Benefits"
                            icon={<CheckCircle className="w-5 h-5 text-camber-sage-primary" />}
                            content={supplement.benefits}
                            isOpen={openAccordion === `${supplement.id}-benefits`}
                            onToggle={() => setOpenAccordion(openAccordion === `${supplement.id}-benefits` ? null : `${supplement.id}-benefits`)}
                        />
                        <SupplementDetailAccordion
                            title="Dosage"
                            icon={<ClipboardList className="w-5 h-5 text-camber-sage-primary" />}
                            content={supplement.dosage}
                            isOpen={openAccordion === `${supplement.id}-dosage`}
                            onToggle={() => setOpenAccordion(openAccordion === `${supplement.id}-dosage` ? null : `${supplement.id}-dosage`)}
                        />
                        <SupplementDetailAccordion
                            title="Usage"
                            icon={<Clock className="w-5 h-5 text-camber-sage-primary" />}
                            content={supplement.usage}
                            isOpen={openAccordion === `${supplement.id}-usage`}
                            onToggle={() => setOpenAccordion(openAccordion === `${supplement.id}-usage` ? null : `${supplement.id}-usage`)}
                        />
                      </div>

                      <div className="mt-6 pt-4 border-t border-camber-background-muted">
                          <ReusableButton
                              as="a"
                              href={supplement.recommendedProducts[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full !bg-camber-primary !text-white"
                          >
                              View Product
                          </ReusableButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Warnings Section */}
          {warnings.length > 0 && (
            <motion.div
              className="mt-8 p-6 rounded-lg bg-camber-sage-light border border-camber-sage-accent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="typography-h4-sans text-camber-sage-deep mb-4 flex items-center"><FiAlertTriangle className="mr-2" />Important Warnings</h3>
              <ul className="list-disc list-inside text-camber-sage-deep space-y-2">
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </motion.div>
          )}


        </motion.div>
      )}
    </div>
  );
};

export default SupplementStackingCalculator;