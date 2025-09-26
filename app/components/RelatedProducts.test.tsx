import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedProducts from './RelatedProducts';

jest.mock('../../lib/getProducts', () => ({
  getProducts: jest.fn(() => Promise.resolve([
    { id: 2, name: 'Related Product 1', slug: 'related-product-1', images: [{ src: '', alt: '' }] },
    { id: 3, name: 'Related Product 2', slug: 'related-product-2', images: [{ src: '', alt: '' }] },
  ])),
}));

describe('RelatedProducts', () => {
  it('renders related products', async () => {
    render(<RelatedProducts currentProductId={1} />);

    expect(await screen.findByText('Related Product 1')).toBeInTheDocument();
    expect(await screen.findByText('Related Product 2')).toBeInTheDocument();
  });
});
