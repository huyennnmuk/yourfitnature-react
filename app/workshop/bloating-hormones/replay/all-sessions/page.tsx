'use client';
import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ReusableButton from '@/app/components/ReusableButton';
import { Video, Download, Mic, Star, Send, CalendarDays, BookOpen, Users } from 'lucide-react';
import HeroSection from '@/app/components/HeroSection';
import SocialShareButtons from '@/app/components/SocialShareButtons';
import FurtherReadingSection from '@/app/components/workshop-component/FurtherReadingSection';
import StickyCarousel from '@/app/components/StickyCarousel';
import FeedbackPopup from '@/app/components/workshop-component/FeedbackPopup';
import Link from 'next/link';

const allSessionsReplayData = {
    title: "Complete Bloating Relief Workshop Series Replay",
    subtitle: "Access all four phase-specific workshop replays here.",
    description: "Dive deep into understanding and managing bloating across all phases of your cycle. This comprehensive series covers follicular, ovulatory, luteal, and menstrual phases, providing tailored strategies for each.",
    individualSessions: [
        {
            phase: "Follicular Phase",
            date: "August 26, 2025",
            href: "/workshop/bloating-hormones/replay/follicular",
        },
        {
            phase: "Ovulatory Phase",
            date: "September 2, 2025",
            href: "/workshop/bloating-hormones/replay/ovulatory",
        },
        {
            phase: "Luteal Phase",
            date: "September 9, 2025",
            href: "/workshop/bloating-hormones/replay/luteal",
        },
        {
            phase: "Menstrual Phase",
            date: "September 16, 2025",
            href: "/workshop/bloating-hormones/replay/menstrual",
        },
    ],
    resources: [
        { name: "Complete Series Workbook", size: "15 MB", href: "/downloads/complete-series-workbook.pdf" },
        { name: "All Session Slides", size: "20 MB", href: "/downloads/all-session-slides.pdf" },
    ],
    nextSteps: [
        { title: "Explore Other Resources", description: "Discover more tools and guides for your health journey.", cta: "View Resources", href: "/resources", icon: BookOpen },
        { title: "Join the Community", description: "Connect with others and share your progress.", cta: "Join Community", href: "/community", icon: Users },
    ],
};

const WorkshopAllSessionsReplayPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main id="main">
                {/* Hero Section */}
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1554118879-92093d4bc16e?q=80&w=2070&auto=format&fit=crop"
                    title={allSessionsReplayData.title}
                    subtitle={allSessionsReplayData.subtitle}
                    hideButton={true}
                    hideBanner={false}
                />
                {/* About This Series Section */}
                    <StickyCarousel title="About This Series" subtitle={allSessionsReplayData.description} showCarousel={false} />
                
                <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">

                    {/* Individual Session Replays Section */}
                    <section className="mb-16">
                        <h2 className="typography-h2 text-grey text-pretty text-center mb-8">Individual Session Replays</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {allSessionsReplayData.individualSessions.map((session, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                                    <Video className="w-16 h-16 text-camber-sage-primary mb-4" />
                                    <h3 className="text-xl font-bold text-camber-text-primary mb-2">{session.phase}</h3>
                                    <p className="text-camber-text-secondary mb-4">Recorded on {session.date}</p>
                                    <ReusableButton as="a" href={session.href} className="!bg-camber-sage-primary !text-white mt-auto">
                                        Watch Replay
                                    </ReusableButton>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Series Resources Section */}
                    <section className="mb-16 bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="typography-h2 text-grey text-pretty text-center mb-8">Series Resources</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {allSessionsReplayData.resources.map((resource, index) => (
                                <a key={index} href={resource.href} download className="block p-4 rounded-lg bg-camber-background-light hover:bg-camber-background-muted transition-colors">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-camber-text-primary">{resource.name}</span>
                                        <Download className="w-5 h-5 text-camber-sage-primary" />
                                    </div>
                                    <p className="text-sm text-camber-text-secondary">{resource.size}</p>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Next Steps Section */}
                    <section className="mb-16">
                        <h2 className="typography-h2 text-grey text-pretty text-center mb-8">Next Steps</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {allSessionsReplayData.nextSteps.map((step, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-camber-background-medium flex items-center justify-center mb-5">
                                        <step.icon className="w-8 h-8 text-camber-sage-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-camber-text-primary mb-2">{step.title}</h3>
                                    <p className="text-camber-text-secondary mb-4 flex-grow">{step.description}</p>
                                    <ReusableButton as="a" href={step.href} className="!bg-camber-sage-primary !text-white mt-auto">
                                        {step.cta}
                                    </ReusableButton>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                
            </main>
            {/* Further Reading Section */}
            <FurtherReadingSection phase="all-sessions" params={{ phase: 'all-sessions' }} />
            <Footer />
            <FeedbackPopup workshopId="all-sessions" />
        </div>
    );
};

export default WorkshopAllSessionsReplayPage;
