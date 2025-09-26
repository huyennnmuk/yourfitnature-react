'use client';
import React from 'react';
import { SuccessStory } from '@/lib/testimonialsData'; // Keep this for the type
import { workshopTestimonials } from '@/lib/workshopTestimonialsData'; // Import workshop testimonials
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { CheckCircle, ChevronRight } from 'lucide-react';
import ReusableButton from '@/app/components/ReusableButton';
import { motion } from 'framer-motion';
import HeroSection from '@/app/components/HeroSection';
import NewsletterSignup from './NewsletterSignup';
import DesktopTOC from './DesktopTOC';
import MobileTOC from './MobileTOC';
import '@/app/styles/blog-post.css';
import BloatingQuizPopup from './BloatingQuizPopup';
import TestimonialCards from './TestimonialCards';
import ScrollToTopButton from './ScrollToTopButton';
import AsideProductShowcase from './AsideProductShowcase';
import AsideProductPopup from './AsideProductPopup';

interface Product {
  id: string;
  name: string;
  permalink: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: {
    src: string;
    alt: string;
  }[];
  price: string;
  benefits?: {
    icon: string;
    title: string;
    description: string;
  }[];
  testimonials?: {
    text: string;
    author: string;
    title: string;
    img?: string;
  }[];
  certifications?: {
    icon: string;
    name: string;
    description: string;
  }[];
  affiliateLink?: string;
  relatedProducts?: string[];
  relatedBlogPosts?: string[];
  technicalDetails?: string[];
  featuresBenefits?: string[];
  moneyBackGuarantee?: string;
  category?: string;
}

interface Link {
  href: string;
  text: string;
}

interface WorkshopStoryLayoutProps {
  story: SuccessStory;
  navLinks: Link[];
  policyLinks: Link[];
  legalText: string;
}

const WorkshopStoryLayout: React.FC<WorkshopStoryLayoutProps> = ({ story, navLinks, policyLinks, legalText }) => {
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      if (story.featuredProductIds) {
        const products = await Promise.all(
          story.featuredProductIds.map(id =>
            fetch(`/api/products/${id}`).then(res => res.json())
          )
        );
        setFeaturedProducts(products.filter(p => p && !p.error));
      }
    };
    fetchProducts();
  }, [story.featuredProductIds]);

  const contentHtml = React.useMemo(() => {
    let html = '';
    story.protocol.steps.forEach(step => {
      html += `<h2>${step.step}</h2><p>${step.description}</p>`;
    });
    return html;
  }, [story.protocol.steps]);

  const subtitle = `${story.lifeStage} • ${story.timeline}`;
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourfitnature.com/workshop/bloating-hormones/success-stories/${story.caseStudySlug}`,
    },
    headline: story.problem,
    description: story.protocol.steps.map(step => step.description).join(' '),
    image: story.mediaGallery,
    author: {
      '@type': 'Person',
      name: story.lifeStage,
    },
    publisher: {
      '@type': 'Organization',
      name: 'YourFitNature',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourfitnature.com/YourFitNatureplusdescription.svg',
      },
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
        />
      <Header />
      <main>
        <HeroSection
          backgroundImage="https://cdn.sanity.io/images/rutp9o6i/production/6f324ad200e683180df792086f2d1c17d1c41f53-2560x2000.webp?w=1920&fit=max&auto=format&h=1500&q=100"
          title={story.problem}
          subtitle={subtitle}
          hideBanner={false}
          hideButton={true}
          avatarImage={story.mediaGallery?.[0]}
        />
        <div className="blog-post blog-section container mx-auto px-4 -mt-48 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <aside className="lg:col-span-3 lg:block hidden">
                <DesktopTOC contentHtml={contentHtml} element="protocol" />
              </aside>
              <div className="lg:col-span-6 rounded-2xl  p-8">
                <div className="prose lg:prose-xl max-w-none mx-auto">
                  <h2 className="text-3xl font-bold text-camber-text-primary mb-8">The Protocol</h2>
                  <ul className="space-y-8">
                    {story.protocol.steps.map((step, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="flex-shrink-0 mr-6">
                          <div className="w-12 h-12 bg-perplexity-primary rounded-full flex items-center justify-center font-bold text-3xl text-camber-background-muted shadow-inner">{index + 1}</div>
                        </div>
                        <div>
                          <h3 id={`protocol-${step.step.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-xl font-bold text-camber-text-primary mb-1">{step.step}</h3>
                          <p className="text-camber-text-secondary">{step.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              <aside className="lg:col-span-3">
                <div className="sticky top-32 space-y-8">
                  {featuredProducts.length > 0 && (
                    <AsideProductShowcase products={featuredProducts} />
                  )}
                  <NewsletterSignup source="workshop-story-sidebar" />
                </div>
              </aside>
            </div>
            {story.credibility?.verified && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex items-center justify-center mt-16"
              >
                <CheckCircle className="w-8 h-8 text-camber-sage-primary mr-3" />
                <span className="text-xl font-semibold text-camber-sage-primary">Verified Story</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-center mt-16"
            >
              <ReusableButton as="a" href="/workshop/bloating-hormones/" className="btn-secondary text-grey">
                Back to Workshop <ChevronRight className="inline-block ml-2" />
              </ReusableButton>
            </motion.div>
          </div>  
        </div>
        <TestimonialCards
            stories={workshopTestimonials}
            variant="scroller"
            useScroller={true}
            title="More Workshop Success Stories"
        />
      </main>
      <Footer navLinks={navLinks} policyLinks={policyLinks} legalText={legalText} />
      <MobileTOC contentHtml={contentHtml} element="protocol" />
      <BloatingQuizPopup positionClassName="fixed bottom-36 right-4 z-40" />
      {featuredProducts.length > 0 && <AsideProductPopup products={featuredProducts} positionClassName="fixed bottom-20 right-4 z-40" />}
      <ScrollToTopButton />
    </div>
  );
};

export default WorkshopStoryLayout;