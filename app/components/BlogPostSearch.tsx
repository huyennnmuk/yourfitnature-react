'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';
import Mark from 'mark.js';

interface BlogPostSearchProps {
  contentRef: React.RefObject<HTMLElement>;
}

const BlogPostSearch: React.FC<BlogPostSearchProps> = ({ contentRef }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const markerRef = useRef<Mark | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

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
    if (contentRef.current) {
      markerRef.current = new Mark(contentRef.current);
    }
  }, [contentRef]);

  const handleSearch = () => {
    if (markerRef.current) {
      markerRef.current.unmark({
        done: () => {
          if (searchTerm) {
            markerRef.current?.mark(searchTerm, {
              separateWordSearch: false,
              done: (count) => {
                setTotalMatches(count);
                setCurrentMatch(0);
                if (count > 0) {
                  jumpTo(0);
                }
              },
            });
          } else {
            setTotalMatches(0);
            setCurrentMatch(0);
          }
        },
      });
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (markerRef.current) {
        markerRef.current.unmark();
    }
    setTotalMatches(0);
    setCurrentMatch(0);
  }

  const jumpTo = (index: number) => {
    const marks = contentRef.current?.querySelectorAll('mark');
    if (marks && marks.length > index) {
        marks.forEach(m => m.classList.remove('current'));
        const currentMark = marks[index];
        currentMark.classList.add('current');
        currentMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setCurrentMatch(index + 1);
    }
  }

  const handleNext = () => {
    if (totalMatches > 0) {
      const nextIndex = (currentMatch) % totalMatches;
      jumpTo(nextIndex);
    }
  };

  const handlePrev = () => {
    if (totalMatches > 0) {
      const prevIndex = (currentMatch - 2 + totalMatches) % totalMatches;
      jumpTo(prevIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
    }
  }

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if(e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            setIsExpanded(true);
            searchInputRef.current?.focus();
        }
        if (e.key === 'Escape') {
            setIsExpanded(false);
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        const searchButton = document.getElementById('search-icon-button');
        if (searchPanelRef.current && !searchPanelRef.current.contains(event.target as Node) && searchButton && !searchButton.contains(event.target as Node)) {
            setIsExpanded(false);
        }
    }

    window.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        window.removeEventListener('keydown', handleGlobalKeyDown);
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <>
        <button
            id="search-icon-button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`fixed bottom-24 right-4 z-50 p-3 rounded-full shadow-lg transition-opacity duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
                backgroundColor: 'var(--blog-background)',
                color: 'var(--perplexity-primary)',
                border: '1px solid var(--perplexity-table-border)'
            }}
            aria-label="Toggle search"
        >
            <FaSearch className="h-6 w-6" />
        </button>
        {isExpanded && (
            <div
                ref={searchPanelRef}
                className="fixed bottom-40 right-4 z-50 p-2 rounded-lg shadow-lg flex items-center space-x-2"
                style={{
                    backgroundColor: 'var(--perplexity-accent-bg)',
                    border: '1px solid var(--perplexity-table-border)',
                    fontFamily: 'var(--font-sans)'
                }}
            >
              <div className="relative">
                <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className="border rounded px-2 py-1 w-40 pr-8"
                    style={{
                        borderColor: 'var(--perplexity-table-border)',
                        backgroundColor: 'var(--blog-background)',
                        color: 'var(--perplexity-heading)'
                    }}
                />
                {searchTerm && (
                    <button onClick={handleClear} className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <FaTimes style={{color: 'var(--perplexity-muted)'}}/>
                    </button>
                )}
              </div>
              <button onClick={handleSearch} className="p-2 rounded" style={{backgroundColor: 'var(--perplexity-primary)', color: 'white'}}>
                <FaSearch />
              </button>
              <button onClick={handlePrev} disabled={totalMatches === 0} className="p-2 rounded" style={{backgroundColor: 'var(--perplexity-primary)', color: 'white', opacity: totalMatches === .5 ? 0.5 : 1}}>
                <FaArrowUp />
              </button>
              <button onClick={handleNext} disabled={totalMatches === 0} className="p-2 rounded" style={{backgroundColor: 'var(--perplexity-primary)', color: 'white', opacity: totalMatches === 0 ? 0.5 : 1}}>
                <FaArrowDown />
              </button>
              <div className="text-sm" style={{color: 'var(--perplexity-heading)'}}>
                {totalMatches > 0 ? `${currentMatch}/${totalMatches}` : '0/0'}
              </div>
              <button onClick={() => setIsExpanded(false)} className="p-2 rounded" style={{backgroundColor: 'var(--perplexity-muted)', color: 'white'}}>
                <FaTimes />
              </button>
            </div>
        )}
    </>
  );
};

export default BlogPostSearch;
