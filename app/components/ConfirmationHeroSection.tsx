'use client';
import React from 'react';
import { CheckCircle, LucideIcon } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};

interface Workshop {
    phase: string;
    Icon: LucideIcon;
    date: string;
    time: string;
    duration: string;
}

interface ConfirmationHeroSectionProps {
    workshop: Workshop;
    email?: string | null;
}

const ConfirmationHeroSection: React.FC<ConfirmationHeroSectionProps> = ({ workshop, email }) => {
    const WorkshopIcon = workshop.Icon;
    return (
        <motion.section
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            <CheckCircle className="mx-auto h-20 w-20 text-camber-sage-primary" />
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-camber-text-primary">
                {workshop.phase === 'All Sessions' ? 'You\'re Registered for the Complete Workshop Series!' : 'You\'re Registered!'}
            </h1>
            <p className="mt-4 text-lg text-camber-text-secondary">Your spot is confirmed. Here&apos;s what happens next.</p>
            {email && (
                <p className="mt-2 text-md text-camber-text-secondary">
                    A confirmation email has been sent to <strong>{decodeURIComponent(email)}</strong>.
                </p>
            )}

            <div className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-camber-background-muted">
                <WorkshopIcon className="mx-auto h-12 w-12 text-camber-sage-accent mb-4" />
                <h2 className="text-3xl font-bold text-camber-text-primary">{workshop.phase === 'All Sessions' ? 'The Complete Bloating Relief Workshop Series' : `${workshop.phase} Phase Workshop`}</h2>
                <p className="mt-2 text-lg text-camber-text-secondary">{workshop.date} at {workshop.time}</p>
                <p className="text-md text-camber-text-secondary/80">{workshop.duration}</p>
                <p className="mt-6 inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-camber-sage-deep bg-camber-sage-light/50">
                    Faceless - Slides + Audio Only
                </p>
            </div>
        </motion.section>
    );
};

export default ConfirmationHeroSection;
