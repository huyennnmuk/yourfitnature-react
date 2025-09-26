'use client';
import React, { useState } from 'react';
import SourcesModal from './SourcesModal';

interface MoreOptionsMenuProps {
  sources?: string[];
  onReportFeedback: () => void;
}

const MoreOptionsMenu: React.FC<MoreOptionsMenuProps> = ({ sources, onReportFeedback }) => {
  const [showDotsMenu, setShowDotsMenu] = useState(false);
  const [showSourcesModal, setShowSourcesModal] = useState(false);

  const toggleDotsMenu = () => {
    setShowDotsMenu(!showDotsMenu);
  };

  return (
    <>
      <div className="relative">
        <button onClick={toggleDotsMenu} type="button" className="focus-visible:bg-offsetPlus hover:bg-offsetPlus text-quiet hover:text-foreground dark:hover:bg-offsetPlus font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out font-sans select-none items-center relative group/button justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square">
          <div className="flex items-center min-w-0 font-medium gap-1.5 justify-center">
            <div className="flex shrink-0 items-center justify-center size-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-dots">
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              </svg>
            </div>
          </div>
        </button>
        {showDotsMenu && (
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {sources && sources.length > 0 && (
                <button onClick={() => { setShowSourcesModal(true); setShowDotsMenu(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  View Sources
                </button>
              )}
              <button onClick={() => { onReportFeedback(); setShowDotsMenu(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                Report Feedback
              </button>
            </div>
          </div>
        )}
      </div>
      {showSourcesModal && sources && <SourcesModal sources={sources} onClose={() => setShowSourcesModal(false)} />}
    </>
  );
};

export default MoreOptionsMenu;