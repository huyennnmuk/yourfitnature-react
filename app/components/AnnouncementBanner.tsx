import Link from 'next/link';
import React from 'react';

interface AnnouncementBannerProps {
  lightText?: boolean;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ lightText = false }) => {
  const textColor = lightText ? 'text-white' : 'text-[#676767]';

  return (
    <div className="bg-transparent text-center py-2 text-sm">
      <p className={textColor}>
        Discover the secrets to a healthier gut! <Link href="/gut-secrets" className="underline">Learn more</Link>
      </p>
    </div>
  );
};

export default AnnouncementBanner;