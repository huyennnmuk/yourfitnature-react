import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StickyCarousel from '../components/StickyCarousel';
import Footer from '../components/Footer';
import BlogPostsServerWrapper from '../components/BlogPostsServerWrapper';
import SpeechBubblesSection from '../components/SpeechBubblesSection';
import React from 'react';
import BlurHero from '../components/BlurHero';
import FAQList from '../components/FAQList';
import SupplementStackingCalculatorPopup from '../components/SupplementStackingCalculatorPopup';
import BloatingQuizPopup from '../components/BloatingQuizPopup';

const BlogPage = () => {

  const blogFaqs = [
    {
      question: "What's the main focus of this blog?",
      answer: "This blog is dedicated to simplifying the world of gut health. I cut through the noise to provide practical, science-backed advice for busy people, drawing from both in-depth research and my own personal wellness journey."
    },
    {
      question: "Who is behind YourFitNature?",
      answer: "YourFitNature is run by a passionate solopreneur who turned years of personal gut health struggles into a mission. My goal is to share the effective, trusted solutions I've discovered to help you feel your best."
    },
    {
      question: "Are the product recommendations trustworthy?",
      answer: "Absolutely. Every product recommended is one I either use personally or have researched extensively. This site is supported by affiliate commissions, which allows me to keep the content free and ad-free. I only recommend products I genuinely believe in."
    },
    {
      question: "How can I get the most out of this site?",
      answer: "A great place to start is our 3-minute Bloating Quiz to identify your triggers. From there, you can explore our free resources like the 7-Day Reset Tracker, in-depth articles, and the Supplement Stacking Calculator to build a routine that works for you."
    }
  ];
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1758077769943-61c7e1ef2ea8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Our Blog"
          subtitle="Insights and articles on health, wellness, and nature."
          buttonText="Read Articles"
          enhanceContrast={true}
        />
        <StickyCarousel
          title="Latest Articles & Insights"
          subtitle="Stay informed with our expert advice and research."
          buttonText="Explore All Posts"
          showCarousel={false}
        />
        {/* Add other sections for the blog page here */}
        <BlogPostsServerWrapper />
        <div className="py-20 px-4">
        <SpeechBubblesSection />
        </div>
        <div className="py-20 px-4">
          <FAQList faqs={blogFaqs} title="Blog FAQs" />
        </div>
        <BlurHero />
      </main>
      <Footer />
      <BloatingQuizPopup />
      <SupplementStackingCalculatorPopup positionClassName="fixed bottom-4 left-4 z-40" />
    </div>
  );
};

export default BlogPage;
