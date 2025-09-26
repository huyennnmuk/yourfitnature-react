'use client';
import React, { useState, RefObject } from 'react';
import TurndownService from 'turndown';

interface CopyButtonProps {
  contentRef: RefObject<HTMLElement>;
}

const CopyButton: React.FC<CopyButtonProps> = ({ contentRef }) => {
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const handleCopy = () => {
    if (contentRef.current) {
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(contentRef.current.innerHTML);
      navigator.clipboard.writeText(markdown).then(() => {
        setShowCopyTooltip(true);
        setTimeout(() => {
          setShowCopyTooltip(false);
        }, 2000);
      });
    }
  };

  return (
    <div className="relative">
      <button aria-label="Copy" onClick={handleCopy} type="button" className="focus-visible:bg-offsetPlus hover:bg-offsetPlus text-quiet hover:text-foreground dark:hover:bg-offsetPlus font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out font-sans select-none items-center relative group/button justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square" data-state="closed">
        <div className="flex items-center min-w-0 font-medium gap-1.5 justify-center">
          <div className="flex shrink-0 items-center justify-center size-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-copy">
              <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path>
              <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path>
            </svg>
          </div>
        </div>
      </button>
      {showCopyTooltip && <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded">Copied!</div>}
    </div>
  );
};

export default CopyButton;