'use client';
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleOpen}
        style={{ color: 'var(--perplexity-muted)' }}
      >
        <FaInfoCircle className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">Affiliate Disclosure</span>
      </div>
      {isOpen && (
        <div
          className="mt-2 p-3 rounded-md"
          style={{
            backgroundColor: 'rgba(0,0,0,0.02)',
            color: 'var(--perplexity-muted)',
            fontSize: '0.9rem',
          }}
        >
          <p>
            This post contains affiliate links. If you click and make a
            purchase, we may earn a commission at no extra cost to you.
          </p>
        </div>
      )}
    </div>
  );
};

export default Disclaimer;
