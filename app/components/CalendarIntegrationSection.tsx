'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Check, Clipboard, ExternalLink, Smartphone, Globe, Mail, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ReusableButton from './ReusableButton';
import { trackCalendarAddAttempt, trackCalendarAddSuccess } from '@/lib/analytics';

interface Workshop {
  phase: string;
  date: string;
  time: string;
  duration: string;
}

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } }
};

const dropdownVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: 'easeIn' } }
};

interface CalendarOption {
    name: string;
    icon: LucideIcon;
    platform: string;
    url: string;
}

interface CalendarIntegrationSectionProps {
    sessionType: string;
    workshop: {
        phase: string;
        date: string;
        time: string;
        duration: string;
    };
    allSessionDetails?: Workshop[];
}

const CalendarIntegrationSection: React.FC<CalendarIntegrationSectionProps> = ({ sessionType, workshop, allSessionDetails }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getCalendarLinks = (workshopDetails: typeof workshop) => {
        const title = `Bloating & Hormones Workshop: ${workshopDetails.phase} Phase`;
        const description = `Join us for the FitNature Bloating & Hormones Workshop! This session focuses on the ${workshopDetails.phase} phase.`;

        const eventDate = new Date(`${workshopDetails.date} ${workshopDetails.time}`);

        // Google & ICS format (YYYYMMDDTHHMMSSZ)
        const toGoogleICSFormat = (date: Date) => {
            return date.toISOString().replace(/-|:|\.\d{3}/g, '');
        };
        const startTimeGoogleICS = toGoogleICSFormat(eventDate);
        const endTimeGoogleICS = toGoogleICSFormat(new Date(eventDate.getTime() + 60 * 60 * 1000));

        // Outlook format (YYYY-MM-DDTHH:mm:ssZ)
        const toOutlookFormat = (date: Date) => {
            return date.toISOString().split('.')[0] + 'Z';
        }
        const startTimeOutlook = toOutlookFormat(eventDate);
        const endTimeOutlook = toOutlookFormat(new Date(eventDate.getTime() + 60 * 60 * 1000));

        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTimeGoogleICS}/${endTimeGoogleICS}&details=${encodeURIComponent(description)}`;
        const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startTimeOutlook}&enddt=${encodeURIComponent(endTimeOutlook)}&body=${encodeURIComponent(description)}`;
        const yahooUrl = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(title)}&st=${startTimeGoogleICS}&dur=0100&desc=${encodeURIComponent(description)}`;
        const icsUrl = `/api/calendar?session=${workshopDetails.phase.toLowerCase()}`;

        return [
            { name: 'Google Calendar', icon: Globe, platform: 'google', url: googleUrl },
            { name: 'Outlook', icon: Mail, platform: 'outlook', url: outlookUrl },
            { name: 'Apple Calendar', icon: Smartphone, platform: 'apple', url: icsUrl },
            { name: 'Yahoo Calendar', icon: Globe, platform: 'yahoo', url: yahooUrl },
        ];
    };

    const allSessionsCalendarOptions: { session: string; links: CalendarOption[] }[] = [];
    if (sessionType === 'all-sessions' && allSessionDetails) {
        allSessionDetails.forEach(session => {
            allSessionsCalendarOptions.push({
                session: session.phase,
                links: getCalendarLinks(session)
            });
        });
    }

    const singleSessionCalendarOptions: CalendarOption[] = sessionType !== 'all-sessions' ? getCalendarLinks(workshop) : [];

    const calendarOptionsToDisplay = sessionType === 'all-sessions' ? allSessionsCalendarOptions : singleSessionCalendarOptions;

    const handleCalendarClick = (platform: string, url: string) => {
        trackCalendarAddAttempt(platform, sessionType);
        window.open(url, '_blank');
        trackCalendarAddSuccess(platform, sessionType);
        setIsOpen(false);
    };

    const copyDetailsToClipboard = () => {
        const details = `Workshop: ${workshop.phase} Phase\nDate: ${workshop.date} at ${workshop.time}`;
        navigator.clipboard.writeText(details).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <motion.section
            className="mt-16 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-camber-background-muted text-center relative" ref={dropdownRef}>
                <h2 className="text-3xl font-bold text-camber-text-primary">Add to Your Calendar</h2>
                <p className="mt-3 text-lg text-camber-text-secondary">Don&apos;t miss out! Add a reminder with just one click.</p>
                {sessionType === 'all-sessions' ? (
                    <div className="space-y-4">
                        {allSessionsCalendarOptions.map((sessionGroup) => (
                            <div key={sessionGroup.session} className="border-b border-camber-background-muted pb-4 last:border-b-0">
                                <h3 className="text-xl font-semibold text-camber-text-primary mb-3">{sessionGroup.session} Phase</h3>
                                <div className="space-y-2">
                                    {sessionGroup.links.map(({ name, icon: Icon, platform, url }) => (
                                        <a
                                            key={name}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleCalendarClick(platform, url)}
                                            className="flex items-center p-3 text-lg rounded-lg hover:bg-camber-sage-light/50 transition-colors duration-200"
                                        >
                                            <Icon className="mr-4 h-6 w-6 text-camber-sage-primary" />
                                            <span className="flex-grow text-left text-camber-text-primary font-medium">{name}</span>
                                            <ExternalLink className="h-5 w-5 text-camber-text-secondary/50" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <ReusableButton
                            onClick={() => setIsOpen(!isOpen)}
                            className="mt-6 w-full !py-4 !text-lg !bg-camber-sage-primary !text-white hover:!bg-camber-sage-deep transition-colors flex items-center justify-center"
                        >
                            <Calendar className="mr-3 h-6 w-6" />
                            Add to Calendar
                        </ReusableButton>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-camber-background-muted z-10 p-4"
                                >
                                    <ul className="space-y-2">
                                        {singleSessionCalendarOptions.map(({ name, icon: Icon, platform, url }) => (
                                            <li key={name}>
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => handleCalendarClick(platform, url)}
                                                    className="flex items-center p-3 text-lg rounded-lg hover:bg-camber-sage-light/50 transition-colors duration-200"
                                                >
                                                    <Icon className="mr-4 h-6 w-6 text-camber-sage-primary" />
                                                    <span className="flex-grow text-left text-camber-text-primary font-medium">{name}</span>
                                                    <ExternalLink className="h-5 w-5 text-camber-text-secondary/50" />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="border-t border-camber-background-muted my-3"></div>
                                    <button
                                        onClick={copyDetailsToClipboard}
                                        className="flex items-center w-full p-3 text-lg rounded-lg hover:bg-camber-sage-light/50 transition-colors duration-200"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="mr-4 h-6 w-6 text-green-500" />
                                                <span className="flex-grow text-left text-camber-text-primary font-medium">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Clipboard className="mr-4 h-6 w-6 text-camber-sage-primary" />
                                                <span className="flex-grow text-left text-camber-text-primary font-medium">Copy Details</span>
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </motion.section>
    );
};

export default CalendarIntegrationSection;
