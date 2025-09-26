import React from 'react';
import { getWorkshopTestimonialBySlug, workshopTestimonials } from '@/lib/workshopTestimonialsData';
import { notFound } from 'next/navigation';
import WorkshopStoryLayout from '@/app/components/WorkshopStoryLayout';

export async function generateStaticParams() {
  return workshopTestimonials.map((story) => ({
    slug: story.caseStudySlug,
  }));
}

const WorkshopSuccessStoryPage = ({ params }: { params: { slug: string } }) => {
  const story = getWorkshopTestimonialBySlug(params.slug);

  if (!story) {
    notFound();
  }

  const workshopNavLinks = [
    { href: "/bloating-breakthrough-blueprint/bloating-quiz", text: "Quiz" },
    { href: "/tracker", text: "Tracker" },
    { href: "/meal-plans", text: "Meal Plans" },
    { href: "/sos-toolkit", text: "SOS Toolkit" },
    { href: "/success-stories", text: "Success Stories" },
    { href: "/roadmap", text: "Roadmap" },
  ];

  const workshopPolicyLinks = [
    { href: "/about", text: "About FitNature" },
    { href: "/privacy-policy", text: "Privacy Policy" },
    { href: "/affiliate-disclosure", text: "Affiliate Disclosure" },
    { href: "/contact", text: "Contact" },
  ];

  const workshopLegalText = "Legal Disclaimer: This workshop is for educational purposes only. For diagnosis or persistent symptoms, consult a qualified health professional.";

  return (
    <WorkshopStoryLayout
      story={story}
      navLinks={workshopNavLinks}
      policyLinks={workshopPolicyLinks}
      legalText={workshopLegalText}
    />
  );
};

export default WorkshopSuccessStoryPage;