'use client';
import React, { useState } from 'react';
import WorkshopVideoPlayer from '@/app/components/WorkshopVideoPlayer';
import ReusableButton from '@/app/components/ReusableButton';
import { Mic, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the types for the props
interface Chapter {
    time: string;
    title: string;
    description?: string; // Optional description for accordion content
}

interface PhaseData {
    videoUrl: string;
    audioUrl: string;
    audioDownloadName: string;
    videoChapters: Chapter[];
}

interface VideoPlayerSectionProps {
    phaseData: PhaseData;
}

const VideoPlayerSection: React.FC<VideoPlayerSectionProps> = ({ phaseData }) => {
    const [isChaptersOpen, setIsChaptersOpen] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const handleChapterToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="lg:col-span-2">
            <WorkshopVideoPlayer videoUrl={phaseData.videoUrl} />
            <div className="mt-4 rounded-lg shadow-sm overflow-hidden">
                <button
                    onClick={() => setIsChaptersOpen(!isChaptersOpen)}
                    className="w-full flex items-center justify-between p-4 text-left"
                >
                    <div className="flex items-center">
                        <h3 className="text-xl font-bold text-camber-text-primary">Chapters</h3>
                        <motion.div
                            animate={{ rotate: isChaptersOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-2"
                        >
                            <ChevronDown className="w-5 h-5 text-camber-text-secondary" />
                        </motion.div>
                    </div>
                    <ReusableButton as="a" href={phaseData.audioUrl} download={phaseData.audioDownloadName} className="!text-sm !py-2 !px-4 flex items-center">
                        <Mic className="w-4 h-4 mr-2" />
                        Download Audio
                    </ReusableButton>
                </button>
                <AnimatePresence>
                    {isChaptersOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 border-t border-camber-background-muted">
                                <div className="space-y-2">
                                    {phaseData.videoChapters.map((chapter, index) => (
                                        <div key={chapter.time} className="overflow-hidden">
                                            <button
                                                onClick={() => handleChapterToggle(index)}
                                                className="w-full flex items-center justify-between p-3 text-left"
                                            >
                                                <span className="font-semibold text-camber-text-primary">{chapter.title}</span>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-camber-text-secondary mr-4">{chapter.time}</span>
                                                    <motion.div
                                                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronDown className="w-5 h-5 text-camber-text-secondary" />
                                                    </motion.div>
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {activeIndex === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-3 border-t border-camber-background-muted">
                                                            <p className="text-camber-text-secondary">
                                                                {chapter.description || 'Detailed description or key takeaways for this chapter will appear here. This is placeholder text.'}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VideoPlayerSection;