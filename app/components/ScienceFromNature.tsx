
import React from 'react';
import { Product } from '../../lib/getProducts';

interface ScienceFromNatureProps {
  product: Product;
}

const ScienceFromNature: React.FC<ScienceFromNatureProps> = ({ product }) => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Science From Nature
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Our products are backed by science and made with natural ingredients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {product.certifications && product.certifications.map((certification, index) => (
            <div key={index} className="flex items-center">
              <div className="text-4xl text-green-500">{certification.icon}</div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {certification.name}
                </h3>
                <p className="text-gray-600">{certification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScienceFromNature;
