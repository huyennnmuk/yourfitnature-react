"use client";
import React from 'react';
import { track } from '../../lib/analytics';

const ResourcesPage = () => {
  const handleAffiliateClick = (link: string) => {
    track('Click', { category: 'Affiliate', label: link });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Resources</h1>
      <p className="mb-6">Here are some recommended products and services to help you on your bloat-free journey. (Note: Some of these are affiliate links).</p>
      <div className="flex flex-col gap-8">
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Meal Delivery Services</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><a href="#" onClick={() => handleAffiliateClick('Green Chef')} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Green Chef</a></li>
            <li><a href="#" onClick={() => handleAffiliateClick('HelloFresh')} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">HelloFresh</a></li>
            <li><a href="#" onClick={() => handleAffiliateClick('Daily Harvest')} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Daily Harvest</a></li>
          </ul>
        </div>
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Specialty Foods</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><a href="#" onClick={() => handleAffiliateClick('Thrive Market')} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Thrive Market</a></li>
            <li><a href="#" onClick={() => handleAffiliateClick('Imperfect Foods')} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Imperfect Foods</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;