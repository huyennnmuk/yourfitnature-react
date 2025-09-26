import React from 'react';
import { getProductsForPhase, AffiliateProduct } from '@/lib/OneCentralAffiliateDatabase';
import { Product } from '@/lib/getProducts';
import Phase1ClientPage from './Phase1ClientPage';

const Phase1Page = async () => {
  const products: AffiliateProduct[] = await getProductsForPhase(1);

  const carouselProducts: Product[] = products.map(p => ({
    id: p.id,
    name: p.name,
    permalink: p.url ?? '', // Use url for permalink
    slug: (p.url ?? '').split('/').pop() || '',
    description: p.description ?? '',
    price: p.price !== undefined ? String(p.price) : '', // Convert price to string
    images: p.imageUrl ? [{ src: p.imageUrl, alt: p.name }] : [],
    benefits: [],
    certifications: [],
    technicalDetails: [],
    brand: p.brand ?? '',
    rationale: p.rationale ?? '',
    affiliateLink: p.url ?? '',
    relatedProducts: p.relatedProducts ?? [],
  }));

  return <Phase1ClientPage carouselProducts={carouselProducts} />;
};

export default Phase1Page;
