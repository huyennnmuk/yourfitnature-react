'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Leaf, Sun, Sunset, Droplets, Mail, Calendar, ArrowRight } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ConfirmationHeroSection from '@/app/components/ConfirmationHeroSection';
import CalendarIntegrationSection from '@/app/components/CalendarIntegrationSection';
import ImmediateValueSection from '@/app/components/ImmediateValueSection';
import NextStepsSection from '@/app/components/NextStepsSection';
import OptionalEngagementSection from '@/app/components/OptionalEngagementSection';
import { trackWorkshopConfirmationView } from '@/lib/analytics';
import RiskReversal from '@/app/components/RiskReversal';

const sessionData = {
  follicular: {
    phase: 'Follicular',
    Icon: Leaf,
    date: 'September 15, 2025',
    time: '10:00 AM PST',
    duration: '45-60 minutes',
  },
  ovulatory: {
    phase: 'Ovulatory',
    Icon: Sun,
    date: 'September 22, 2025',
    time: '10:00 AM PST',
    duration: '45-60 minutes',
  },
  luteal: {
    phase: 'Luteal',
    Icon: Sunset,
    date: 'September 29, 2025',
    time: '10:00 AM PST',
    duration: '45-60 minutes',
  },
  menstrual: {
    phase: 'Menstrual',
    Icon: Droplets,
    date: 'October 6, 2025',
    time: '10:00 AM PST',
    duration: '45-60 minutes',
  },
  'all-sessions': {
    phase: 'All Sessions',
    Icon: CheckCircle,
    date: 'Multiple Dates',
    time: 'See Emails for Details',
    duration: '4x 45-60 minute sessions',
  }
};

const nextSteps = [
    { icon: Mail, title: "Confirmation Email", description: "You'll receive an email shortly with all these details and your calendar link." },
    { icon: Calendar, title: "24h & 2h Reminders", description: "We'll send you reminders before the workshop begins." },
    { icon: ArrowRight, title: "Replay Access", description: "Can't make it live? A replay will be available immediately after." }
];

const WorkshopConfirmationPageInner = () => {
  const searchParams = useSearchParams();
  const sessionParam = searchParams.get('session') || 'follicular';
  const email = searchParams.get('email');
  const utmSource = searchParams.get('utm_source');
  const workshop = sessionData[sessionParam as keyof typeof sessionData] || sessionData.follicular;
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      trackWorkshopConfirmationView(
        sessionParam,
        utmSource || 'direct',
        'new_registrant'
      );
      hasTracked.current = true;
    }
  }, [sessionParam, utmSource]);

  const allIndividualSessions = Object.values(sessionData).filter(
    (session) => session.phase !== 'All Sessions'
  );

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-6 py-12 pt-32">
        <ConfirmationHeroSection workshop={workshop} email={email} />
        <CalendarIntegrationSection sessionType={sessionParam} workshop={workshop} allSessionDetails={allIndividualSessions} />
        <ImmediateValueSection sessionType={sessionParam} />
        <NextStepsSection nextSteps={nextSteps} sessionType={sessionParam} />
        <OptionalEngagementSection sessionType={sessionParam} />
        <RiskReversal title="Your Peace of Mind" />
      </main>
      <Footer />
    </div>
  );
};

const WorkshopConfirmationPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <WorkshopConfirmationPageInner />
  </Suspense>
);

export default WorkshopConfirmationPage;