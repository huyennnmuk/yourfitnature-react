"use client";

import React, { useEffect, useState } from 'react';
import ReadingProgressBar from './ReadingProgressBar';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml: string;
  element: string;
}

const DesktopTOC: React.FC<TableOfContentsProps> = ({ contentHtml, element }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, 'text/html');
    const extractedHeadings: Heading[] = Array.from(doc.querySelectorAll('h2, h3, h4')).map((headingElement) => {
      const level = parseInt(headingElement.tagName.substring(1));
      let id = headingElement.id;
      if (!id) {
        id = `${element}-${headingElement.textContent ? headingElement.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '') : `heading-${Math.random().toString(36).substr(2, 9)}`}`;
        headingElement.id = id;
      }
      return {
        id,
        text: headingElement.textContent || '',
        level,
      };
    });
    setHeadings(extractedHeadings);

    // Initially expand all H2 sections
    const initialExpanded = new Set(extractedHeadings.filter(h => h.level === 2).map(h => h.id));
    setExpandedSections(initialExpanded);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    extractedHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      extractedHeadings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [contentHtml, element]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderHeadings = (headingsToRender: Heading[], level: number, parentId?: string) => {
    const filteredHeadings = headingsToRender.filter(h => {
        if (level === 2) {
            return h.level === 2;
        }
        const parentIndex = headings.findIndex(ph => ph.id === parentId);
        const currentIndex = headings.findIndex(ch => ch.id === h.id);
        let nextParentIndex = headings.findIndex((nh, i) => i > parentIndex && nh.level === level -1);
        if (nextParentIndex === -1) {
            nextParentIndex = headings.length;
        }
        return h.level === level && currentIndex > parentIndex && currentIndex < nextParentIndex

    });

    return (
      <ul className={`${level > 2 ? 'pl-4' : ''}`}>
        {filteredHeadings.map((heading, index) => {
          const isExpanded = expandedSections.has(heading.id);
          return (
            <li key={heading.id} className="mb-2">
              <div className="flex items-center">
                {heading.level === 2 && (
                  <button onClick={() => toggleSection(heading.id)} className="mr-2">
                    {isExpanded ? '▼' : '►'}
                  </button>
                )}
                <a
                  href={`#${heading.id}`}
                  className={`block transition-colors hover:text-gray-900 ${activeId === heading.id ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                  {heading.level === 2 ? `${index + 1}.` : ''} {heading.text}
                </a>
              </div>
              {isExpanded && renderHeadings(headings, heading.level + 1, heading.id)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className="sticky top-24 hidden lg:block p-4 max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">In This Article</h2>
        <button onClick={scrollToTop} className="text-sm text-gray-500 hover:text-gray-900">
          Back to Top
        </button>
      </div>
      <ReadingProgressBar />
      <hr className="my-4 border-gray-300" />
      {renderHeadings(headings, 2)}
    </nav>
  );
};

export default DesktopTOC;