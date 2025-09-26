'use client';
import React from 'react';
import { LocalPost } from '../../lib/getPosts';
import markdownToHtml from '../../lib/markdownUtils';
import DesktopTOC from './DesktopTOC';
import MobileTOC from './MobileTOC';
import NewsletterSignup from './NewsletterSignup';
import FooterActions from './FooterActions';
import FeedbackModal from './footerblog/FeedbackModal';
import '@/app/styles/blog-post.css';

interface RelatedBlogPostsProps {
  posts: LocalPost[];
}

const BlogPostDisplay: React.FC<{ post: LocalPost }> = ({ post }) => {
  const [contentHtml, setContentHtml] = React.useState('');
  const contentRef = React.useRef<HTMLElement>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = React.useState(false);

  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  React.useEffect(() => {
    const processMarkdown = async () => {
      const html = await markdownToHtml(post.content, post.title);
      setContentHtml(html);
    };
    processMarkdown();
  }, [post.content, post.title]);

  return (
    <div className="blog-section blog-post py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 lg:block hidden">
            <DesktopTOC contentHtml={contentHtml} element={post.title} />
          </aside>

          <main className="lg:col-span-6" ref={contentRef}>
            <div className="mb-8">
              <p className="text-base text-perplexity-primary font-semibold tracking-wide">
                Related Blog Posts
              </p>
              <h1 className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-perplexity-heading sm:text-5xl">
                {post.title}
              </h1>
            </div>

            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <FooterActions
              contentHtml={contentHtml}
              blogId={post.blogID}
              contentRef={contentRef}
              sources={post.sources}
              onReportFeedback={handleOpenFeedbackModal}
            />
          </main>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-48">
              <NewsletterSignup source="related-blog-post-sidebar" />
            </div>
          </aside>
        </div>
      </div>
      <MobileTOC contentHtml={contentHtml} element={post.title} />
      {isFeedbackModalOpen && (
        <FeedbackModal
          onClose={handleCloseFeedbackModal}
          answer_id={post.blogID}
        />
      )}
    </div>
  );
};

const RelatedBlogPosts: React.FC<RelatedBlogPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div>
      {posts
        .filter(post => post.blogID)
        .map(post => (
        <BlogPostDisplay key={post.blogID} post={post} />
      ))}
    </div>
  );
};

export default RelatedBlogPosts;