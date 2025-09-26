'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SuccessStory } from '../../lib/testimonialsData';
import '../styles/TestimonialCards.css';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import ReusableButton from './ReusableButton';

interface TestimonialCardsProps {
  stories: SuccessStory[];
  showCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
  onNavigate?: (path: string) => void;
  className?: string;
  variant?: 'carousel' | 'grid' | 'scroller';
  title?: string;
  useScroller?: boolean;
  scrollerSpeed?: number;
  basePath?: string;
  useLinks?: boolean;
}

const TestimonialCards: React.FC<TestimonialCardsProps> = ({
  stories = [],
  showCta = true,
  ctaText = 'See All Success Stories',
  ctaLink = '/bloating-breakthrough-blueprint/success-stories/',
  onNavigate,
  className = '',
  variant = 'scroller',
  title = 'Success Stories',
  useScroller = true,
  scrollerSpeed = 40,
  basePath = '/bloating-breakthrough-blueprint/success-stories',
  useLinks = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalStories = stories?.length || 0;

  const showPrev = () => setCurrentIndex(i => (i === 0 ? totalStories - 1 : i - 1));
  const showNext = () => setCurrentIndex(i => (i === totalStories - 1 ? 0 : i + 1));

  const navigateTo = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const carouselLabel = `Success Stories Carousel (Story ${currentIndex + 1} of ${totalStories})`;

  const renderStoryCard = (story: SuccessStory, is3D: boolean = false) => {
    const cardContent = (
      <article className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-camber-text-primary mb-2 flex-grow">{story.problem}</h3>
        <p className="text-sm text-camber-text-secondary mb-4">{story.timeline}</p>
        {story.lifeStage && (
          <p className="text-xs font-medium bg-camber-sage-light text-camber-sage-deep rounded-full inline-block px-3 py-1 mb-4 self-start">{story.lifeStage}</p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {story.issueTags?.map(tag => (
            <span key={tag} className="text-xs bg-camber-background-medium text-camber-text-secondary rounded-full px-2 py-1">{tag}</span>
          ))}
        </div>
        {story.credibility?.verified && (
          <div className="flex items-center mt-auto text-camber-sage-primary pt-4 border-t border-camber-background-muted">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span className="text-xs font-semibold">Verified Story</span>
          </div>
        )}
      </article>
    );

    if (useLinks) {
      return (
        <Link href={`${basePath}/${story.caseStudySlug}`} passHref legacyBehavior>
          <a
            className={`story-card block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-full flex flex-col ${is3D ? 'testimonial-card-3d' : ''}`}
            data-ga4-event="story_open"
            data-ga4-param-story_slug={story.caseStudySlug}
            data-ga4-param-story_title={story.problem}
            aria-label={`Read success story: ${story.problem}`}
            onClick={(e) => { if (onNavigate) { e.preventDefault(); navigateTo(`${basePath}/${story.caseStudySlug}`); } }}
          >
            {cardContent}
          </a>
        </Link>
      );
    }

    return (
      <div className={`story-card block p-6 bg-white rounded-2xl shadow-lg h-full flex flex-col ${is3D ? 'testimonial-card-3d' : ''}`}>
        {cardContent}
      </div>
    );
  };

  const renderScrollerCard = (story: SuccessStory, is3D: boolean = false) => {
    const cardContent = (
        <div className={`testimonial-card-3d-container mx-2 sm:mx-4 ${is3D ? 'testimonial-card-3d' : ''}`}>
            <div className="testimonial-card-3d flex flex-col justify-between bg-[#f6f7f3]/80 border border-[#e6e7e2] shadow-none rounded-[32px] p-6 sm:p-8 md:p-10 min-h-[380px] sm:min-h-[420px] w-[300px] sm:w-[350px] md:w-[420px] max-w-full transition-colors duration-500 hover:bg-[#f6f7f3]">
                <p className="typography-bodyLarge mb-10 block text-pretty" style={{wordBreak:'break-word'}}>{story.problem}</p>
                <div className="flex w-full justify-between items-end mt-auto">
                    {story.lifeStage && (
                        <span className="text-[#444] text-sm sm:text-base font-medium whitespace-pre-wrap">
                            {story.lifeStage}
                            {story.credibility?.verified && (
                                <>
                                    <br />
                                    <span className="text-[#888] text-xs sm:text-sm font-normal inline-flex items-center">
                                        <CheckCircle className="w-3 h-3 mr-1.5" />
                                        Verified Story
                                    </span>
                                </>
                            )}
                        </span>
                    )}
                    {story.mediaGallery && story.mediaGallery.length > 0 && (
                        <Image
                            alt={story.problem}
                            loading="lazy"
                            width={40}
                            height={40}
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-[#e6e7e2] shadow"
                            src={story.mediaGallery[0]}
                            style={{ color: 'transparent' }}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    return cardContent;
  };

  if (!stories || stories.length === 0) {
    return (
      <div className={`py-12 ${className}`}>
        <div className="container mx-auto px-4">
          <h2 className="typography-h2 text-grey text-pretty mb-8">{title}</h2>
          <div className="flex justify-center">
            <div className="story-card placeholder p-6" aria-hidden="true">
              <div className="placeholder-content">Loading success stories...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const duplicatedStories = useScroller ? [...stories, ...stories] : stories;
  const animationDuration = stories.length * scrollerSpeed;

  return (
    <section className={`${useScroller ? 'w-full flex flex-col items-center justify-center py-20' : 'py-12'} ${className}`}>
      <div className={`${useScroller ? 'relative w-full max-w-7xl flex flex-col items-center' : 'container mx-auto px-4'}`}>
        <h2 className="typography-h2 text-grey text-center text-pretty mb-12">{title}</h2>
        
        {variant === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div key={story.caseStudySlug} className="testimonial-card-3d-container">
                {renderStoryCard(story, true)}
              </div>
            ))}
          </div>
        )}

        {variant === 'carousel' && (
          <div
            className="relative"
            role="region"
            aria-roledescription="carousel"
            aria-label={carouselLabel}
          >
            <div className="overflow-hidden relative">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {stories.map((story) => (
                  <div key={story.caseStudySlug} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-2xl mx-auto">
                      {renderStoryCard(story)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
              aria-label="Previous success story"
              onClick={showPrev}
            >
              <ChevronLeft className="w-6 h-6 text-camber-text-primary" />
            </button>
            <button
              type="button"
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
              aria-label="Next success story"
              onClick={showNext}
            >
              <ChevronRight className="w-6 h-6 text-camber-text-primary" />
            </button>
          </div>
        )}

        {useScroller && (
            <>
                {/* Decorative blurred backgrounds */}
                <div className="pointer-events-none rounded-full bg-jade opacity-20 blur-[82px] absolute left-0 top-0 h-[80%] w-[43vw] -z-10"></div>
                <div className="pointer-events-none rounded-full bg-jade opacity-20 blur-[82px] absolute right-0 top-0 h-[80%] w-[43vw] -z-10"></div>
                
                <div className="testimonial-scroller w-full overflow-hidden">
                    <div 
                        className="testimonial-scroller__inner flex"
                        style={{ animationDuration: `${animationDuration}s` }}
                    >
                        {duplicatedStories.map((story, index) => {
                            const card = renderScrollerCard(story, true);
                            if(useLinks) {
                                return (
                                    <Link key={`${story.caseStudySlug}-${index}`} href={`${basePath}/${story.caseStudySlug}`} passHref legacyBehavior>
                                        <a onClick={(e) => { if (onNavigate) { e.preventDefault(); navigateTo(`${basePath}/${story.caseStudySlug}`); } }} className="flex-shrink-0 inline-block">
                                            {card}
                                        </a>
                                    </Link>
                                )
                            }
                            return (
                                <div key={`${story.caseStudySlug}-${index}`} className="flex-shrink-0 inline-block">
                                    {card}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )}

        {showCta && (
          <div className={`mt-12 ${useScroller ? 'w-full flex justify-center' : 'text-center'}`}>
            {useScroller ? (
              <a
                href={ctaLink}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { if (onNavigate) { e.preventDefault(); navigateTo(ctaLink); } }}
                className="bg-soil text-white btn-secondary inline-flex items-center"
                data-ga4-event="cta_case_studies_click"
                data-ga4-param-location="TestimonialCards"
              >
                {ctaText}
              </a>
            ) : (
              <ReusableButton
                  as="a"
                  href={ctaLink}
                  className="!inline-block !bg-camber-primary !text-white !py-3 !px-8 !rounded-full hover:!bg-camber-sage-deep !transition-colors !duration-300"
                  data-ga4-event="cta_case_studies_click"
                  data-ga4-param-location="TestimonialCards"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { if (onNavigate) { e.preventDefault(); navigateTo(ctaLink); } }}
              >
                  {ctaText}
              </ReusableButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialCards;