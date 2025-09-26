import React from 'react';
import Image from 'next/image';
import ReusableButton from './ReusableButton'; // Ensure this path is correct
import { BiSearch, BiCalendarCheck, BiFirstAid } from 'react-icons/bi';

interface Product {
  name: string;
  rationale: string;
  slugpage: string;
  icon?: React.ComponentType;
  iconColor?: string;
}

interface FeaturedProductsSectionProps {
  products: Product[];
}

const blueprintComponents = [
  {
    name: 'Bloating Trigger Detective Quiz',
    rationale: 'An interactive 3-minute assessment that identifies personalized bloating triggers and delivers custom supplement/diet recommendations based on individual symptoms and lifestyle patterns.',
    slugpage: '/bloating-breakthrough-blueprint/bloating-quiz',
    icon: BiSearch,
    iconColor: '#5A684A', // camber-sage-deep
  },
  {
    name: '7-Day Bloating Reset Tracker',
    rationale: 'A downloadable PDF tracker that guides users through systematic bloating elimination using food logs, symptom tracking, and daily action steps with built-in affiliate product recommendations.',
    slugpage: '/bloating-breakthrough-blueprint/reset-tracker',
    icon: BiCalendarCheck,
    iconColor: '#5A684A', // camber-sage-deep
  },
  {
    name: 'Bloating SOS Emergency Toolkit',
    rationale: 'A digital rescue kit containing immediate relief strategies, emergency meal swaps, supplement protocols, and quick fixes for unexpected bloating episodes.',
    slugpage: '/bloating-breakthrough-blueprint/sos-toolkit',
    icon: BiFirstAid,
    iconColor: '#5A684A', // camber-sage-deep
  },
];

const FeaturedProductsSection: React.FC = () => {
  return (
    <div className="bg-camber-background-light py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="typography-h2 text-grey text-pretty">Bloating Breakthrough Blueprint</h2>
          <p className="mt-2 text-lg leading-8 text-camber-text-secondary">
            Your personalized path to digestive wellness.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-camber-background-muted pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blueprintComponents.map((product) => (
            <article key={product.name} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                {/* You can add a category or date here if needed */}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-camber-text-primary group-hover:text-perplexity-link">
                  <a href={product.slugpage}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-camber-text-secondary">{product.rationale}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                {product.icon && (
                  <div className="p-2 rounded-full bg-camber-sage-light">
                    <product.icon
                      size={24}
                      style={{ color: product.iconColor }} // Apply the iconColor style
                    />
                  </div>
                )}
                <ReusableButton as="a" href={product.slugpage} className="!bg-camber-primary !text-white">
                  Learn More
                </ReusableButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;