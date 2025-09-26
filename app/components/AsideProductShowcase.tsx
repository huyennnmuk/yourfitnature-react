'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ReusableButton from './ReusableButton';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Product } from '@/lib/getProducts';

interface AsideProductShowcaseProps {
  products: Product[];
}

const AsideProductShowcase: React.FC<AsideProductShowcaseProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-camber-background-light/80 backdrop-blur-sm border border-camber-sage-light/30 rounded-2xl shadow-lg p-6">
      <button className="w-full flex justify-between items-center mb-4" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-xl font-bold text-camber-text-primary">Featured Products</h2>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="space-y-6">
              {products.map((product) => (
                <li key={product.name} className="flex flex-col items-start">
                  <div className="flex items-center mb-3">
                    {product.images && product.images[0] && (
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full bg-camber-background-medium mr-3"
                      />
                    )}
                    <h3 className="text-md font-semibold leading-6 text-camber-text-primary">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-camber-text-secondary mb-4">{product.shortDescription}</p>
                  <ReusableButton as="a" href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="!bg-camber-primary text-center !text-white !py-2 !px-4 !text-sm !w-full hover:!bg-camber-sage-deep transition-colors duration-300">
                    Buy Now
                  </ReusableButton>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AsideProductShowcase;