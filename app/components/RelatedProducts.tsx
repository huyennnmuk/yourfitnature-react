import React from 'react';
import { Product } from '../../lib/getProducts';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, currentProductId }) => {
  const relatedProducts = products.filter(p => p.id !== currentProductId);

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>Related Products</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {relatedProducts.map(product => (
          <div key={product.id}>
            <Link href={`/shop/product/${product.slug}`} legacyBehavior>
              <a>
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <Image src={product.images[0]?.src} alt={product.images[0]?.alt || product.name} layout="fill" objectFit="cover" />
                </div>
                <p>{product.name}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
