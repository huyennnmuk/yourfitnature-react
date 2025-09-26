import React from 'react';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/24/solid';

interface PremiumContentUpsellProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  isLocked?: boolean;
}

const PremiumContentUpsell: React.FC<PremiumContentUpsellProps> = ({ title, description, buttonText, link, isLocked = false }) => {
  const containerClasses = isLocked
    ? 'bg-gray-50'
    : 'bg-glass-bg';

  const titleClasses = isLocked ? 'text-gray-500' : 'text-camber-text-primary';
  const descriptionClasses = isLocked ? 'text-gray-500' : 'text-camber-text-secondary';
  const buttonClasses = isLocked
    ? 'btn-secondary text-grey'
    : 'bg-camber-primary text-white hover:bg-camber-primary-dark';

  return (
    <div className={`p-8 rounded-2xl shadow-lg text-center transition-transform transform ${containerClasses}`}>
      <div className="flex items-center justify-center mb-4">
        {isLocked && <LockClosedIcon className="h-8 w-8 text-gray-400 mr-3" />}
        <h3 className={`typography-h3 ${titleClasses}`}>{title}</h3>
      </div>
      <p className={`mt-2 mb-6 max-w-2xl mx-auto ${descriptionClasses}`}>
        {description}
      </p>
      <Link href={link} className={` ${buttonClasses}`}>
        {buttonText}
      </Link>
    </div>
  );
};

export default PremiumContentUpsell;