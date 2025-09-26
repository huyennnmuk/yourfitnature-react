'use client';

import React from 'react';
import { track } from '../../lib/analytics';
import ReusableButton from './ReusableButton';
import { CalendarDays, Download } from 'lucide-react';

const MealPlanTemplates = () => {
  const handleDownload = (plan: string) => {
    track('Download', { category: 'PDF', label: plan });
  };

  const plans = [
    {
        title: '3-Day Bloating-Free Meal Plan',
        description: 'A great way to start your journey to a bloat-free life.',
        href: '/pdf/3-Day Bloating-Free Meal Plan.pdf',
    },
    {
        title: '7-Day Bloating-Free Meal Plan',
        description: 'A comprehensive plan for a full week of bloat-free eating.',
        href: '/pdf/7-Day Bloating-Free Meal Plan.pdf',
    }
  ]

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
      <h2 className="typography-h2 text-grey text-pretty mb-8">Bloating-Free Meal Planning Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map(plan => (
            <div key={plan.title} className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center border border-camber-background-muted hover:shadow-xl transition-shadow duration-300">
                <CalendarDays className="w-12 h-12 text-camber-sage-primary mb-4" />
                <h3 className="typography-h3 text-camber-text-primary mb-2">{plan.title}</h3>
                <p className="typography-body text-camber-text-secondary mb-6 flex-grow">{plan.description}</p>
                <ReusableButton
                    as="a"
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDownload(plan.title)}
                    className="!bg-perplexity-primary !text-white w-full flex items-center justify-center"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                </ReusableButton>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanTemplates;