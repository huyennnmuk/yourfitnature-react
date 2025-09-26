import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFeaturesProps {
  technicalDetails?: string[];
  benefits?: string[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ technicalDetails, benefits }) => {
  const FeatureSection = ({ title, features }: { title: string; features: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-xl font-bold text-camber-text-primary">{title}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none" className="w-5 h-5 text-gray-500">
              <path d="M9 1.5L9 19.5M9 19.5L1 11.85M9 19.5L17 11.85" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-200 pt-4 mt-4">
                {features.map((feature, index) => (
                  <div key={index} className={`py-2 ${index !== features.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <p className="text-camber-text-secondary">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-1 gap-8 mt-12">
      {technicalDetails && technicalDetails.length > 0 && <FeatureSection title="Technical details" features={technicalDetails} />}
      {benefits && benefits.length > 0 && <FeatureSection title="Benefits and uniqueness" features={benefits} />}
    </div>
  );
};

export default ProductFeatures;
