"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import React from 'react';
import logo from '@/public/images/YourFitNatureplusDescription.png';

interface NavItem {
  name: string;
  href: string;
}

interface HeaderProps {
  navItems?: NavItem[];
  secondaryNavItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { name: 'Shop', href: '/shop' },
  { name: 'Blog', href: '/blog' },
  { name: 'Bloating', href: '/bloating-breakthrough-blueprint' },
  { name: 'Roadmap', href: '/bloating-recovery-roadmap' },
];

const defaultSecondaryNavItems: NavItem[] = [
  { name: 'Community', href: '/community-challenge' },
  { name: 'Workshop', href: '/workshop/bloating-hormones' },
];

export default function Header({ navItems = defaultNavItems, secondaryNavItems = defaultSecondaryNavItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const allNavItems = [...navItems, ...secondaryNavItems];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  return (
    <Fragment>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 max-w-7xl mx-4 md:mx-8 lg:mx-auto mt-4 md:mt-8 rounded-xl ${isScrolled ? 'shadow-md' : ''} glass py-3 px-4 md:px-8`}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: isScrolled ? 'hsla(0, 0%, 96%, 0.5)' : 'hsla(0, 0%, 96%, 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="mx-auto w-full">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="nav-item text-sm font-bold text-grey">
                  {item.name}
                  <span className="nav-dot"></span>
                </Link>
              ))}
            </nav>

            {/* Centered Logo for all screens */}
            <div className="flex items-center justify-center flex-shrink-0">
              <Link href="/" className="block" aria-label="YourFitNature Home">
                <Image
                  src={logo}
                  alt="YourFitNatureplusDescription Logo"
                  width={260}
                  height={64}
                  priority
                  className="mx-auto"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.04))' }}
                />
              </Link>
            </div>

            {/* Desktop Secondary Navigation & CTA */}
            <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end">
              {secondaryNavItems.map((item) => (
                <Link key={item.name} href={item.href} className="nav-item text-sm font-bold text-grey">
                  {item.name}
                  <span className="nav-dot"></span>
                </Link>
              ))}
              <Link href="/supplement-stacking-calculator" className="btn-secondary text-grey !text-white !bg-[#20808D]">
                Build Your Stack
              </Link>
              <ThemeSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center justify-end w-1/3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="focus:outline-none transition-colors z-50 relative p-2"
                style={{ color: 'var(--soil)' }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <div className="relative w-6 h-6">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 flex space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 flex space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-br from-[#eafbe2] via-[#f8f0e0] to-[#b4dfa5] backdrop-blur-xl lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mx-auto h-full flex flex-col justify-center items-center px-4 sm:px-8">
          <nav className="flex flex-col justify-center items-center space-y-6">
            {allNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl font-medium hover:text-soil transition-colors"
                style={{ color: 'var(--camber-text-primary)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="w-full flex justify-center mt-12">
            <Link
              href="/supplement-stacking-calculator"
              className="btn-secondary !text-white !bg-[#20808D] px-10 py-3 text-base font-medium tracking-wide"
              style={{maxWidth: 280}}
              onClick={() => setIsMenuOpen(false)}
            >
              Build Your Stack
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}