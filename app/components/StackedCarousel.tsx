
import React from 'react';
import { Product } from '../../lib/getProducts';
import StackedCarouselClient from './StackedCarouselClient';

interface StackedCarouselProps {
  products: Product[];
  size?: 'small' | 'medium' | 'large';
  maxItems?: number;
  displayPrice?: boolean;
}

const StackedCarousel: React.FC<StackedCarouselProps> = ({ products, size, maxItems, displayPrice }) => {
  if (!products || products.length === 0) {
    return <div className="text-center py-20">No products found.</div>;
  }

  return <StackedCarouselClient products={products} size={size} maxItems={maxItems} displayPrice={displayPrice} />;
};

export default StackedCarousel;

