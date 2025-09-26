import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import { Product } from '../../lib/getProducts';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  permalink: 'test-product',
  slug: 'test-product',
  description: 'This is a test product.',
  price: '9.99',
  images: [
    {
      src: 'test-image.jpg',
      alt: 'Test Image',
    },
  ],
};

describe('ProductDetails', () => {
  it('renders product details correctly', () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('This is a test product.')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });
});
