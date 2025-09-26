'use client';
import React, { useRef, useState, useEffect } from 'react'; // Add useEffect
import Cookies from 'js-cookie'; // Add Cookies
import { FaShoppingBag, FaEye } from 'react-icons/fa';
import { calculateReadingTime } from '@/lib/readingTime';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import DesktopTOC from './DesktopTOC';
import MobileTOC from './MobileTOC';
import NewsletterSignup from './NewsletterSignup';
import FooterActions from './FooterActions';
import RelatedQuestions from './RelatedQuestions';
import BlogPostSearch from './BlogPostSearch';
import Disclaimer from './Disclaimer';
import FeedbackModal from './footerblog/FeedbackModal';
import AffiliatePopup from './AffiliatePopup';
import { OneCentralAffiliateDatabase } from '@/lib/AffiliateProductData';
import '@/app/styles/blog-post.css';

interface RelatedQuestion {
  question: string;
  answer: string;
}

interface BlogPostLayoutProps {
  blogId: string;
  title: string;
  author: string;
  date: string;
  contentHtml: string;
  rawContent: string;
  featuredImage?: string;
  sources?: string[];
  related_questions?: RelatedQuestion[];
  views?: number;
  category?: string;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ blogId, title, author, date, contentHtml, rawContent, featuredImage, sources, related_questions, views, category }) => {
  const readingTime = calculateReadingTime(rawContent);
  const heroBackgroundImage = featuredImage || '/img/default-blog-hero.jpg';
  const contentRef = useRef<HTMLElement>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAffiliatePopupOpen, setIsAffiliatePopupOpen] = useState(false); // Add state back

  useEffect(() => {
    const cookieName = `affiliate-popup-${blogId}`;
    if (!Cookies.get(cookieName)) {
      const timer = setTimeout(() => {
        setIsAffiliatePopupOpen(true);
        Cookies.set(cookieName, 'true', { expires: 365 });
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [blogId]);

  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  const filteredProducts = OneCentralAffiliateDatabase.filter(p => !p.blogId || p.blogId === blogId);
  const productsToShow = filteredProducts.length > 0 ? filteredProducts : OneCentralAffiliateDatabase;

  return (
    <>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroBackgroundImage}
        title={title}
        subtitle={`By ${author} on ${date} • ${readingTime} min read`}
        hideButton={true}
        enhanceContrast={true}
      />

      {/* Main Content Grid */}
      <div className="blog-post blog-section container mx-auto px-4 py-8 -mt-48 relative z-10 rounded-t-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Table of Contents (Desktop) */}
          <aside className="lg:col-span-3 lg:block hidden">
            <DesktopTOC contentHtml={contentHtml} element={blogId} />
          </aside>

          {/* Middle Column: Main Content */}
          <main className="prose-blog mb-8 lg:col-span-6" ref={contentRef as React.RefObject<HTMLElement>}>
            
            {/* Blog Post Meta: Category and Views */}
            <div className="blog-meta">
                {/* Category Badge */}
                <div>
                    {category && (
                        <span className="category-badge">
                            {category}
                        </span>
                    )}
                </div>

                {/* View Count */}
                <div>
                    {typeof views === 'number' && (
                        <div className="view-count">
                            <FaEye />
                            <span>{views.toLocaleString()} views</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Disclaimer */}
            <Disclaimer />

            {/* Main Blog Content */}
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

            {/* Footer Actions (Share, Report) */}
            <FooterActions contentHtml={contentHtml} blogId={blogId} contentRef={contentRef} sources={sources} onReportFeedback={handleOpenFeedbackModal} />
            
            {/* Related Questions Section */}
            <RelatedQuestions related_questions={related_questions} />
          </main>

          {/* Right Column: Newsletter Signup */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-48">
              <NewsletterSignup source="blog-sidebar" />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating/Modal Components */}
      <MobileTOC contentHtml={contentHtml} element={blogId} />
      
      {/* Floating Affiliate Button */}
      <button 
        onClick={() => setIsAffiliatePopupOpen(true)}
        className="floating-affiliate-button"
      >
        <FaShoppingBag className="icon" />
        <span className="text">See Recommended Products</span>
      </button>
      
      {/* Blog Post Search */}
      <BlogPostSearch contentRef={contentRef} />

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <FeedbackModal
          onClose={handleCloseFeedbackModal}
          answer_id={blogId}
        />
      )}
      
      {/* Affiliate Products Popup */}
      <AffiliatePopup 
        isOpen={isAffiliatePopupOpen}
        onClose={() => setIsAffiliatePopupOpen(false)}
        products={productsToShow}
      />
    </>
  );
};

export default BlogPostLayout;