"use client";
import React from 'react';
import SocialShareButtons from '@/app/components/SocialShareButtons';
import Image from 'next/image';

interface FurtherReadingSectionProps {
    phase: string;
    params: {
        phase: string;
    };
}



const FurtherReadingSection: React.FC<FurtherReadingSectionProps> = ({ phase, params }) => {
    return (
        <section data-section="blurHero" className="relative w-full flex items-center justify-center min-h-[70vh] py-10" style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #b7d6a7 0%, #eaf6e2 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="absolute inset-0 z-0">
                <div className="h-0 min-h-full w-full blur-[100px]">
                    <Image
                        alt="Background image"
                        loading="lazy"
                        width={3324}
                        height={2600}
                        decoding="async"
                        data-nimg="1"
                        className="h-full w-full object-cover object-top"
                        sizes="100vw"
                        src="https://cdn.sanity.io/images/rutp9o6i/production/4737475e3d53d6e233647aab69c1cb2b47ce7e27-3324x2600.webp?w=3840&fit=max&auto=format&h=3004&q=100"
                        style={{ color: 'transparent' }}
                    />
                </div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
                <div className="glass-light mx-auto w-full max-w-4xl flex flex-col items-center justify-center gap-y-6 px-4 py-8 md:px-8 md:py-12">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Further Reading & Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="bg-black/10 rounded-2xl p-6 text-white text-left">
                            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                            <ul className="space-y-3">
                                <li><a href="/blog/some-article-1" className="hover:underline">Understanding Your Follicular Phase</a></li>
                                <li><a href="/blog/some-article-2" className="hover:underline">Top 5 Foods for Hormonal Balance</a></li>
                                <li><a href="/blog/some-article-3" className="hover:underline">Debunking Common Bloating Myths</a></li>
                            </ul>
                        </div>
                        <div className="bg-black/10 rounded-2xl p-6 text-white text-left">
                            <h3 className="text-xl font-bold mb-4">Share & Connect</h3>
                            <p className="mb-4">Share this replay with others who might find it helpful.</p>
                            <SocialShareButtons title={`${phase} Workshop Replay`} url={`https://yourfitnature.com/workshop/bloating-hormones/replay/${params.phase}`} />
                            <p className="text-sm mt-6">
                                Need help? <a href="mailto:support@yourfitnature.com" className="underline">Contact Support</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FurtherReadingSection;
