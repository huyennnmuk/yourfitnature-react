'use client';
import React from 'react';
import { BarChart2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ReusableButton from './ReusableButton';
import { trackPollSubmission } from '@/lib/analytics';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1 } }
};

interface OptionalEngagementSectionProps {
    sessionType: string;
}

const OptionalEngagementSection: React.FC<OptionalEngagementSectionProps> = ({ sessionType }) => {
    const handlePollClick = () => {
        // In a real app, you'd show a poll modal and get the answer.
        // For this example, we'll simulate a submission with a default value.
        trackPollSubmission('clicked_poll_button', sessionType);
    };

    return (
        <motion.section
            className="mt-20 max-w-4xl mx-auto grid md:grid-cols-2 gap-10"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-camber-background-muted text-center flex flex-col items-center">
                <BarChart2 className="h-10 w-10 text-camber-sage-primary mx-auto" />
                <h3 className="mt-5 text-2xl font-bold text-camber-text-primary">Help Us Customize Your Experience</h3>
                <p className="mt-3 text-lg text-camber-text-secondary flex-grow">What&apos;s your biggest bloating challenge right now?</p>
                <ReusableButton
                    as="a"
                    href="#"
                    onClick={handlePollClick}
                    className="mt-6 !text-camber-sage-deep !bg-transparent hover:!bg-camber-sage-light/50"
                >
                    Take a quick poll &rarr;
                </ReusableButton>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-camber-background-muted text-center flex flex-col items-center">
                <Users className="h-10 w-10 text-camber-sage-primary mx-auto" />
                <h3 className="mt-5 text-2xl font-bold text-camber-text-primary">Join Fellow Participants</h3>
                <p className="mt-3 text-lg text-camber-text-secondary flex-grow">Connect with others in our private community group.</p>
                <ReusableButton as="a" href="#" className="mt-6 !text-camber-sage-deep !bg-transparent hover:!bg-camber-sage-light/50">Get Invite &rarr;</ReusableButton>
            </div>
        </motion.section>
    );
};

export default OptionalEngagementSection;
