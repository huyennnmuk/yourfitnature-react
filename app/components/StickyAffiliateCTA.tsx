
import React from 'react';
import ReusableButton from './ReusableButton';

interface AffiliateCTAProps {
  affiliateLink: string;
  buttonText?: string;
}

const StickyAffiliateCTA: React.FC<AffiliateCTAProps> = ({ affiliateLink, buttonText = "Shop Now" }) => {
  return (
    <div className="mt-6">
      <ReusableButton href={affiliateLink} as="a" size="lg" className="bg-perplexity-primary !text-white !no-underline hover:bg-perplexity-primary-dark">
          {buttonText}
      </ReusableButton>
    </div>
  );
};

export default StickyAffiliateCTA;
