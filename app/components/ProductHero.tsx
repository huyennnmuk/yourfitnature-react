'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '../../lib/getProducts';
import AffiliateDisclosureBadge from './AffiliateDisclosureBadge';
import ProductFeatures from './ProductFeatures';
import StickyAffiliateCTA from './StickyAffiliateCTA';


interface ProductHeroProps {
  product: Product;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images && product.images.length > 0 ? product.images[0] : null);

  return (
    <section>
      <div className="container mx-auto px-4 max-w-7xl py-12 md:py-20">
        <div className="lg:flex lg:items-start">
          <div className="lg:w-1/2">
            <div className="mb-4">
              {selectedImage && <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={600}
                height={600}
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />}
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(image)} className={`w-24 h-24 border-2 rounded-lg overflow-hidden ${selectedImage?.src === image.src ? 'border-camber-sage-primary' : 'border-transparent'}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
            {product.category && <p className="text-sm font-bold uppercase text-camber-sage-primary tracking-widest">{product.category}</p>}
            <h1 className="text-4xl md:text-5xl font-bold text-camber-text-primary leading-tight mt-2">
              {product.name}
            </h1>
            <p className="text-lg text-camber-text-secondary mt-4">
              {product.shortDescription}
            </p>
            <p className="text-4xl font-bold text-camber-text-primary mt-6">
              ${product.price}
            </p>
            <div className="mt-6">
              {product.affiliateLink && (
                <AffiliateDisclosureBadge>
                  <StickyAffiliateCTA affiliateLink={product.affiliateLink} buttonText="Buy Now" />
                </AffiliateDisclosureBadge>
              )}
            </div>
            <div className="mt-4 text-sm text-camber-text-secondary">
              {product.moneyBackGuarantee && <p>{product.moneyBackGuarantee}</p>}
            </div>
                      
            <div className="mt-8 border-t border-camber-background-muted pt-6">
              <ProductFeatures technicalDetails={product.technicalDetails} benefits={product.featuresBenefits} />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};


export default ProductHero;