'use client';
import React from 'react';

interface SourcesModalProps {
  sources: string[];
  onClose: () => void;
}

const SourcesModal: React.FC<SourcesModalProps> = ({ sources, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Sources</h2>
        <ul className="list-disc pl-5 space-y-2">
          {sources.map((source, index) => (
            <li key={index}>
              <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">{source}</a>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SourcesModal;