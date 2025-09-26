"use client";

import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml: string;
  element: string;
}

const MobileTOC: React.FC<TableOfContentsProps> = ({ contentHtml, element }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, 'text/html');
    const extractedHeadings: Heading[] = Array.from(doc.querySelectorAll('h2, h3, h4')).map((headingElement) => {
      const level = parseInt(headingElement.tagName.substring(1));
      let id = headingElement.id;
      if (!id) {
        id = `${element}-${headingElement.textContent ? headingElement.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '') : `heading-${Math.random().toString(36).substr(2, 9)}`}`;
      }
      return {
        id,
        text: headingElement.textContent || '',
        level,
      };
    });
    setHeadings(extractedHeadings);

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

  const getPaddingLeft = (level: number) => {
    if (level === 2) return 'pl-0';
    if (level === 3) return 'pl-4';
    if (level === 4) return 'pl-8';
    return 'pl-0';
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 left-4 z-50 p-3 btn-secondary text-grey rounded-full shadow-lg lg:hidden transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Open Table of Contents"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <nav
        className={`fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 p-4 shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">In This Article</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            aria-label="Close Table of Contents"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ul className="mt-4 max-h-60 overflow-y-auto pb-4">
          {headings.map((heading) => (
            <li key={heading.id} className={`mb-2 ${getPaddingLeft(heading.level)}`}>
              <a
                href={`#${heading.id}`}
                onClick={() => setIsOpen(false)}
                className={`block hover:text-gray-800 text-ellipsis whitespace-nowrap overflow-hidden ${activeId === heading.id ? 'font-bold' : ''}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MobileTOC;