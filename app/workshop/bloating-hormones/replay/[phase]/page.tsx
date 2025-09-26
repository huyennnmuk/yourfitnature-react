import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { CalendarDays, BookOpen, Users } from 'lucide-react';
import HeroSection from '@/app/components/HeroSection';
import { getReplayDataByPhase, replayData } from '@/lib/workshopReplayData';
import { notFound } from 'next/navigation';

// Import the new components
import VideoPlayerSection from '@/app/components/workshop-component/VideoPlayerSection';
import ToolkitSection from '@/app/components/workshop-component/ToolkitSection';
import NextStepsSection from '@/app/components/workshop-component/NextStepsSection';
import SupportStackSection from '@/app/components/workshop-component/SupportStackSection';
import FeedbackSection from '@/app/components/workshop-component/FeedbackSection';
import FurtherReadingSection from '@/app/components/workshop-component/FurtherReadingSection';


export async function generateStaticParams() {
  return Object.keys(replayData).map((phase) => ({
    phase,
  }));
}

const WorkshopReplayPage = async ({ params }: { params: { phase: string } }) => {
    const phaseData = getReplayDataByPhase(params.phase);

    if (!phaseData) {
        notFound();
    }

    const { phase, date, resources, affiliateProducts: productPromises } = phaseData;
    const affiliateProducts = await Promise.all(productPromises);

    const nextSteps = [
        { title: "Explore Other Sessions", description: "Register for the Luteal, Ovulatory, and Menstrual phase workshops.", cta: "View Workshops", href: "/workshop/bloating-hormones#register", icon: CalendarDays },
        { title: "Deepen Your Knowledge", description: "Check out our comprehensive roadmap for long-term hormonal health.", cta: "See the Roadmap", href: "/roadmap", icon: BookOpen },
        { title: "Join the Community", description: "Take part in our community challenges and connect with others.", cta: "Join Challenge", href: "/challenge", icon: Users },
    ];

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
        <div className="">
            {/* Standard page header */}
            <Header />
            
            <main>
                {/* Hero section with dynamic title and date */}
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1587902673915-631e5ba4488f?q=80&w=2092&auto=format&fit=crop"
                    title={`${phase} Workshop Replay`}
                    subtitle={`Recorded on ${date}`}
                    hideButton={false}
                    buttonText="Access Your Replay"
                    hideBanner={false}
                />

                {/* Main content container */}
                <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
                    
                    {/* Section for Video Player, Chapters, and Toolkit */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <VideoPlayerSection phaseData={phaseData} />
                        <ToolkitSection resources={resources} />
                    </section>

                    {/* "Continue Your Journey" section with next steps */}
                    <NextStepsSection nextSteps={nextSteps} />

                    {/* Affiliate product recommendations */}
                    <SupportStackSection affiliateProducts={affiliateProducts.map(product => product ? { ...product, rationale: product.rationale ?? "" } : undefined)} />

                    {/* User feedback collection form */}
                    <FeedbackSection workshopId={params.phase} />

                    
                </div>
                {/* Further reading and social sharing */}
                    <FurtherReadingSection phase={phase} params={params} />
            </main>
            
            {/* Standard page footer with dynamic links */}
            <Footer 
                navLinks={workshopNavLinks}
                policyLinks={workshopPolicyLinks}
                legalText={workshopLegalText}
            />
        </div>
    );
}

export default WorkshopReplayPage;