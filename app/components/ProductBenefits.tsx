
import React from 'react';
import { Product } from '../../lib/getProducts';

interface ProductBenefitsProps {
  product: Product;
}

const ProductBenefits: React.FC<ProductBenefitsProps> = ({ product }) => {
  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          Why You&apos;ll Love It
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {product.benefits && product.benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl text-green-500">{benefit.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mt-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefits;
