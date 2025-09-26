'use client';
import React from 'react';
import { Product } from '../../lib/getProducts';
import DetailedDescription from './DetailedDescription';
import ProductBenefits from './ProductBenefits';
import ProductHero from './ProductHero';
import RelatedProducts from './RelatedProducts';
import ScienceFromNature from './ScienceFromNature';
import SingleTestimonialProductCard from './SingleTestimonialProductCard';
import AdAffiliate from './AdAffiliate';


interface ProductDetailsProps {
  product: Product;
  
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="mt-32">
      <ProductHero product={product} /> 
      {product.testimonials && product.affiliateLink && <SingleTestimonialProductCard testimonials={product.testimonials} affiliateLink={product.affiliateLink} />}
      <AdAffiliate product={product} />
      {/* {product.benefits && <ProductBenefits product={product} />} */}
      {/* <DetailedDescription product={product} /> */}
      {/* {product.certifications && <ScienceFromNature product={product} />} */}
      {/* {product.relatedProducts && <RelatedProducts products={product.relatedProducts} />} */}
    </div>
  );
};

export default ProductDetails;