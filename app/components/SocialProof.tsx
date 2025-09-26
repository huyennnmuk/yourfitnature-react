
import React from 'react';
import { Product } from '../../lib/getProducts';

interface SocialProofProps {
  product: Product;
}

const SocialProof: React.FC<SocialProofProps> = ({ product }) => {
  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {product.testimonials && product.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">{testimonial.text}</p>
              <p className="text-gray-900 font-bold mt-4">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
