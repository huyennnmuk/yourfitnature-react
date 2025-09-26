'use client';
import React from 'react';

const DownloadTrackerButton = ({ className }: { className?: string }) => {
  const handleClick = async () => {
    try {
      // Track the download event via API
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'Download',
          data: { 
            category: 'PDF',
            label: '7-Day Bloating Reset Tracker',
            timestamp: new Date().toISOString() 
          }
        }),
      });
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  };

  return (
    <a
      href="/pdf/7-Day_Bloating_Reset_Tracker.pdf"
      download="7-Day_Bloating_Reset_Tracker.pdf"
      onClick={handleClick}
      className={className}
    >
      Download Your Free 7-Day Bloating Reset Tracker
    </a>
  );
};

export default DownloadTrackerButton;
