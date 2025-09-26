import React from 'react';
import ReusableButton from './ReusableButton';
import { Leaf, Sun, Sunset, Droplets } from 'lucide-react';

const ReplaySelection = () => {
    const sessionCards = [
        {
          phase: 'Follicular',
          Icon: Leaf,
          description: 'Boost energy and optimize your metabolism for this phase.'
        },
        {
          phase: 'Ovulatory',
          Icon: Sun,
          description: 'Enhance libido and support conception with targeted strategies.'
        },
        {
          phase: 'Luteal',
          Icon: Sunset,
          description: 'Learn to curb cravings and reduce PMS symptoms effectively.'
        },
        {
          phase: 'Menstrual',
          Icon: Droplets,
          description: 'Find relief from cramps and restore balance during your period.'
        }
    ];

    return (
        <section id="replays">
            <h2 className="typography-h2 text-grey text-pretty text-center mb-12">Available Workshop Replays</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {sessionCards.map(card => (
                    <div key={card.phase} className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 border-t-4 border-transparent hover:border-perplexity-primary">
                        <div className="mb-4 text-perplexity-primary">
                            <card.Icon className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-camber-text-primary mb-4">{card.phase} Phase</h3>
                        <p className="text-camber-text-secondary mb-4 flex-grow">{card.description}</p>
                        <ReusableButton as="a" href={`/workshop/bloating-hormones/replay/${card.phase.toLowerCase()}`} className="!bg-camber-sage-primary !text-white w-full hover:!bg-camber-sage-deep transition-colors">
                            Watch Replay
                        </ReusableButton>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ReplaySelection;