'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import ReusableButton from './ReusableButton';
import { CheckCircle, Download, Leaf, Sun, Sunset, Droplets } from 'lucide-react';
import {
    trackRegisterClick,
    trackFormView,
} from '@/lib/analytics';

const RegistrationModal = dynamic(() => import('./RegistrationModal'), { suspense: true });

const SessionSelection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState('');

    const handleRegisterClick = (session: string) => {
        trackRegisterClick(session);
        setSelectedSession(session);
        setIsModalOpen(true);
        trackFormView(session);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSession('');
    };

    const sessionCards = [
        {
          phase: 'Follicular',
          benefits: ['Boost energy', 'Optimize metabolism'],
          Icon: Leaf,
        },
        {
          phase: 'Ovulatory',
          benefits: ['Enhance libido', 'Support conception'],
          Icon: Sun,
        },
        {
          phase: 'Luteal',
          benefits: ['Curb cravings', 'Reduce PMS'],
          Icon: Sunset,
        },
        {
          phase: 'Menstrual',
          benefits: ['Ease cramps', 'Restore balance'],
          Icon: Droplets,
        }
    ];

    return (
        <>
            <section id="register">
                <h2 className="typography-h2 text-grey text-pretty text-center mb-12">Register for a Free Session</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sessionCards.map(card => (
                        <div key={card.phase} className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 border-t-4 border-transparent hover:border-perplexity-primary">
                            <div className="mb-4 text-perplexity-primary">
                                <card.Icon className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-camber-text-primary mb-4">{card.phase} Phase</h3>
                            <ul className="text-camber-text-secondary space-y-2 mb-4 flex-grow">
                                {card.benefits.map(benefit => (
                                    <li key={benefit} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-perplexity-primary flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs text-camber-text-secondary mt-auto mb-4">Can&apos;t make it live? Register to get the replay!</p>
                            <ReusableButton onClick={() => handleRegisterClick(card.phase.toLowerCase())} className="!bg-camber-sage-primary !text-white w-full hover:!bg-camber-sage-deep transition-colors">
                                Register Free
                            </ReusableButton>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <ReusableButton onClick={() => handleRegisterClick('all')} className="!bg-perplexity-primary !text-white !px-10 !py-4 !text-lg hover:!bg-opacity-90 transform hover:scale-105 transition-transform">
                        Register for All Sessions (Free)
                    </ReusableButton>
                </div>
                <div className="text-center mt-6">
                    <a href="/downloads/cycle-cheatsheet.pdf" download className="inline-flex items-center text-camber-text-secondary hover:text-perplexity-primary font-medium transition-colors group">
                        <Download className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-0.5" />
                        Download the Cycle Cheatsheet
                    </a>
                </div>
            </section>
            <Suspense fallback={null}>
                {isModalOpen && (
                    <RegistrationModal 
                        isOpen={isModalOpen} 
                        onClose={handleCloseModal} 
                        initialSessionPreference={selectedSession}
                    />
                )}
            </Suspense>
        </>
    );
}

export default SessionSelection;