import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

interface SocialShareButtonsProps {
  title: string;
  url: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url }) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const iconStyle = "w-6 h-6";

  return (
    <div className="flex space-x-4 mt-4">
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-camber-background-medium rounded-full hover:bg-camber-sage-primary text-camber-text-primary hover:text-white transition-colors duration-300">
        <FaTwitter className={iconStyle} />
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-camber-background-medium rounded-full hover:bg-camber-sage-primary text-camber-text-primary hover:text-white transition-colors duration-300">
        <FaLinkedin className={iconStyle} />
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-camber-background-medium rounded-full hover:bg-camber-sage-primary text-camber-text-primary hover:text-white transition-colors duration-300">
        <FaFacebook className={iconStyle} />
      </a>
    </div>
  );
};

export default SocialShareButtons;
