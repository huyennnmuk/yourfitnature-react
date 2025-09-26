'use client';
import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.8 } }
};

interface NextStep {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface NextStepsSectionProps {
    nextSteps: NextStep[];
    sessionType: string;
}

const NextStepsSection: React.FC<NextStepsSectionProps> = ({ nextSteps, sessionType }) => {
    return (
        <motion.section
            className="mt-20 max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            <h2 className="text-4xl font-bold text-center text-camber-text-primary">What to Expect</h2>
            <div className="mt-10 space-y-6">
                {nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start p-8 rounded-2xl bg-white shadow-xl border border-camber-background-muted">
                        <div className="flex-shrink-0 bg-camber-sage-light p-4 rounded-full">
                            <step.icon className="h-8 w-8 text-camber-sage-deep" />
                        </div>
                        <div className="ml-6 flex-grow">
                            <h3 className="text-xl font-bold text-camber-text-primary">{step.title}</h3>
                            <p className="mt-1 text-lg text-camber-text-secondary">{step.description}</p>
                        </div>
                        {step.title === "Replay Access" && (
                            <Link href={`/workshop/bloating-hormones/replay/${sessionType}`} className="self-center ml-4 p-2 rounded-full hover:bg-camber-sage-light/50 transition-colors">
                                <ArrowRight className="h-6 w-6 text-camber-sage-primary" />
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-10 text-center text-lg text-camber-text-secondary">
                <p>Need help? <a href="mailto:support@fitnature.com" className="text-camber-sage-primary underline hover:text-camber-sage-deep transition-colors">Contact Support</a></p>
            </div>
        </motion.section>
    );
};

export default NextStepsSection;
