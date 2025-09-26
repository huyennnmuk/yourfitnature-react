
'use client';

import React, { useState } from 'react';
import { Product } from '../../lib/getProducts';

interface DetailedDescriptionProps {
  product: Product;
}

const DetailedDescription: React.FC<DetailedDescriptionProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Learn More
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-lg text-green-500 hover:text-green-600 mt-2"
          >
            {isOpen ? 'Show Less' : 'Show More'}
          </button>
        </div>
        {isOpen && (
          <div className="mt-8">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailedDescription;
