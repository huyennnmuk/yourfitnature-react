"use client";
import Image from 'next/image';
import NewsletterSignup from "./NewsletterSignup";
import Link from 'next/link';
import { FaLinkedinIn } from 'react-icons/fa';
import React from 'react';

// Define types for props
interface NavLink {
  href: string;
  text: string;
}

interface FooterProps {
  navLinks?: NavLink[];
  policyLinks?: NavLink[];
  legalText?: string;
  hideNewsletter?: boolean;
}

// Default data
const defaultNavLinks: NavLink[] = [
  { href: "/shop", text: "Shop" },
  { href: "/blog", text: "Blog" },
  { href: "/bloating-breakthrough-blueprint", text: "Gut Bloating Resources" },
  { href: "/bloating-sos-toolkit", text: "Bloating Toolkit" },
  { href: "/community-challenge", text: "Community Challenge" },
];

const defaultPolicyLinks: NavLink[] = [
    { href: "/about-us", text: "About YourFitNature" },
];

const Footer: React.FC<FooterProps> = ({ 
  navLinks = defaultNavLinks, 
  policyLinks = defaultPolicyLinks, 
  legalText
}) => {
  return (
    <div className="px-gutter-mobile md:px-gutter-desktop relative py-gutter-mobile pt-8 md:py-gutter-desktop md:pt-gutter-desktop">
      <div className="pointer-events-none absolute inset-0 bg-jadeLight/90 blur-3xl" />
      <footer className="relative min-h-[100vh] flex flex-col justify-between text-gray-800 px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Logo/Title left, Button right */}
        <div className="hidden sm:flex justify-between items-center pt-8 pb-4 max-w-7xl mx-auto w-full">
          <div className="flex flex-row items-center space-x-4">
            <Link href="/" className="block" aria-label="YourFitNature Home">
              <Image
                src="/YourFitNatureplusdescription.svg"
                alt="YourFitNatureplusdescription Logo"
                width={260}
                height={64}
                className="h-8 w-auto"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.04))', maxHeight: '96px' }}
              />
            </Link>
            
          </div>
          
          <Link href="/supplement-stacking-calculator" className="btn-secondary text-grey">Find Your Custom Stack</Link>
        </div>

        {/* Centered Main Message */}
        <div className="flex -translate-y-2.5 flex-col items-center justify-center gap-y-2 md:translate-y-0">
          <h2 className="typography-h2 shadow-text max-w-[90%] text-balance text-center text-[#505F4B] md:max-w-[26ch] mb-4">Heal Your Gut. Reclaim Your Energy.</h2>
          <p className="text-sm sm:text-base md:text-lg text-grey text-center mb-8">Science-backed tools to rebalance your microbiome <br></br>and fuel your clarity from the inside out.</p>
          <NewsletterSignup source="footer" />
        </div>

        {/* Bottom Navigation and Compliance */}
        <div className="w-full max-w-7xl mx-auto pb-2">
          {/* Bottom nav bar: LinkedIn left, nav links center, badge right */}
          <div className="flex flex-col border-t border-gray-200 pt-4 gap-y-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: LinkedIn icon */}
            <div className="flex justify-center sm:justify-start sm:w-1/4 mb-2 sm:mb-0">
              <a href="#" aria-label="LinkedIn" className="inline-flex items-center text-gray-600 hover:text-gray-900 text-xl">
                <FaLinkedinIn />
              </a>
            </div>
            {/* Center: Navigation links */}
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-base sm:w-2/4">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} className="nav-item text-sm font-medium">
                  {link.text}
                  {index < navLinks.length - 1 && <span className="nav-dot"></span>}
                </Link>
              ))}
            </nav>
            {/* Right: HIPAA badge */}
            <div className="flex justify-center sm:justify-end sm:w-1/4 mt-2 sm:mt-0">
              <a
              className="col-span-1 col-start-2 row-start-2 ml-auto flex items-center md:col-start-3 md:row-start-1 md:justify-center"
              href="https://www.aptible.com/secured-by-aptible/?utm_campaign=secured-by-aptible&utm_content=${d5672dcb-e0c9-4c03-b40d-680c058a846e}"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Image
                src="https://cdn.sanity.io/images/rutp9o6i/production/0ed8691f430ba4687ee8f3981ee1a0e800d403f5-532x160.png"
                alt="Hiipa Compliance"
                width={128}
                height={40}
                className="w-20 md:w-32 mix-blend-multiply"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
              </a>
            </div>
          </div>
          {/* Policy links row below nav, centered */}
          <div className="w-full text-center mt-4 space-y-2">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
                {policyLinks.map((link, index) => (
                    <Link key={index} href={link.href} className="nav-item">
                        {link.text}
                        {index < policyLinks.length - 1 && <span className="nav-dot"></span>}
                    </Link>
                ))}
            </div>
            {legalText && (
                <p className="text-xs text-gray-500/80 pt-2">
                    {legalText}
                </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
