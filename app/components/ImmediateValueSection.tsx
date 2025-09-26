'use client';
import React, { useState } from 'react';
import { Download, CheckCircle, Loader, FileText, BookOpen, ClipboardCheck, Sheet, LucideIcon } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import ReusableButton from './ReusableButton';
import { trackPreworkshopDownload } from '@/lib/analytics';

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5 + i * 0.1,
            duration: 0.5,
        }
    })
};

interface Resource {
    title: string;
    description: string;
    size: string;
    Icon: LucideIcon;
    href: string;
}

const resources: Resource[] = [
    { title: 'Quick Cycle Assessment', description: "Identify your patterns before the workshop", size: '0.8MB', Icon: FileText, href: '/downloads/pre-workshop/fitnature-cycle-assessment-v1.pdf' },
    { title: 'Workshop Prep Guide', description: "Get the most out of your session", size: '1.2MB', Icon: BookOpen, href: '/downloads/pre-workshop/fitnature-workshop-prep-guide-v1.pdf' },
    { title: 'Tech Setup Checklist', description: "Ensure a smooth, stress-free experience", size: '0.5MB', Icon: ClipboardCheck, href: '/downloads/pre-workshop/fitnature-tech-setup-checklist-v1.pdf' },
    { title: 'Cycle Tracking Template', description: "A handy template to track your cycle", size: '0.9MB', Icon: Sheet, href: '/downloads/pre-workshop/fitnature-cycle-tracking-template-v1.pdf' },
];

type DownloadStatus = 'idle' | 'downloading' | 'success';

interface ImmediateValueSectionProps {
    sessionType: string;
}

const ImmediateValueSection: React.FC<ImmediateValueSectionProps> = ({ sessionType }) => {
    const [downloadStatus, setDownloadStatus] = useState<Record<string, DownloadStatus>>({});

    const handleDownload = (resource: Resource, order: number) => {
        setDownloadStatus(prev => ({ ...prev, [resource.title]: 'downloading' }));
        trackPreworkshopDownload(resource.title, sessionType, order);

        // Simulate download
        setTimeout(() => {
            setDownloadStatus(prev => ({ ...prev, [resource.title]: 'success' }));
        }, 1500);
    };

    const getButtonContent = (resource: Resource) => {
        const status = downloadStatus[resource.title] || 'idle';
        switch (status) {
            case 'downloading':
                return <><Loader className="mr-2 h-5 w-5 animate-spin" /> Downloading...</>;
            case 'success':
                return <><CheckCircle className="mr-2 h-5 w-5 text-green-500" /> Downloaded</>;
            default:
                return <><Download className="mr-2 h-5 w-5" /> Download</>;
        }
    };

    return (
        <motion.section
            className="mt-20"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-balance text-center mb-8 md:mb-12">
                <h2 className="typography-h2 text-grey text-pretty">Get Started Now</h2>
                <p className="text-base sm:text-lg text-grey max-w-2xl">
                    Download these resources to prepare for the workshop and get immediate value.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {resources.map((resource, i) => (
                    <motion.div
                        key={resource.title}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-camber-background-muted flex flex-col text-center items-center"
                        variants={cardVariants}
                        custom={i}
                        whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
                    >
                        <div className="p-4 bg-camber-sage-light rounded-full mb-5">
                            <resource.Icon className="h-8 w-8 text-camber-sage-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-camber-text-primary">{resource.title}</h3>
                        <p className="mt-2 text-md text-camber-text-secondary/80 flex-grow">{resource.description}</p>
                        <p className="text-sm text-camber-text-secondary/60 mt-4 mb-6">{resource.size} PDF</p>
                        <ReusableButton
                            as="a"
                            href={resource.href}
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.preventDefault();
                                handleDownload(resource, i + 1);
                                window.open(resource.href, '_blank');
                            }}
                            download
                            className="w-full"
                            disabled={downloadStatus[resource.title] === 'downloading' || downloadStatus[resource.title] === 'success'}
                        >
                            {getButtonContent(resource)}
                        </ReusableButton>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default ImmediateValueSection;