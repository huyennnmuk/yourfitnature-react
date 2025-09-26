'use client';

import React, { useState, useEffect } from 'react';
import { track } from '../../lib/analytics';
import sosKitData from '../../system/documents/bloating_sos_kit_manifest.json';
import ReusableButton from './ReusableButton';
import { DollarSign, Tag, ShoppingCart } from 'lucide-react';

const BloatingSOSToolkit = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  const handleDownload = () => {
    track('Download', { category: 'PDF', label: 'Bloating SOS Emergency Toolkit' });
  };

  const categories = ['All', ...Array.from(new Set(sosKitData.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All'
    ? (showAll ? sosKitData : sosKitData.slice(0, 3))
    : sosKitData.filter(product => product.category === selectedCategory);

  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="typography-h2 text-grey text-pretty">Bloating SOS Emergency Toolkit</h2>
            <p className="text-base sm:text-lg text-grey max-w-2xl mt-2">A curated list of products for fast bloating relief.</p>
        </div>
        <ReusableButton
          as="a"
          href="/pdf/Bloating_SOS_Emergency_Toolkit.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownload}
          className="!bg-camber-sage-primary !text-white"
        >
          Download PDF
        </ReusableButton>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
            <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === category 
                    ? 'bg-camber-sage-primary text-white shadow-md' 
                    : 'bg-camber-background-medium text-camber-text-secondary hover:bg-camber-background-muted'
                }`}>
                {category}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.sku} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-camber-background-muted">
            <div>
                <h2 className="typography-h3 text-camber-text-primary mb-2">{product.title}</h2>
                <p className="text-sm text-camber-sage-primary font-semibold mb-2">{product.category}</p>
                <p className="typography-body-small text-camber-text-secondary mb-4">{product.description}</p>
                <div className="flex items-center mb-4">
                    <DollarSign className="w-4 h-4 text-camber-sage-accent mr-1" />
                    <span className="text-camber-text-secondary font-semibold">{product.price_range}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {product.taxonomy.map(tag => (
                        <span key={tag} className="bg-camber-background-medium text-camber-text-secondary text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                            <Tag className="w-3 h-3 mr-1.5" />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <ReusableButton
                    as="a"
                    href={product.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full !bg-camber-primary !text-white flex items-center justify-center"
                    onClick={() => track('Click', { category: 'Affiliate', label: product.title })}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Shop Now
                </ReusableButton>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory === 'All' && sosKitData.length > 3 && (
        <div className="text-center mt-8">
          {showAll ? (
            <ReusableButton
              onClick={() => setShowAll(false)}
              className="!bg-camber-sage-primary !text-white"
            >
              Show Less
            </ReusableButton>
          ) : (
            <ReusableButton
              onClick={() => setShowAll(true)}
              className="!bg-camber-sage-primary !text-white"
            >
              Load More
            </ReusableButton>
          )}
        </div>
      )}
    </div>
  );
};

export default BloatingSOSToolkit;