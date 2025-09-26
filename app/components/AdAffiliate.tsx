'use client';
import React from 'react';
import { Product } from '../../lib/getProducts';
import markdownToHtml from '../../lib/markdownUtils';
import ReusableButton from './ReusableButton';
import DesktopTOC from './DesktopTOC';
import MobileTOC from './MobileTOC';
import NewsletterSignup from './NewsletterSignup';
import StickyAffiliateCTA from './StickyAffiliateCTA';
import '@/app/styles/blog-post.css';


interface AdAffiliateProps {
  product: Product;
}

const AdAffiliate: React.FC<AdAffiliateProps> = ({ product }) => {
  const [contentHtml, setContentHtml] = React.useState('');

  React.useEffect(() => {
    const processMarkdown = async () => {
      const html = await markdownToHtml(product.description, product.name);
      setContentHtml(html);
    };
    processMarkdown();
  }, [product.description, product.name]);

  const renderContentWithCTA = () => {
    const ctaRegex = /<p>\[CTA_BUTTON(?::\s*(.*?))?\]<\/p>/;
    const match = contentHtml.match(ctaRegex);

    if (!match) {
      return <div className="prose-blog" dangerouslySetInnerHTML={{ __html: contentHtml }} />;
    }

    const buttonText = match[1] || undefined;
    const parts = contentHtml.split(match[0]);

    return (
      <div className="prose-blog">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <div dangerouslySetInnerHTML={{ __html: part }} />
            {index < parts.length - 1 && (
              <StickyAffiliateCTA
                affiliateLink={product.affiliateLink!}
                buttonText={buttonText}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="blog-section blog-post py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 lg:block hidden">
            <DesktopTOC contentHtml={contentHtml} element={product.name} />
          </aside>

          <main className="lg:col-span-6">
            <div className="mb-8">
              <p className="text-base text-perplexity-primary font-semibold tracking-wide">
                Full Details
              </p>
              <h1 className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-perplexity-heading sm:text-5xl">
                {product.name}
              </h1>
            </div>

            {renderContentWithCTA()}

            {product.affiliateLink && (
              <div className="mt-10">
                <StickyAffiliateCTA
                  affiliateLink={product.affiliateLink!}
                  buttonText="Try it!"
                />
              </div>
            )}
          </main>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-48">
              <NewsletterSignup source="product-sidebar" />
            </div>
          </aside>
        </div>
      </div>
      <MobileTOC contentHtml={contentHtml} element={product.name} />
    </div>
  );
};

export default AdAffiliate;