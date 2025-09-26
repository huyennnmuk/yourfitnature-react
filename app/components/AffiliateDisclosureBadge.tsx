import React from 'react';
import InfoIcon from './InfoIcon';

interface AffiliateDisclosureBadgeProps {
  children: React.ReactNode;
  tooltipText?: string;
}

const AffiliateDisclosureBadge: React.FC<AffiliateDisclosureBadgeProps> = ({
  children,
  tooltipText = 'As an affiliate, we may earn from qualifying purchases. This helps support our research and content.',
}) => {
  const disclosureId = 'affiliate-disclosure-text';

  return (
    <div className="relative inline-block">
      {children}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
        <div className="group relative flex items-center">
          <InfoIcon />
          <div
            id={disclosureId}
            className="absolute bottom-full left-1/2 mb-2 w-48 max-w-xs -translate-x-1/2 rounded-lg bg-gray-800 p-2 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:w-64"
            role="tooltip"
          >
            {tooltipText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDisclosureBadge;