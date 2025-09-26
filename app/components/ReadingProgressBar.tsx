'use client';

import React, { useEffect, useState } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    if (totalHeight > 0) {
      setProgress((scrollPosition / totalHeight) * 100);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-[var(--camber-sage-muted)] z-50" style={{ width: `${progress}%` }} />
  );
};

export default ReadingProgressBar;
