import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AffiliateProduct } from '@/lib/OneCentralAffiliateDatabase';

interface TwoColumnAffiliateLayoutProps {
  products: AffiliateProduct[];
}

const TwoColumnAffiliateLayout: React.FC<TwoColumnAffiliateLayoutProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8 my-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col sm:flex-row items-center gap-6 border p-6 rounded-xl bg-white shadow-sm"
        >
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <Image
              src={product.imageUrl || '/img/placeholder-product.png'}
              alt={product.name}
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-grow text-center sm:text-left space-y-2">
            <h4 className="text-xl font-bold text-camber-text-primary">{product.name}</h4>
            <p className="text-sm text-camber-text-secondary">{product.description || product.rationale}</p>
            <Link
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 btn-secondary text-grey inline-block"
            >
              Shop Now &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TwoColumnAffiliateLayout;