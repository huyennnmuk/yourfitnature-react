'use client';
import Image from 'next/image';
import React from 'react';
import { testimonials } from '@/lib/testimonialsData.bak';
import '../styles/TestimonialCards.css';

const TestimonialCards: React.FC = () => {
  const animationDuration = testimonials.length * 40;

  return (
  <section data-section="testimonialCards" className="w-full flex flex-col items-center justify-center py-16 py-20">
    <div className="relative w-full max-w-7xl flex flex-col items-center">
      {/* Decorative blurred backgrounds */}
      <div className="pointer-events-none rounded-full bg-jade opacity-20 blur-[82px] absolute left-0 top-0 h-[80%] w-[43vw] -z-10"></div>
      <div className="pointer-events-none rounded-full bg-jade opacity-20 blur-[82px] absolute right-0 top-0 h-[80%] w-[43vw] -z-10"></div>
      
      {/* Cards Row */}
      <div className="testimonial-scroller w-full overflow-hidden">
        <div className="testimonial-scroller__inner flex" style={{ animationDuration: `${animationDuration}s` }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="testimonial-card-3d-container mx-2 sm:mx-4">
              <div
                className="testimonial-card-3d flex flex-col justify-between bg-[#f6f7f3]/80 border border-[#e6e7e2] shadow-none rounded-[32px] p-6 sm:p-8 md:p-10 min-h-[380px] sm:min-h-[420px] w-[300px] sm:w-[350px] md:w-[420px] max-w-full transition-colors duration-500 hover:bg-[#f6f7f3]"
              >
                <span className="typography-bodyLarge mb-10 block text-pretty" style={{wordBreak:'break-word'}}>{t.quote}</span>
                <div className="flex w-full justify-between items-end mt-auto">
                  <span className="text-[#444] text-sm sm:text-base font-medium whitespace-pre-wrap">
                    {t.name}
                    <br />
                    <span className="text-[#888] text-xs sm:text-sm font-normal">{t.title}</span>
                  </span>
                  <Image
                    alt={t.name}
                    loading="lazy"
                    width={48}
                    height={48}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-[#e6e7e2] shadow"
                    src={t.img}
                    style={{ color: 'transparent' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="w-full flex justify-center mt-12">
        <a
          target="_self"
          className="bg-[var(--camber-secondary)] text-grey px-8 py-3 rounded-full btn-secondary inline-flex items-center"
          href="/"
        >
          See Our Case Studies
        </a>
      </div>
    </div>
  </section>
)};

export default TestimonialCards;