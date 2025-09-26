'use client';
import React, { useState, RefObject } from 'react';
import jsPDF from 'jspdf';
import TurndownService from 'turndown';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  contentHtml: string;
  title: string;
  contentRef: RefObject<HTMLElement>;
}

const ExportButton: React.FC<ExportButtonProps> = ({ contentHtml, title, contentRef }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: 'txt' | 'pdf' | 'md') => {
    if (format === 'txt') {
      const blob = new Blob([contentHtml], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      if (contentRef.current) {
        html2canvas(contentRef.current).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${title}.pdf`);
        });
      }
    } else if (format === 'md') {
        const turndownService = new TurndownService();
        const markdown = turndownService.turndown(contentHtml);
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }
    setShowExportMenu(false);
  };

  const toggleExportMenu = () => {
    setShowExportMenu(!showExportMenu);
  };

  return (
    <div className="relative">
      <span>
        <button type="button" onClick={toggleExportMenu} className="focus-visible:bg-offsetPlus hover:bg-offsetPlus text-quiet hover:text-foreground dark:hover:bg-offsetPlus font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out font-sans select-none items-center relative group/button justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 pl-2.5 pr-3" data-state="closed">
          <div className="flex items-center min-w-0 font-medium gap-1.5 justify-center">
            <div className="flex shrink-0 items-center justify-center size-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-file-export">
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
              </svg>
            </div>
            <div className="text-align-center relative truncate leading-loose -mb-px">Export</div>
          </div>
        </button>
      </span>
      {showExportMenu && (
        <div className="absolute bottom-full mb-2 w-40 bg-white rounded-md shadow-lg">
          <button onClick={() => handleExport('pdf')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">PDF</button>
          <button onClick={() => handleExport('md')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Markdown</button>
          <button onClick={() => handleExport('txt')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Text</button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;