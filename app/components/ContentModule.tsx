'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, FileText, ChevronDown } from 'lucide-react';

interface ContentModuleProps {
  type: 'text' | 'video';
  title: string;
  content?: string; // For text content, can include markdown
  videoId?: string; // For video content (e.g., YouTube video ID)
  startOpen?: boolean; // New prop to control initial state
}

const ContentModule: React.FC<ContentModuleProps> = ({ type, title, content, videoId, startOpen = true }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  const isCollapsible = type === 'text';

  const Icon = type === 'video' ? PlayCircle : FileText;

  return (
    <div className="mb-8 border rounded-lg shadow-sm  overflow-hidden">
      <button
        className="w-full p-6 text-left flex justify-between items-center"
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
        disabled={!isCollapsible}
      >
        <div className="flex items-center">
          <Icon className="w-6 h-6 mr-4 text-camber-sage-primary" />
          <h2 className="typography-h2 text-grey text-pretty">{title}</h2>
        </div>
        {isCollapsible && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-camber-text-secondary" />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">
              {type === 'text' && content && (
                <div className="prose prose-lg max-w-none text-camber-text-secondary">
                  <p>{content}</p>
                </div>
              )}
              {type === 'video' && videoId && (
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentModule;